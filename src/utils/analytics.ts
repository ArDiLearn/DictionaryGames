// Declare gtag globally on window
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    Capacitor?: unknown;
  }
}

const isAnalyticsEnabled =
  import.meta.env.VITE_ENABLE_WEB_ANALYTICS === 'true' &&
  typeof window !== 'undefined' &&
  !window.Capacitor;

/**
 * Send custom events only when web analytics is explicitly enabled and not in a native mobile wrapper.
 * Disabled by default to comply with Google Play Families Policy (COPPA / GDPR-K).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined | null>
) {
  if (!isAnalyticsEnabled) return;
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch (err) {
    console.warn('Analytics trackEvent error:', err);
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
