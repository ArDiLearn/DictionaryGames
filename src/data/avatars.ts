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

  // 2. Простые / Vienkāršie (10 ⭐)
  {
    id: 'panda',
    emoji: '🐼',
    name: { ru: 'Панда', lv: 'Panda' },
    price: 10,
    category: 'simple',
  },
  {
    id: 'fox',
    emoji: '🦊',
    name: { ru: 'Лисичка', lv: 'Lapsiņa' },
    price: 10,
    category: 'simple',
  },
  {
    id: 'bear',
    emoji: '🐻',
    name: { ru: 'Мишка', lv: 'Lācītis' },
    price: 10,
    category: 'simple',
  },
  {
    id: 'koala',
    emoji: '🐨',
    name: { ru: 'Коала', lv: 'Koala' },
    price: 10,
    category: 'simple',
  },
  {
    id: 'frog',
    emoji: '🐸',
    name: { ru: 'Лягушонок', lv: 'Vardīte' },
    price: 10,
    category: 'simple',
  },
  {
    id: 'penguin',
    emoji: '🐧',
    name: { ru: 'Пингвинчик', lv: 'Pingvīns' },
    price: 10,
    category: 'simple',
  },
  {
    id: 'owl',
    emoji: '🦉',
    name: { ru: 'Мудрая сова', lv: 'Gudrā pūce' },
    price: 10,
    category: 'simple',
  },
  {
    id: 'butterfly',
    emoji: '🦋',
    name: { ru: 'Бабочка', lv: 'Tauriņš' },
    price: 10,
    category: 'simple',
  },

  // 3. Средние / Vidējie (50 ⭐)
  {
    id: 'unicorn',
    emoji: '🦄',
    name: { ru: 'Единорог', lv: 'Vienradzis' },
    price: 50,
    category: 'medium',
  },
  {
    id: 'dragon',
    emoji: '🐲',
    name: { ru: 'Дракончик', lv: 'Pūķītis' },
    price: 50,
    category: 'medium',
  },
  {
    id: 'dino',
    emoji: '🦖',
    name: { ru: 'Динозаврик', lv: 'Dinozaurs' },
    price: 50,
    category: 'medium',
  },
  {
    id: 'dolphin',
    emoji: '🐬',
    name: { ru: 'Дельфин', lv: 'Delfīns' },
    price: 50,
    category: 'medium',
  },
  {
    id: 'ninja',
    emoji: '🥷',
    name: { ru: 'Ниндзя', lv: 'Nindzja' },
    price: 50,
    category: 'medium',
  },
  {
    id: 'superhero',
    emoji: '🦸',
    name: { ru: 'Супергерой', lv: 'Supervaronis' },
    price: 50,
    category: 'medium',
  },
  {
    id: 'wizard',
    emoji: '🧙',
    name: { ru: 'Волшебник', lv: 'Burvis' },
    price: 50,
    category: 'medium',
  },

  // 4. Уникальные / Unikālie (100 ⭐)
  {
    id: 'rocket',
    emoji: '🚀',
    name: { ru: 'Ракета', lv: 'Raķete' },
    price: 100,
    category: 'unique',
  },
  {
    id: 'robot',
    emoji: '🤖',
    name: { ru: 'Робот', lv: 'Robots' },
    price: 100,
    category: 'unique',
  },
  {
    id: 'crown',
    emoji: '👑',
    name: { ru: 'Королевский', lv: 'Karaliskais' },
    price: 100,
    category: 'unique',
  },
  {
    id: 'star',
    emoji: '⭐',
    name: { ru: 'Суперзвезда', lv: 'Superzvaigzne' },
    price: 100,
    category: 'unique',
  },
  {
    id: 'trophy',
    emoji: '🏆',
    name: { ru: 'Чемпион', lv: 'Čempions' },
    price: 100,
    category: 'unique',
  },
  {
    id: 'ufo',
    emoji: '🛸',
    name: { ru: 'Космолёт', lv: 'Kosmosa kuģis' },
    price: 100,
    category: 'unique',
  },
];
