import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { TopicProgress, WordProgress, UserStats } from '../types';

const STORAGE_KEY_URL = 'wordykids_supabase_url';
const STORAGE_KEY_KEY = 'wordykids_supabase_key';

export function getStoredSupabaseConfig(): { url: string; key: string } {
  const envUrl = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY || '';

  const localUrl = localStorage.getItem(STORAGE_KEY_URL) || '';
  const localKey = localStorage.getItem(STORAGE_KEY_KEY) || '';

  return {
    url: localUrl || envUrl,
    key: localKey || envKey,
  };
}

export function saveStoredSupabaseConfig(url: string, key: string) {
  localStorage.setItem(STORAGE_KEY_URL, url.trim());
  localStorage.setItem(STORAGE_KEY_KEY, key.trim());
  initClient();
}

let supabaseClient: SupabaseClient | null = null;

export function initClient(): SupabaseClient | null {
  const { url, key } = getStoredSupabaseConfig();
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

export async function getCurrentUser(): Promise<User | null> {
  const client = getSupabase();
  if (!client) return null;
  try {
    const { data } = await client.auth.getUser();
    return data.user;
  } catch {
    return null;
  }
}

export async function signUpUser(email: string, password: string):Promise<{ user: User | null; error: string | null }> {
  const client = getSupabase();
  if (!client) return { user: null, error: 'Supabase is not configured' };
  
  // Format simple emails if kid just entered username
  const formattedEmail = email.includes('@') ? email : `${email.trim().toLowerCase()}@wordykids.local`;
  
  const { data, error } = await client.auth.signUp({
    email: formattedEmail,
    password: password,
  });

  if (error) {
    return { user: null, error: error.message };
  }
  return { user: data.user, error: null };
}

export async function signInUser(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  const client = getSupabase();
  if (!client) return { user: null, error: 'Supabase is not configured' };

  const formattedEmail = email.includes('@') ? email : `${email.trim().toLowerCase()}@wordykids.local`;

  const { data, error } = await client.auth.signInWithPassword({
    email: formattedEmail,
    password: password,
  });

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
