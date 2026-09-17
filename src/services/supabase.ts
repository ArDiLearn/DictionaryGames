import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { TopicProgress, WordProgress, UserStats } from '../types';

export function getSupabaseConfig(): { url: string; key: string } {
  return {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  };
}

let supabaseClient: SupabaseClient | null = null;

export function initClient(): SupabaseClient | null {
  const { url, key } = getSupabaseConfig();
  if (url && key && url.startsWith('http')) {
    try {
      supabaseClient = createClient(url, key);
      return supabaseClient;
    } catch (e) {
      console.error('Failed to initialize Supabase client:', e);
      supabaseClient = null;
      return null;
    }
  }
  supabaseClient = null;
  return null;
}

// Initial client creation
initClient();

export function getSupabase(): SupabaseClient | null {
  if (!supabaseClient) {
    return initClient();
  }
  return supabaseClient;
}

/**
 * Converts a child-friendly username (e.g. 'ivan', 'jānis', 'alise')
 * to a valid synthetic email for Supabase Auth without exposing email to the user.
 */
export function loginToEmail(username: string, domain = 'wordymind.app'): string {
  const clean = username.trim().toLowerCase();
  if (clean.includes('@')) return clean;
  // Safely encode non-ascii or special chars into valid email alphanumeric tokens
  const safePart = encodeURIComponent(clean).replace(/%/g, '_x_').toLowerCase();
  return `${safePart}@${domain}`;
}

/**
 * Recovers clean display username from synthetic email.
 */
export function emailToLogin(email: string): string {
  if (!email) return '';
  const userPart = email.split('@')[0];
  try {
    return decodeURIComponent(userPart.replace(/_x_/gi, '%'));
  } catch {
    return userPart;
  }
}

export function getCurrentUserLogin(user: User | null): string {
  if (!user) return '';
  if (user.user_metadata?.login) return user.user_metadata.login;
  if (user.user_metadata?.player_name) return user.user_metadata.player_name;
  if (user.email) return emailToLogin(user.email);
  return 'Player';
}

export async function getCurrentUser(): Promise<User | null> {
  const client = getSupabase();
  if (!client) return null;
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
}

export async function signUpUser(
  username: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  const client = getSupabase();
  if (!client) return { user: null, error: 'Supabase client is not available' };

  const cleanLogin = username.trim();
  const email = loginToEmail(cleanLogin);

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        player_name: cleanLogin,
        login: cleanLogin,
      },
    },
  });

  if (error) {
    return { user: null, error: error.message };
  }

  // If signUp succeeded without an active session (e.g. if auto-sign-in is needed)
  if (data.user && !data.session) {
    const signInResult = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (!signInResult.error && signInResult.data.user) {
      return { user: signInResult.data.user, error: null };
    }
  }

  return { user: data.user, error: null };
}

export async function signInUser(
  username: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  const client = getSupabase();
  if (!client) return { user: null, error: 'Supabase client is not available' };

  const cleanLogin = username.trim();
  const email = loginToEmail(cleanLogin);

  let { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  // Fallback to mindwordy.app and legacy wordykids.app domains for accounts created before rebranding
  if (error && !cleanLogin.includes('@')) {
    const mindwordyEmail = loginToEmail(cleanLogin, 'mindwordy.app');
    const mindwordyResult = await client.auth.signInWithPassword({
      email: mindwordyEmail,
      password,
    });
    if (!mindwordyResult.error) {
      data = mindwordyResult.data;
      error = null;
    } else {
      const legacyEmail = loginToEmail(cleanLogin, 'wordykids.app');
      const legacyResult = await client.auth.signInWithPassword({
        email: legacyEmail,
        password,
      });
      if (!legacyResult.error) {
        data = legacyResult.data;
        error = null;
      }
    }
  }

  if (error) {
    return { user: null, error: error.message };
  }
  return { user: data.user, error: null };
}

export async function signOutUser(): Promise<void> {
  const client = getSupabase();
  if (!client) return;
  await client.auth.signOut();
}

/**
 * Cloud Sync: Push local progress to Supabase
 */
export async function syncProgressToCloud(
  userId: string,
  topicProgress: Record<string, TopicProgress>,
  wordProgress: Record<string, WordProgress>,
  stats: UserStats
): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    // 1. Sync full rich stats & topic stars to Supabase Auth user_metadata
    // This provides 100% reliable star & inventory synchronization across all devices and platforms
    try {
      await client.auth.updateUser({
        data: {
          player_name: stats.playerName,
          login: stats.playerName,
          stats_data: {
            playerName: stats.playerName,
            avatar: stats.avatar,
            streak: stats.streak,
            lastActiveDate: stats.lastActiveDate,
            totalActiveDays: stats.totalActiveDays,
            activeDates: stats.activeDates,
            equippedTitleId: stats.equippedTitleId,
            unlockedTitleIds: stats.unlockedTitleIds,
            claimedTopicBonusIds: stats.claimedTopicBonusIds,
            claimedMilestoneIds: stats.claimedMilestoneIds,
            playedModes: stats.playedModes,
            hasSniperAchieved: stats.hasSniperAchieved,
            unlockedAvatars: stats.unlockedAvatars,
            spentStars: stats.spentStars || 0,
            totalStarsEarned: stats.totalStarsEarned || 0,
          },
          topic_stars: Object.fromEntries(
            Object.entries(topicProgress).map(([tid, tp]) => [
              tid,
              { stars: tp.stars, masteredWords: tp.masteredWordIds },
            ])
          ),
        },
      });
    } catch (metaErr) {
      console.warn('Could not update user_metadata in Supabase Auth:', metaErr);
    }

    // 2. Save / Update User Profile Table
    const { error: profileErr } = await client.from('profiles').upsert({
      id: userId,
      player_name: stats.playerName,
      avatar: stats.avatar,
      streak: stats.streak,
      updated_at: new Date().toISOString(),
    });
    if (profileErr) {
      console.warn('Error saving profile to Supabase:', profileErr);
    }

    // 2b. Attempt to persist extended stats in profiles table if columns exist
    try {
      await client.from('profiles').update({
        total_stars_earned: stats.totalStarsEarned || 0,
        spent_stars: stats.spentStars || 0,
        unlocked_avatars: stats.unlockedAvatars || [],
        equipped_title_id: stats.equippedTitleId || 'title_starter',
        unlocked_title_ids: stats.unlockedTitleIds || ['title_starter'],
        claimed_topic_bonus_ids: stats.claimedTopicBonusIds || [],
        claimed_milestone_ids: stats.claimedMilestoneIds || [],
      }).eq('id', userId);
    } catch {
      // Ignored if optional columns not yet added to SQL schema
    }

    // 3. Batch upsert Topic Progress
    const topicRows = Object.values(topicProgress).map((tp) => ({
      user_id: userId,
      topic_id: tp.topic_id,
      stars: tp.stars,
      mastered_words: tp.masteredWordIds,
      last_played_at: tp.lastPlayedAt || new Date().toISOString(),
    }));

    if (topicRows.length > 0) {
      const { error: topicErr } = await client.from('topic_progress').upsert(topicRows, {
        onConflict: 'user_id,topic_id',
      });
      if (topicErr) {
        console.warn('Error saving topic_progress to Supabase:', topicErr);
      }
    }

    // 4. Batch upsert Word Progress
    const wordRows = Object.values(wordProgress).map((wp) => ({
      user_id: userId,
      word_id: wp.word_id,
      topic_id: wp.topic_id,
      times_correct: wp.timesCorrect,
      times_wrong: wp.timesWrong,
      is_learned: wp.isLearned,
      last_reviewed_at: wp.lastReviewedAt || new Date().toISOString(),
    }));

    if (wordRows.length > 0) {
      const { error: wordErr } = await client.from('word_progress').upsert(wordRows, {
        onConflict: 'user_id,word_id',
      });
      if (wordErr) {
        console.warn('Error saving word_progress to Supabase:', wordErr);
      }
    }

    return true;
  } catch (err) {
    console.error('Error syncing to Supabase:', err);
    return false;
  }
}

/**
 * Cloud Sync: Pull remote progress from Supabase
 */
export async function fetchProgressFromCloud(userId: string): Promise<{
  topicProgress: Record<string, TopicProgress>;
  wordProgress: Record<string, WordProgress>;
  statsPartial?: Partial<UserStats>;
} | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    // 1. Fetch current auth user to read user_metadata
    const {
      data: { user },
    } = await client.auth.getUser();

    // 2. Fetch Profile from table
    const { data: profile } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    // 3. Fetch Topics from table
    const { data: topics } = await client
      .from('topic_progress')
      .select('*')
      .eq('user_id', userId);

    // 4. Fetch Words from table
    const { data: words } = await client
      .from('word_progress')
      .select('*')
      .eq('user_id', userId);

    const topicProgress: Record<string, TopicProgress> = {};
    if (topics && topics.length > 0) {
      for (const t of topics) {
        topicProgress[t.topic_id] = {
          topic_id: t.topic_id,
          stars: t.stars || 0,
          masteredWordIds: t.mastered_words || [],
          lastPlayedAt: t.last_played_at,
        };
      }
    } else if (user?.user_metadata?.topic_stars) {
      // Fallback to topic_stars in user_metadata if table was empty or not yet configured
      for (const [tid, info] of Object.entries(user.user_metadata.topic_stars as Record<string, any>)) {
        topicProgress[tid] = {
          topic_id: tid,
          stars: info.stars || 0,
          masteredWordIds: info.masteredWords || [],
        };
      }
    }

    const wordProgress: Record<string, WordProgress> = {};
    if (words) {
      for (const w of words) {
        wordProgress[w.word_id] = {
          word_id: w.word_id,
          topic_id: w.topic_id,
          timesCorrect: w.times_correct || 0,
          timesWrong: w.times_wrong || 0,
          isLearned: !!w.is_learned,
          lastReviewedAt: w.last_reviewed_at,
        };
      }
    }

    const statsPartial: Partial<UserStats> = {};

    // First populate from user_metadata.stats_data (contains all star & piggy bank info)
    if (user?.user_metadata?.stats_data) {
      Object.assign(statsPartial, user.user_metadata.stats_data);
    }

    // Merge in any database profile fields if present
    if (profile) {
      if (profile.player_name) statsPartial.playerName = profile.player_name;
      if (profile.avatar) statsPartial.avatar = profile.avatar;
      if (profile.streak) statsPartial.streak = Math.max(statsPartial.streak || 1, profile.streak || 1);
      if (profile.total_stars_earned !== undefined && profile.total_stars_earned !== null) {
        statsPartial.totalStarsEarned = Math.max(statsPartial.totalStarsEarned || 0, profile.total_stars_earned);
      }
      if (profile.spent_stars !== undefined && profile.spent_stars !== null) {
        statsPartial.spentStars = Math.max(statsPartial.spentStars || 0, profile.spent_stars);
      }
      if (profile.unlocked_avatars && Array.isArray(profile.unlocked_avatars)) {
        statsPartial.unlockedAvatars = Array.from(
          new Set([...(statsPartial.unlockedAvatars || []), ...profile.unlocked_avatars])
        );
      }
      if (profile.equipped_title_id) {
        statsPartial.equippedTitleId = profile.equipped_title_id;
      }
      if (profile.unlocked_title_ids && Array.isArray(profile.unlocked_title_ids)) {
        statsPartial.unlockedTitleIds = Array.from(
          new Set([...(statsPartial.unlockedTitleIds || []), ...profile.unlocked_title_ids])
        );
      }
      if (profile.claimed_topic_bonus_ids && Array.isArray(profile.claimed_topic_bonus_ids)) {
        statsPartial.claimedTopicBonusIds = Array.from(
          new Set([...(statsPartial.claimedTopicBonusIds || []), ...profile.claimed_topic_bonus_ids])
        );
      }
      if (profile.claimed_milestone_ids && Array.isArray(profile.claimed_milestone_ids)) {
        statsPartial.claimedMilestoneIds = Array.from(
          new Set([...(statsPartial.claimedMilestoneIds || []), ...profile.claimed_milestone_ids])
        );
      }
    }

    return { topicProgress, wordProgress, statsPartial };
  } catch (err) {
    console.error('Error fetching progress from Supabase:', err);
    return null;
  }
}
