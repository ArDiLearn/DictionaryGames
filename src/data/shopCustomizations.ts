import { VictoryAnimationItem, VictoryMusicItem } from '../types';

export const VICTORY_MUSIC_ITEMS: VictoryMusicItem[] = [
  {
    id: 'classic',
    name: {
      ru: 'Классические фанфары',
      lv: 'Klasiskā fanfara',
    },
    desc: {
      ru: 'Торжественный победный марш с праздничными колокольчиками',
      lv: 'Svinīgs uzvaras maršs ar svētku zvaniņiem',
    },
    price: 0,
    icon: '🎺',
  },
  {
    id: 'sparkle',
    name: {
      ru: 'Волшебная пыльца',
      lv: 'Burvju putekļi',
    },
    desc: {
      ru: 'Нежная переливчатая арфа и хрустальный перезвон',
      lv: 'Maiga arfas melodija un kristāla zvanu skaņa',
    },
    price: 40,
    icon: '✨',
  },
  {
    id: 'retro_8bit',
    name: {
      ru: '8-Бит Ретро',
      lv: '8-Bitu Retro',
    },
    desc: {
      ru: 'Аркадная мелодия повышения уровня в стиле Game Boy',
      lv: 'Arkādes līmeņa sasniegšanas melodija Game Boy stilā',
    },
    price: 50,
    icon: '👾',
  },
  {
    id: 'rock_star',
    name: {
      ru: 'Рок-Звезда',
      lv: 'Roka Zvaigzne',
    },
    desc: {
      ru: 'Мощные гитарные пауэр-аккорды чемпиона',
      lv: 'Spēcīgi uzvarētāja ģitāras akordi',
    },
    price: 75,
    icon: '🎸',
  },
  {
    id: 'cosmic_synth',
    name: {
      ru: 'Космическая Одиссея',
      lv: 'Kosmiskā Odiseja',
    },
    desc: {
      ru: 'Глубокий космический синтвейв и звёздное арпеджио',
      lv: 'Dziļš kosmiskais sintveivs un zvaigžņu arpedžo',
    },
    price: 100,
    icon: '🚀',
  },
];

export const VICTORY_ANIMATION_ITEMS: VictoryAnimationItem[] = [
  {
    id: 'confetti',
    name: {
      ru: 'Праздничный серпантин',
      lv: 'Svētku serpentīns',
    },
    desc: {
      ru: 'Яркий разноцветный салют с длинными завитками серпантина',
      lv: 'Krāsains salūts ar vijīgām serpentīna lentām',
    },
    price: 0,
    icon: '🎉',
  },
  {
    id: 'stars',
    name: {
      ru: 'Золотой звездопад',
      lv: 'Zelta zvaigžņu lietus',
    },
    desc: {
      ru: 'Сверкающий фонтан золотых звёзд и искр',
      lv: 'Mirdzoša zelta zvaigžņu un dzirksteļu strūklaka',
    },
    price: 40,
    icon: '⭐',
  },
  {
    id: 'fireworks',
    name: {
      ru: 'Королевский салют',
      lv: 'Karaliskais salūts',
    },
    desc: {
      ru: 'Мощный многоуровневый фейерверк со вспышками и серпантином',
      lv: 'Spēcīga daudzlīmeņu uguņošana ar uzliesmojumiem',
    },
    price: 60,
    icon: '🎆',
  },
  {
    id: 'cosmic_nebula',
    name: {
      ru: 'Космическая туманность',
      lv: 'Kosmiskais miglājs',
    },
    desc: {
      ru: 'Мерцающая звёздная пыльца, сияющие звёзды и парящие планеты',
      lv: 'Mirdzoši zvaigžņu putekļi, spožas zvaigznes un planētas',
    },
    price: 80,
    icon: '🌌',
  },
  {
    id: 'rainbow_hearts',
    name: {
      ru: 'Радужные сердца',
      lv: 'Varavīksnes sirdis',
    },
    desc: {
      ru: 'Праздничный полёт ярких сердечек и тёплых искорок',
      lv: 'Krāsainu sirsniņu un siltu dzirksteļu lidojums',
    },
    price: 100,
    icon: '💖',
  },
];
