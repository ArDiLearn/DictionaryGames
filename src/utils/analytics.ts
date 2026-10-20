import { getSupabase } from '../services/supabase';

const GAME_MODE_NAMES_RU: Record<string, string> = {
  flashcards: 'Карточки',
  builder: 'Собери слово',
  word_builder: 'Собери слово',
  match: 'Найди пару',
  match_pairs: 'Найди пару',
  truefalse: 'Правда или ложь',
  true_false: 'Правда или ложь',
  balloons: 'Поймай перевод (Шарики)',
  balloon_pop: 'Поймай перевод (Шарики)',
  audio: 'На слух',
  audio_quiz: 'На слух',
  test: 'Контрольный тест темы',
  exam: 'Школьный экзамен',
};

const EVENT_NAMES_RU: Record<string, string> = {
  game_start: '▶️ Старт игры',
  game_complete: '🏆 Завершение игры',
  exam_start: '📝 Старт экзамена',
  exam_complete: '🎓 Сдача экзамена',
  language_change: '🌐 Смена языка интерфейса',
  user_login: '🔑 Вход ученика',
  user_signup: '✨ Регистрация ученика',
};

function formatReadableSummary(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  const eventRu = EVENT_NAMES_RU[eventName] || eventName;
  const gameType = params?.game_type ? String(params.game_type) : '';
  const gameRu = GAME_MODE_NAMES_RU[gameType] || gameType;
  const topicTitle = params?.topic_title
    ? String(params.topic_title)
    : params?.topic_id
      ? String(params.topic_id)
      : '';

  if (eventName === 'game_start') {
    return `${eventRu}: ${gameRu}${topicTitle ? ` — Тема «${topicTitle}»` : ''}`;
  }
  if (eventName === 'game_complete') {
    const scorePart = params?.score !== undefined ? ` (Очки: ${params.score}, ⭐: ${params.stars ?? 0})` : '';
    return `${eventRu}: ${gameRu}${topicTitle ? ` — Тема «${topicTitle}»` : ''}${scorePart}`;
  }
  if (eventName === 'exam_start' || eventName === 'exam_complete') {
    const gradePart = params?.grade ? `${params.grade}-й класс` : '';
    const scorePart =
      eventName === 'exam_complete' && params?.score !== undefined
        ? ` (Результат: ${params.score}%, Оценка: ${params.mark ?? '-'})`
        : '';
    return `${eventRu}: ${gradePart}${scorePart}`;
  }
  if (eventName === 'language_change') {
    const langRu = params?.lang_to === 'lv' ? 'Латышский (LV)' : 'Русский (RU)';
    return `${eventRu} -> ${langRu}`;
  }
  if (eventName === 'user_login' || eventName === 'user_signup') {
    return `${eventRu}`;
  }
  return `${eventRu}${topicTitle ? ` (${topicTitle})` : ''}`;
}

/**
 * Send anonymous First-Party educational events to our own Supabase database with readable Russian titles.
 * Complies with Google Play Families Policy (COPPA / GDPR-K):
 * - No third-party ad networks, no Advertising ID (AAID/IDFA), no cross-app tracking.
 * - Writes both to `public.app_events` (if created) and readable daily rows in `public.app_activity`.
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
    const today = nowIso.slice(0, 10); // YYYY-MM-DD
    const gameType = params?.game_type ? String(params.game_type) : '';
    const gameRu = GAME_MODE_NAMES_RU[gameType] || gameType || null;
    const topicTitle = params?.topic_title
      ? String(params.topic_title)
      : params?.topic_id
        ? String(params.topic_id)
        : null;
    const readableSummary = formatReadableSummary(eventName, params);

    // 1. Try inserting into dedicated `app_events` table if it exists in Supabase
    await client.from('app_events').insert({
      event_name: EVENT_NAMES_RU[eventName] || eventName,
      game_type: gameRu,
      topic_id: topicTitle,
      score: typeof params?.score === 'number' ? params.score : null,
      stars: typeof params?.stars === 'number' ? params.stars : null,
      meta: readableSummary,
      event_date: today,
    });

    // 2. Always update human-readable daily aggregate counters in `app_activity`
    //    so you can immediately view named logs in Supabase -> Table Editor -> app_activity!
    const metricKey =
      eventName === 'game_start' || eventName === 'game_complete'
        ? `📊 [${today}] ${EVENT_NAMES_RU[eventName]} — ${gameRu || gameType}${topicTitle ? ` (${topicTitle})` : ''}`
        : eventName === 'exam_start' || eventName === 'exam_complete'
          ? `📊 [${today}] ${EVENT_NAMES_RU[eventName]} — ${params?.grade || ''}-й класс`
          : `📊 [${today}] ${readableSummary}`;

    const safeKey = metricKey.slice(0, 120);

    const { data: existing } = await client
      .from('app_activity')
      .select('sessions_count')
      .eq('device_id', safeKey)
      .maybeSingle();

    const nextCount = (existing?.sessions_count || 0) + 1;

    await client.from('app_activity').upsert(
      {
        device_id: safeKey,
        user_id: null,
        player_name: readableSummary.slice(0, 120),
        course: params?.course ? String(params.course) : params?.lang_to ? String(params.lang_to) : 'en',
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
 */
export function trackGameStart(
  gameType: string,
  topicId: string,
  topicTitle?: string,
  course?: string
) {
  trackEvent('game_start', {
    game_type: gameType,
    topic_id: topicId,
    topic_title: topicTitle || topicId,
    course: course || 'en',
  });
}

/**
 * Track game completed event
 */
export function trackGameComplete(
  gameType: string,
  topicId: string,
  score: number,
  stars: number,
  topicTitle?: string,
  course?: string
) {
  trackEvent('game_complete', {
    game_type: gameType,
    topic_id: topicId,
    topic_title: topicTitle || topicId,
    score,
    stars,
    course: course || 'en',
  });
}

/**
 * Track school exam start
 */
export function trackExamStart(grade: number, course?: string) {
  trackEvent('exam_start', {
    game_type: 'exam',
    grade,
    course: course || 'en',
  });
}

/**
 * Track school exam completion
 */
export function trackExamComplete(
  grade: number,
  percentage: number,
  mark: string | number,
  stars: number,
  course?: string
) {
  trackEvent('exam_complete', {
    game_type: 'exam',
    grade,
    score: percentage,
    mark,
    stars,
    course: course || 'en',
  });
}

/**
 * Track language change event
 */
export function trackLanguageChange(langTo: 'ru' | 'lv') {
  trackEvent('language_change', {
    lang_to: langTo,
  });
}

/**
 * Track student login event
 */
export function trackUserLogin(method: string = 'username') {
  trackEvent('user_login', {
    method,
  });
}

/**
 * Track student signup event
 */
export function trackUserSignup(method: string = 'username') {
  trackEvent('user_signup', {
    method,
  });
}
