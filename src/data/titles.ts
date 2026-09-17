import { PlayerTitle } from '../types';

export const DEFAULT_UNLOCKED_TITLES = ['starter'];

export const PLAYER_TITLES: PlayerTitle[] = [
  // Базовый
  {
    id: 'starter',
    name: { ru: 'Ученик', lv: 'Skolēns' },
    desc: { ru: 'Начало пути в мире знаний', lv: 'Zināšanu ceļa sākums' },
    icon: '✨',
    category: 'activity',
  },

  // 1. Академические (Экзамены)
  {
    id: 'grad_g1',
    name: { ru: 'Выпускник 1-го класса', lv: '1. klases absolvents' },
    desc: { ru: 'Сдать школьный экзамен за 1-й класс', lv: 'Nokārtot 1. klases skolas eksāmenu' },
    icon: '🎓',
    category: 'academic',
  },
  {
    id: 'grad_g2',
    name: { ru: 'Магистр 2-го класса', lv: '2. klases maģistrs' },
    desc: { ru: 'Сдать школьный экзамен за 2-й класс', lv: 'Nokārtot 2. klases skolas eksāmenu' },
    icon: '📜',
    category: 'academic',
  },
  {
    id: 'grad_g3',
    name: { ru: 'Эрудит 3-го класса', lv: '3. klases erudīts' },
    desc: { ru: 'Сдать школьный экзамен за 3-й класс', lv: 'Nokārtot 3. klases skolas eksāmenu' },
    icon: '🏛️',
    category: 'academic',
  },
  {
    id: 'gold_medalist',
    name: { ru: 'Золотой медалист', lv: 'Zelta medaļnieks' },
    desc: { ru: 'Сдать любой экзамен на 100% без ошибок', lv: 'Nokārtot jebkuru eksāmenu uz 100% bez kļūdām' },
    icon: '🥇',
    category: 'academic',
  },

  // 2. Словарные вехи
  {
    id: 'words_25',
    name: { ru: 'Юный полиглот', lv: 'Jaunais poliglots' },
    desc: { ru: 'Выучить 25 слов', lv: 'Apgūt pirmos 25 vārdus' },
    icon: '🐣',
    category: 'words',
  },
  {
    id: 'words_50',
    name: { ru: 'Охотник за словами', lv: 'Vārdu mednieks' },
    desc: { ru: 'Выучить 50 слов', lv: 'Apgūt 50 vārdus' },
    icon: '🏹',
    category: 'words',
  },
  {
    id: 'words_100',
    name: { ru: 'Словарный мастер', lv: 'Vārdu meistars' },
    desc: { ru: 'Выучить 100 слов', lv: 'Apgūt 100 vārdus' },
    icon: '🗡️',
    category: 'words',
  },
  {
    id: 'words_250',
    name: { ru: 'Профессор языка', lv: 'Valodas profesors' },
    desc: { ru: 'Выучить 250 слов', lv: 'Apgūt 250 vārdus' },
    icon: '🧙',
    category: 'words',
  },
  {
    id: 'words_400',
    name: { ru: 'Ходячая энциклопедия', lv: 'Dzīvā enciklopēdija' },
    desc: { ru: 'Выучить 400 слов', lv: 'Apgūt 400 vārdus' },
    icon: '📖',
    category: 'words',
  },
  {
    id: 'words_500',
    name: { ru: 'Легенда WordyMind', lv: 'WordyMind leģenda' },
    desc: { ru: 'Выучить более 500 слов', lv: 'Apgūt vairāk nekā 500 vārdus' },
    icon: '👑',
    category: 'words',
  },

  // 3. Тематические (100% тем)
  {
    id: 'beast_master',
    name: { ru: 'Царь зверей', lv: 'Zvērkopis' },
    desc: { ru: 'Освоить на 100% все темы о животных', lv: 'Pilnībā apgūt visas tēmas par dzīvniekiem' },
    icon: '🐾',
    category: 'topics',
  },
  {
    id: 'master_chef',
    name: { ru: 'Шеф-повар', lv: 'Šefpavārs' },
    desc: { ru: 'Освоить на 100% все темы о еде и овощах', lv: 'Pilnībā apgūt visas ēdienu un dārzeņu tēmas' },
    icon: '🍕',
    category: 'topics',
  },
  {
    id: 'nature_guardian',
    name: { ru: 'Хранитель природы', lv: 'Dabas sargs' },
    desc: { ru: 'Освоить на 100% темы «Природа» и «Сад»', lv: 'Pilnībā apgūt tēmas «Daba» un «Dārzs»' },
    icon: '🌿',
    category: 'topics',
  },
  {
    id: 'order_master',
    name: { ru: 'Повелитель порядка', lv: 'Kārtības pavēlnieks' },
    desc: { ru: 'Освоить на 100% тему «Инструкции» (54 слова)', lv: 'Pilnībā apgūt tēmu «Norādījumi» (54 vārdus)' },
    icon: '📋',
    category: 'topics',
  },
  {
    id: 'true_friend',
    name: { ru: 'Верный друг', lv: 'Uzticams draugs' },
    desc: { ru: 'Освоить на 100% темы о семье и дружбе', lv: 'Pilnībā apgūt tēmas par ģimeni un draudzību' },
    icon: '🤝',
    category: 'topics',
  },
  {
    id: 'circus_star',
    name: { ru: 'Звезда цирка', lv: 'Cirka zvaigzne' },
    desc: { ru: 'Освоить на 100% тему «Цирк и костюмы»', lv: 'Pilnībā apgūt tēmu «Cirks un kostīmi»' },
    icon: '🎪',
    category: 'topics',
  },

  // 4. Календарь усердия и подвиги
  {
    id: 'first_step',
    name: { ru: 'Старт дан!', lv: 'Starts dots!' },
    desc: { ru: 'Позаниматься 3 активных дня', lv: 'Mācīties 3 aktīvas dienas' },
    icon: '🚀',
    category: 'activity',
  },
  {
    id: 'curious_student',
    name: { ru: 'Любознательный ученик', lv: 'Zinātkārs skolēns' },
    desc: { ru: 'Позаниматься 7 активных дней', lv: 'Mācīties 7 aktīvas dienas' },
    icon: '💡',
    category: 'activity',
  },
  {
    id: 'persistent_thinker',
    name: { ru: 'Упорный умник', lv: 'Neatlaidīgs gudrinieks' },
    desc: { ru: 'Позаниматься 15 активных дней', lv: 'Mācīties 15 aktīvas dienas' },
    icon: '🌟',
    category: 'activity',
  },
  {
    id: 'consistency_master',
    name: { ru: 'Мастер постоянства', lv: 'Pastāvības meistars' },
    desc: { ru: 'Позаниматься 30 активных дней', lv: 'Mācīties 30 aktīvas dienas' },
    icon: '🏆',
    category: 'activity',
  },
  {
    id: 'explorer',
    name: { ru: 'Первооткрыватель', lv: 'Atklājējs' },
    desc: { ru: 'Сыграть во все 6 режимов мини-игр', lv: 'Izspēlēt visus 6 mini spēļu režīmus' },
    icon: '🧭',
    category: 'activity',
  },
  {
    id: 'sniper',
    name: { ru: 'Снайпер', lv: 'Snaiperis' },
    desc: { ru: 'Пройти мини-игру со 100% точностью', lv: 'Pabeigt mini spēli ar 100% precizitāti' },
    icon: '🎯',
    category: 'activity',
  },
];

export function getTitleById(id?: string): PlayerTitle {
  return PLAYER_TITLES.find((t) => t.id === id) || PLAYER_TITLES[0];
}
