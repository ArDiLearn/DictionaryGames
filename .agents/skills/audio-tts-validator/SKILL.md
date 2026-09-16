---
name: audio-tts-validator
description: >-
  Guidelines and debugging runbooks for Text-To-Speech (Web Speech API) and
  synthesized game sound effects (Web Audio API) in DictionaryGames.
  Use when modifying audio behavior, speech rates, voice selection, or resolving mobile audio autoplay policies.
---

# Audio & TTS Validator

This skill documents the audio architecture of DictionaryGames, including speech synthesis for English pronunciation and zero-latency Web Audio API synthesizers for game sound effects.

## Speech Synthesis (`src/utils/speech.ts`)

1. **Target Audience**: Elementary school children (Grades 1-3) learning English as a foreign language.
2. **Parameters**:
   - `rate`: `0.85x` default (reduced speed for clarity).
   - `pitch`: `1.1x` (friendly, cheerful tone).
   - `lang`: `en-US` with fallback to `en-GB`.
3. **Voice Selection Algorithm**:
   Prefers natural, high-clarity voices:
   - Microsoft Natural (Jenny / Guy / Aria)
   - Apple Samantha / Daniel
   - Google US English
4. **Cancellation**:
   Always call `window.speechSynthesis.cancel()` prior to speaking new words to prevent queuing delays when children click rapidly.

## Web Audio API Sound Effects (`src/utils/soundEffects.ts`)

1. **Zero-Latency Offline**:
   Sound effects do not load external `.mp3` or `.wav` files. All audio waveforms (sine, triangle, square) are generated in real time using `AudioContext.createOscillator()`.
2. **Sound Catalogue**:
   - `playClick()`: Soft tactile pop (450Hz -> 300Hz sine wave, 50ms).
   - `playCorrect()`: Ascending major triad (C5 - E5 - G5, triangle waves).
   - `playWrong()`: Low dissonance buzz (180Hz -> 140Hz sawtooth/square wave).
   - `playPop()`: Balloon pop effect (800Hz drop, 60ms).
   - `playWin()`: Victorious fanfare arpeggio (C5 -> E5 -> G5 -> C6).
3. **Autoplay & Browser Gestures**:
   Browsers suspend `AudioContext` until the user interacts with the document. `soundEffects.getContext()` checks `if (this.ctx.state === 'suspended') this.ctx.resume();` on every interaction.
