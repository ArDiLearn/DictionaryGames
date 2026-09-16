import { LearningCourse } from '../types';
import lvAudioMapRaw from '../data/lvAudioMap.json';

/**
 * Web Audio / Native TTS wrapper tailored for English and Latvian learners.
 * Latvian pronunciation uses authentic native audio recordings with fallback to Google TTS and Web Speech API.
 * English pronunciation uses high-clarity Web Speech API voices at 0.85x speed.
 */

const lvAudioMap: Record<string, string> = lvAudioMapRaw as Record<string, string>;

let currentAudio: HTMLAudioElement | null = null;
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

export function stopSpeech(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // ignore
    }
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
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
    stopSpeech(); // Stop any pending audio/speech

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
      englishVoices.find(
        (v) =>
          v.name.includes('Natural') ||
          v.name.includes('Samantha') ||
          v.name.includes('Google US')
      ) ||
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

function speakLatvianSynthesis(
  text: string,
  rate = 0.9,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return false;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'lv-LV';
    utterance.rate = Math.max(0.7, Math.min(1.1, rate));
    utterance.pitch = 1.0;

    if (!voicesLoaded) {
      loadVoices();
    }

    const latvianVoices = voices.filter((v) =>
      v.lang.toLowerCase().startsWith('lv')
    );

    const preferredVoice =
      latvianVoices.find(
        (v) =>
          v.name.includes('Natural') ||
          v.name.includes('Nils') ||
          v.name.includes('Everita')
      ) || latvianVoices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Latvian synthesis error:', err);
    if (onEnd) onEnd();
    return false;
  }
}

export function speakLatvian(
  text: string,
  rate = 0.9,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined') return false;

  stopSpeech();

  const cleanText = text.trim();
  const key = cleanText.toLowerCase();
  const audioFile = lvAudioMap[key];

  let hasStarted = false;
  const triggerStart = () => {
    if (!hasStarted) {
      hasStarted = true;
      if (onStart) onStart();
    }
  };

  const triggerEnd = () => {
    if (onEnd) onEnd();
  };

  // 1. Try local pre-recorded native studio audio
  if (audioFile) {
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    const audioUrl = `${baseUrl}audio/lv/${audioFile}`;

    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onplay = triggerStart;
    audio.onended = () => {
      currentAudio = null;
      triggerEnd();
    };
    audio.onerror = () => {
      currentAudio = null;
      speakLatvianSynthesis(cleanText, rate, onStart, onEnd);
    };

    audio.play().catch(() => {
      currentAudio = null;
      speakLatvianSynthesis(cleanText, rate, onStart, onEnd);
    });

    return true;
  }

  // 2. If not in local pre-recorded map, stream from Google TTS
  try {
    const streamUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=lv&q=${encodeURIComponent(cleanText)}`;
    const audio = new Audio(streamUrl);
    currentAudio = audio;

    audio.onplay = triggerStart;
    audio.onended = () => {
      currentAudio = null;
      triggerEnd();
    };
    audio.onerror = () => {
      currentAudio = null;
      speakLatvianSynthesis(cleanText, rate, onStart, onEnd);
    };

    audio.play().catch(() => {
      currentAudio = null;
      speakLatvianSynthesis(cleanText, rate, onStart, onEnd);
    });

    return true;
  } catch {
    return speakLatvianSynthesis(cleanText, rate, onStart, onEnd);
  }
}

export function speakWord(
  text: string,
  course: LearningCourse = 'en',
  rate = 0.85,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (course === 'lv') {
    return speakLatvian(text, rate, onStart, onEnd);
  }
  return speakEnglish(text, rate, onStart, onEnd);
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && ('speechSynthesis' in window || 'Audio' in window);
}
