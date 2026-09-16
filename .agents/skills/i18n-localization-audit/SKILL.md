---
name: i18n-localization-audit
description: >-
  Auditing translation completeness, dual-language parity between Russian (RU) and Latvian (LV),
  pluralization rules, and localized player display names in DictionaryGames.
  Use when adding new UI text, altering translation strings, or debugging language switches.
---

# i18n & Localization Audit

This skill ensures complete, culturally accurate, and grammatically correct bilingual localization for both **Russian (ru)** and **Latvian (lv)** languages across the DictionaryGames interface.

## Core Rules

1. **Strict Parity**: Every string added to `translations.ru` in `src/utils/i18n.ts` **must** simultaneously be added to `translations.lv` and registered in the `Translations` TypeScript interface.
2. **Pluralization Handling**:
   - **Russian**: Uses 3 forms:
     - Form 1 (mod10 = 1, mod100 != 11): `1 слово`, `21 слово`, `1 тема`.
     - Form 2 (mod10 in 2..4, mod100 not in 12..14): `2 слова`, `3 слова`, `2 темы`.
     - Form 3 (0, 5..20, mod10 in 0, 5..9): `5 слов`, `12 слов`, `14 тем`.
     - Always use `getWordsPlural(count, 'ru')` or `getTopicsPlural(count, 'ru')`.
   - **Latvian**: Uses 2 forms:
     - Singular (mod10 = 1, mod100 != 11): `1 vārds`, `21 vārds`, `1 tēma`.
     - Plural: `2 vārdi`, `10 vārdi`, `14 tēmas`.
     - Always use `getWordsPlural(count, 'lv')` or `getTopicsPlural(count, 'lv')`.
3. **Player Name Localization**:
   - Default player name is "Знайка" (RU) and "Zinītis" (LV).
   - Use `getPlayerDisplayName(playerName, language)` to resolve the name dynamically when switching languages.

## Automated Verification

Run the automated parity checker to verify that 0 keys are missing in either language:
```bash
node .agents/skills/i18n-localization-audit/scripts/check-i18n.cjs
```
