import { getSupabase } from '../services/supabase';

/**
 * Send anonymous First-Party educational events to our own Supabase database.
 * Complies with Google Play Families Policy (COPPA / GDPR-K):
 * - No third-party ad networks, no Advertising ID (AAID/IDFA), no cross-app tracking.
 * - Tries inserting into `public.app_events` first; if the table hasn't been created yet,
 *   automatically increments anonymized aggregate counters in `public.app_activity`.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined | null>
) {
  void recordSupabaseEvent(eventName, params);
}

async function recordSupabaseEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined | null>
): Promise<void> {
  try {
    const client = getSupabase();
    if (!client) return;

    const nowIso = new Date().toISOString();
    const today = nowIso.slice(0, 10); // YYYY-MM-DD (coarse date only for privacy)

    // 1. Try inserting into dedicated `app_events` table if it exists in Supabase
    const { error: eventErr } = await client.from('app_events').insert({
      event_name: eventName,
      game_type: params?.game_type ? String(params.game_type) : null,
      topic_id: params?.topic_id ? String(params.topic_id) : null,
      score: typeof params?.score === 'number' ? params.score : null,
      stars: typeof params?.stars === 'number' ? params.stars : null,
      meta: params ? JSON.stringify(params) : null,
      event_date: today,
    });

    if (!eventErr) return;

    // 2. Automatic zero-config fallback: aggregate anonymous daily stats in `app_activity`
    //    which already exists in Supabase!
    const metricKey =
      eventName === 'game_start' || eventName === 'game_complete'
        ? `stats_${today}_${eventName}_${params?.game_type || 'unknown'}`
        : `stats_${today}_${eventName}`;

    const label =
      params?.topic_id
        ? `${eventName}:${params.game_type || ''} (${params.topic_id})`
        : `${eventName}:${params?.lang_to || params?.method || ''}`;

    const { data: existing } = await client
      .from('app_activity')
      .select('sessions_count')
      .eq('device_id', metricKey)
      .maybeSingle();

    const nextCount = (existing?.sessions_count || 0) + 1;

    await client.from('app_activity').upsert(
      {
        device_id: metricKey,
        user_id: null,
        player_name: label.slice(0, 80),
        course: params?.lang_to ? String(params.lang_to) : 'en',
        sessions_count: nextCount,
        last_seen_at: nowIso,
      },
      { onConflict: 'device_id' }
    );
  } catch {
    // Never block gameplay on network or offline errors
  }
}

/**
 * Track game started event
 * @param gameType 'flashcards' | 'match_pairs' | 'balloon_pop' | 'true_false' | 'word_builder' | 'audio_quiz'
 * @param topicId Topic identifier
 */
export function trackGameStart(gameType: string, topicId: string) {
  trackEvent('game_start', {
    game_type: gameType,
    topic_id: topicId,
  });
}

/**
 * Track game completed event
 * @param gameType 'flashcards' | 'match_pairs' | 'balloon_pop' | 'true_false' | 'word_builder' | 'audio_quiz'
 * @param topicId Topic identifier
 * @param score Number of correct answers
 * @param stars Stars awarded (0 to 3)
 */
export function trackGameComplete(
  gameType: string,
  topicId: string,
  score: number,
  stars: number
) {
  trackEvent('game_complete', {
    game_type: gameType,
    topic_id: topicId,
    score,
    stars,
  });
}

/**
 * Track language change event
 * @param langTo Target language ('ru' or 'lv')
 */
export function trackLanguageChange(langTo: 'ru' | 'lv') {
  trackEvent('language_change', {
    lang_to: langTo,
  });
}

/**
 * Track student login event
 * @param method Authentication method (default: 'username')
 */
export function trackUserLogin(method: string = 'username') {
  trackEvent('user_login', {
    method,
  });
}

/**
 * Track student signup event
 * @param method Authentication method (default: 'username')
 */
export function trackUserSignup(method: string = 'username') {
  trackEvent('user_signup', {
    method,
  });
}
