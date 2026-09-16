---
name: dictionary-curriculum-manager
description: >-
  Procedures, rules, and validation for editing the English-Latvian-Russian dictionary,
  managing school curriculum topics across Grades 1, 2, and 3, maintaining phonetic transcriptions,
  and handling word illustrations and icons. Use when adding, editing, or reordering words or topics.
---

# Dictionary & Curriculum Manager

This skill provides step-by-step instructions and safeguards for modifying the vocabulary dictionary, school curriculum topics, phonetic transcriptions, and illustrations in the DictionaryGames (Wordy Kids) project.

## Architecture & Data Flow

1. **Master Source**: `Словарь англ. 1-2 класс.csv` (CSV format with commas, UTF-8).
2. **Parser Script**: `scripts/parse-csv.js` converts CSV into `src/data/words.json`.
3. **Transcriptions**: `scripts/transcriptions.js` maps English words to IPA phonetics (e.g., `[ triː ]`).
4. **Illustrations**: `scripts/word-images.js` maps `topic_id:word` or `word` to SVG data URIs or emoji fallbacks.
5. **Curriculum Orders**: `src/utils/i18n.ts` defines:
   - `GRADE_1_MAIN_TOPICS` (12 topics)
   - `GRADE_2_MAIN_TOPICS` (14 topics)
   - `GRADE_3_MAIN_TOPICS` (10 topics)
   - `EXTRA_TOPICS` (6 cross-curricular topics: pronouns, introductions, questions, instructions, places, helper_words)
   - `GRADE_1_TOPIC_ORDER`, `GRADE_2_TOPIC_ORDER`, `GRADE_3_TOPIC_ORDER`.

---

## Workflow: Modifying or Adding Words

### Step 1: Edit the Master CSV
- Locate the target topic block in `Словарь англ. 1-2 класс.csv`.
- Topic header format: `English Topic,Latvian Topic,Russian Topic,`
- Word row format: `en,lv,ru,grade` (where grade is `1`, `2`, or `3`).
- If translations contain commas, enclose the column in quotes: `what,"kas, kāds","что, какой",1`.

### Step 2: Add Phonetic Transcriptions (If New Word)
- Open `scripts/transcriptions.js`.
- Add the IPA phonetic transcription in lowercase:
  ```js
  'word': '[ wɜːd ]',
  ```

### Step 3: Add Illustration / SVG (If New Word)
- Open `scripts/word-images.js`.
- If an emoji or existing SVG is insufficient, add an inline SVG illustration or emoji:
  ```js
  'topic_id:word': 'data:image/svg+xml;utf8,...',
  ```

### Step 4: Re-parse and Regenerate JSON
Execute the build parser:
```bash
node scripts/parse-csv.js
```

### Step 5: Run Curriculum Validation Script
Run the automated validator to verify 0 errors, no duplicates, and correct grade mapping:
```bash
node .agents/skills/dictionary-curriculum-manager/scripts/validate-dictionary.cjs
```

### Step 6: Verify TypeScript & Vite Build
```bash
npm run build
```
