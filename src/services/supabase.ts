import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { TopicProgress, WordProgress, UserStats } from '../types';

// Pre-configured Supabase Project settings
const DEFAULT_SUPABASE_URL = 'https://pxexrgtoaeudqeceqeoq.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_sKx7Fs12mMWZlC-KXhdk-g_wuRrwMc9';

export function getSupabaseConfig(): { url: string; key: string } {
  const envUrl = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY;

  return {
    url: envUrl || DEFAULT_SUPABASE_URL,
    key: envKey || DEFAULT_SUPABASE_KEY,
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
export function loginToEmail(username: string, domain = 'mindwordy.app'): string {
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

  // Fallback to legacy domain for accounts created before rebranding
  if (error && !cleanLogin.includes('@')) {
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
    // 1. Save / Update User Profile
    await client.from('profiles').upsert({
      id: userId,
      player_name: stats.playerName,
      avatar: stats.avatar,
      streak: stats.streak,
      updated_at: new Date().toISOString(),
    });

    // 2. Batch upsert Topic Progress
    const topicRows = Object.values(topicProgress).map((tp) => ({
      user_id: userId,
      topic_id: tp.topic_id,
      stars: tp.stars,
      mastered_words: tp.masteredWordIds,
      last_played_at: tp.lastPlayedAt || new Date().toISOString(),
    }));

    if (topicRows.length > 0) {
      await client.from('topic_progress').upsert(topicRows, {
        onConflict: 'user_id,topic_id',
      });
    }

    // 3. Batch upsert Word Progress
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
      await client.from('word_progress').upsert(wordRows, {
        onConflict: 'user_id,word_id',
      });
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
    // Fetch Profile
    const { data: profile } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    // Fetch Topics
    const { data: topics } = await client
      .from('topic_progress')
      .select('*')
      .eq('user_id', userId);

    // Fetch Words
    const { data: words } = await client
      .from('word_progress')
      .select('*')
      .eq('user_id', userId);

    const topicProgress: Record<string, TopicProgress> = {};
    if (topics) {
      for (const t of topics) {
        topicProgress[t.topic_id] = {
          topic_id: t.topic_id,
          stars: t.stars || 0,
          masteredWordIds: t.mastered_words || [],
          lastPlayedAt: t.last_played_at,
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
    if (profile) {
      if (profile.player_name) statsPartial.playerName = profile.player_name;
      if (profile.avatar) statsPartial.avatar = profile.avatar;
      if (profile.streak) statsPartial.streak = profile.streak;
    }

    return { topicProgress, wordProgress, statsPartial };
  } catch (err) {
    console.error('Error fetching progress from Supabase:', err);
    return null;
  }
}
