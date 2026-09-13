import { AvatarShopItem } from '../types';

export const DEFAULT_UNLOCKED_AVATARS = ['🦁', '🐱', '🐶', '🐰'];

export const AVATAR_SHOP_ITEMS: AvatarShopItem[] = [
  // 1. Starter (0 ⭐ - Unlocked from start)
  {
    id: 'lion',
    emoji: '🦁',
    name: { ru: 'Лев Знайка', lv: 'Lauva Zinītis' },
    price: 0,
    category: 'starter',
  },
  {
    id: 'cat',
    emoji: '🐱',
    name: { ru: 'Котёнок', lv: 'Kaķēns' },
    price: 0,
    category: 'starter',
  },
  {
    id: 'dog',
    emoji: '🐶',
    name: { ru: 'Щенок', lv: 'Kucēns' },
    price: 0,
    category: 'starter',
  },
  {
    id: 'bunny',
    emoji: '🐰',
    name: { ru: 'Зайчик', lv: 'Zaķītis' },
    price: 0,
    category: 'starter',
  },

  // 2. Cute Animals (3 ⭐)
  {
    id: 'panda',
    emoji: '🐼',
    name: { ru: 'Панда', lv: 'Panda' },
    price: 3,
    category: 'animals',
  },
  {
    id: 'fox',
    emoji: '🦊',
    name: { ru: 'Лисичка', lv: 'Lapsiņa' },
    price: 3,
    category: 'animals',
  },
  {
    id: 'bear',
    emoji: '🐻',
    name: { ru: 'Мишка', lv: 'Lācītis' },
    price: 3,
    category: 'animals',
  },
  {
    id: 'koala',
    emoji: '🐨',
    name: { ru: 'Коала', lv: 'Koala' },
    price: 3,
    category: 'animals',
  },
  {
    id: 'frog',
    emoji: '🐸',
    name: { ru: 'Лягушонок', lv: 'Vardīte' },
    price: 3,
    category: 'animals',
  },
  {
    id: 'penguin',
    emoji: '🐧',
    name: { ru: 'Пингвинчик', lv: 'Pingvīns' },
    price: 3,
    category: 'animals',
  },

  // 3. Magic & Rare (5 ⭐)
  {
    id: 'unicorn',
    emoji: '🦄',
    name: { ru: 'Единорог', lv: 'Vienradzis' },
    price: 5,
    category: 'magic',
  },
  {
    id: 'dragon',
    emoji: '🐲',
    name: { ru: 'Дракончик', lv: 'Pūķītis' },
    price: 5,
    category: 'magic',
  },
  {
    id: 'dino',
    emoji: '🦖',
    name: { ru: 'Динозаврик', lv: 'Dinozaurs' },
    price: 5,
    category: 'magic',
  },
  {
    id: 'dolphin',
    emoji: '🐬',
    name: { ru: 'Дельфин', lv: 'Delfīns' },
    price: 5,
    category: 'magic',
  },
  {
    id: 'owl',
    emoji: '🦉',
    name: { ru: 'Мудрая сова', lv: 'Gudrā pūce' },
    price: 5,
    category: 'magic',
  },
  {
    id: 'butterfly',
    emoji: '🦋',
    name: { ru: 'Бабочка', lv: 'Tauriņš' },
    price: 5,
    category: 'magic',
  },

  // 4. Superheroes & Space (8–10 ⭐)
  {
    id: 'rocket',
    emoji: '🚀',
    name: { ru: 'Ракета', lv: 'Raķete' },
    price: 8,
    category: 'heroes',
  },
  {
    id: 'ninja',
    emoji: '🥷',
    name: { ru: 'Ниндзя', lv: 'Nindzja' },
    price: 8,
    category: 'heroes',
  },
  {
    id: 'superhero',
    emoji: '🦸',
    name: { ru: 'Супергерой', lv: 'Supervaronis' },
    price: 8,
    category: 'heroes',
  },
  {
    id: 'wizard',
    emoji: '🧙',
    name: { ru: 'Волшебник', lv: 'Burvis' },
    price: 8,
    category: 'heroes',
  },
  {
    id: 'crown',
    emoji: '👑',
    name: { ru: 'Корона', lv: 'Kronis' },
    price: 10,
    category: 'heroes',
  },
  {
    id: 'robot',
    emoji: '🤖',
    name: { ru: 'Робот', lv: 'Robots' },
    price: 10,
    category: 'heroes',
  },
  {
    id: 'star',
    emoji: '⭐',
    name: { ru: 'Суперзвезда', lv: 'Superzvaigzne' },
    price: 10,
    category: 'heroes',
  },
  {
    id: 'trophy',
    emoji: '🏆',
    name: { ru: 'Чемпион', lv: 'Čempions' },
    price: 10,
    category: 'heroes',
  },
];
