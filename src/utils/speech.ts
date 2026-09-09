/**
 * Web Speech API wrapper tailored for 1st-2nd grade English learners.
 * Speaks with slightly reduced speed (0.85x) for clarity.
 */

let voices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

function loadVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    voicesLoaded = true;
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

export function speakEnglish(
  text: string,
  rate = 0.85,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = Math.max(0.6, Math.min(1.2, rate));
    utterance.pitch = 1.1; // Slightly friendly pitch for kids

    if (!voicesLoaded) {
      loadVoices();
    }

    // Try to find a good English voice
    const englishVoices = voices.filter(
      (v) => v.lang.startsWith('en-') || v.lang.startsWith('en_')
    );

    const preferredVoice =
      englishVoices.find((v) => v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google US')) ||
      englishVoices.find((v) => v.lang === 'en-US') ||
      englishVoices.find((v) => v.lang === 'en-GB') ||
      englishVoices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    if (onStart) {
      utterance.onstart = onStart;
    }
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Speech error:', err);
    if (onEnd) onEnd();
    return false;
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
