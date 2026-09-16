---
name: mini-game-builder
description: >-
  Architectural patterns, standard props, scoring mechanisms, audio integration,
  and kid-friendly UX rules for building and extending mini-games in DictionaryGames.
  Use when creating a new game or modifying existing game logic.
---

# Mini-Game Builder

This skill defines the contract, UX requirements, audio feedback conventions, and state flow for educational mini-games in the Wordy Kids project (`src/components/games/`).

## Standard Mini-Game Interface

All games live in `src/components/games/<GameName>.tsx` and conform to this prop contract:

```tsx
interface GameProps {
  topic: Topic;
  allTopics?: Topic[];
  language: Language; // 'ru' | 'lv'
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}
```

## Core Systems & Hooks

### 1. Audio & Speech Integration
- **Text-to-Speech**:
  ```tsx
  import { speakEnglish } from '../../utils/speech';
  speakEnglish(word.en);
  ```
- **Sound Effects (Web Audio API)**:
  ```tsx
  import { sounds } from '../../utils/soundEffects';
  sounds.playCorrect(); // On right answer
  sounds.playWrong();   // On mistake
  sounds.playPop();     // On click / letter tap
  sounds.playWin();     // On finishing round
  ```

### 2. Progress & Mastery Recording
- Call `onRecordResult(word.id, true)` when the child gets the word right.
- Call `onRecordResult(word.id, false)` when the child makes a mistake.
- At the end of the round, call:
  ```tsx
  onComplete(correctCount, totalCount);
  ```
- **Star Reward Logic** (handled in `App.tsx`):
  - 100% accuracy = 3 stars
  - >= 50% accuracy = 2 stars
  - < 50% accuracy = 1 star
  - Note: Flashcards is a pure study mode (`isRewardDisabled: true`), granting 0 stars to prevent grinding.

### 3. Kid-Friendly UX Design Rules
1. **Large Touch Targets**: Minimum `48px` x `48px` (or `h-12` / `py-3` in Tailwind), preferably with rounded borders (`rounded-2xl`).
2. **Visual Feedback**: Use color indicators (`bg-emerald-500` for correct, `bg-rose-500` for wrong) and shake/bounce micro-animations.
3. **No Punitive Failures**: Games should encourage trying again without harsh countdowns or frustrating game-over screens.
4. **Celebration**: Trigger `confetti({ particleCount: 50, spread: 60 })` on round completion or milestone correct answers.
5. **Multi-language**: All UI labels must come from `translations[language]`. Word translations must fall back gracefully: `word[language] || word.ru`.
