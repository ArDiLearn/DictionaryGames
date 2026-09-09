import { Language } from '../types';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  chooseTopic: string;
  searchPlaceholder: string;
  allTopics: string;
  wordsCount: string;
  learnedCount: string;
  play: string;
  back: string;
  next: string;
  finish: string;
  restart: string;
  backToTopics: string;
  listen: string;
  iKnow: string;
  needPractice: string;
  awesome: string;
  goodJob: string;
  keepGoing: string;
  tryAgain: string;
  correct: string;
  wrong: string;
  tapToFlip: string;
  spellTheWord: string;
  clearLetters: string;
  matchPrompt: string;
  audioPrompt: string;
  score: string;
  starsEarned: string;
  roundComplete: string;
  modes: {
    flashcards: string;
    quiz: string;
    builder: string;
    match: string;
    audio: string;
  };
  modeDescriptions: {
    flashcards: string;
    quiz: string;
    builder: string;
    match: string;
    audio: string;
  };
  sync: {
    title: string;
    description: string;
    emailLabel: string;
    passwordLabel: string;
    loginBtn: string;
    signupBtn: string;
    guestMode: string;
    synced: string;
    notSynced: string;
    syncNow: string;
    supabaseConfig: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    saveConfig: string;
    logout: string;
  };
  installApp: string;
  installedNotice: string;
  changeAvatar: string;
}

export const translations: Record<Language, Translations> = {
  ru: {
    appTitle: 'WordyKids',
    appSubtitle: 'Английский для 1–2 класса',
    chooseTopic: 'Выбери тему для игры',
    searchPlaceholder: 'Поиск темы...',
    allTopics: 'Все темы',
    wordsCount: 'слов',
    learnedCount: 'выучено',
    play: 'Играть',
    back: 'Назад',
    next: 'Дальше',
    finish: 'Завершить',
    restart: 'Сначала',
    backToTopics: 'К темам',
    listen: 'Послушать',
    iKnow: 'Я знаю! ⭐',
    needPractice: 'Повторить 🔁',
    awesome: 'Ура! Супер!',
    goodJob: 'Молодец! Ты справился!',
    keepGoing: 'Продолжай в том же духе!',
    tryAgain: 'Попробуй ещё разок!',
    correct: 'Верно!',
    wrong: 'Ой, ошибка!',
    tapToFlip: 'Нажми на карточку, чтобы узнать перевод',
    spellTheWord: 'Нажимай на буквы и собери слово',
    clearLetters: 'Сбросить буквы',
    matchPrompt: 'Найди пары: английское слово и перевод',
    audioPrompt: 'Слушай внимательно и выбери правильный ответ',
    score: 'Счёт',
    starsEarned: 'Получено звёзд',
    roundComplete: 'Тема пройдена!',
    modes: {
      flashcards: 'Карточки',
      quiz: 'Викторина',
      builder: 'Собери слово',
      match: 'Найди пару',
      audio: 'На слух',
    },
    modeDescriptions: {
      flashcards: 'Учи новые слова с озвучкой и переводом',
      quiz: 'Выбирай правильный перевод из 4 вариантов',
      builder: 'Составляй английские слова из букв-кубиков',
      match: 'Соединяй английские слова с переводом',
      audio: 'Тренируй ушки: слушай произношение и угадывай',
    },
    sync: {
      title: 'Синхронизация прогресса',
      description: 'Сохраняй звёздочки и прогресс между компьютером и телефоном!',
      emailLabel: 'Почта (или логин):',
      passwordLabel: 'Пароль (PIN-код):',
      loginBtn: 'Войти',
      signupBtn: 'Создать профиль',
      guestMode: 'Играть без аккаунта (локально)',
      synced: 'Синхронизировано с облаком',
      notSynced: 'Сохраняется только на этом устройстве',
      syncNow: 'Синхронизировать сейчас',
      supabaseConfig: 'Настройки Supabase (для родителей)',
      supabaseUrl: 'Project URL (https://xyz.supabase.co)',
      supabaseAnonKey: 'Anon Public Key',
      saveConfig: 'Сохранить ключи',
      logout: 'Выйти из профиля',
    },
    installApp: 'Установить на экран',
    installedNotice: 'Приложение установлено',
    changeAvatar: 'Выбери своего героя',
  },
  lv: {
    appTitle: 'WordyKids',
    appSubtitle: 'Angļu valoda 1.–2. klasei',
    chooseTopic: 'Izvēlies tēmu spēlei',
    searchPlaceholder: 'Meklēt tēmu...',
    allTopics: 'Visas tēmas',
    wordsCount: 'vārdi',
    learnedCount: 'apgūti',
    play: 'Spēlēt',
    back: 'Atpakaļ',
    next: 'Tālāk',
    finish: 'Pabeigt',
    restart: 'No sākuma',
    backToTopics: 'Uz tēmām',
    listen: 'Klausīties',
    iKnow: 'Es zinu! ⭐',
    needPractice: 'Atkārtot 🔁',
    awesome: 'Urrā! Lieliski!',
    goodJob: 'Malacis! Tev izdevās!',
    keepGoing: 'Turpini tāpat!',
    tryAgain: 'Mēģini vēlreiz!',
    correct: 'Pareizi!',
    wrong: 'Oi, kļūdiņa!',
    tapToFlip: 'Pieskaries kartītei, lai redzētu tulkojumu',
    spellTheWord: 'Spied uz burtiem un saliec vārdu',
    clearLetters: 'Notīrīt burtus',
    matchPrompt: 'Atrodi pārus: angļu vārds un tulkojums',
    audioPrompt: 'Klausies uzmanīgi un izvēlies pareizo atbildi',
    score: 'Rezultāts',
    starsEarned: 'Nopelnītās zvaigznītes',
    roundComplete: 'Tēma pabeigta!',
    modes: {
      flashcards: 'Kartītes',
      quiz: 'Viktorīna',
      builder: 'Saliec vārdu',
      match: 'Atrodi pāri',
      audio: 'Pēc dzirdes',
    },
    modeDescriptions: {
      flashcards: 'Mācies vārdus ar izrunu un tulkojumu',
      quiz: 'Izvēlies pareizo tulkojumu no 4 variantiem',
      builder: 'Saliec angļu vārdus no burtu klucīšiem',
      match: 'Savieno angļu vārdus ar tulkojumu',
      audio: 'Trenē dzirdi: klausies un uzmini vārdu',
    },
    sync: {
      title: 'Progresa sinhronizācija',
      description: 'Saglabā zvaigznītes starp datoru un tālruni!',
      emailLabel: 'E-pasts (vai lietotājvārds):',
      passwordLabel: 'Parole (PIN kods):',
      loginBtn: 'Ienākt',
      signupBtn: 'Izveidot profilu',
      guestMode: 'Spēlēt bez konta (lokāli)',
      synced: 'Sinhronizēts ar mākoni',
      notSynced: 'Saglabāts tikai šajā ierīcē',
      syncNow: 'Sinhronizēt tagad',
      supabaseConfig: 'Supabase iestatījumi (vecākiem)',
      supabaseUrl: 'Project URL (https://xyz.supabase.co)',
      supabaseAnonKey: 'Anon Public Key',
      saveConfig: 'Saglabāt atslēgas',
      logout: 'Iziet',
    },
    installApp: 'Instalēt sākuma ekrānā',
    installedNotice: 'Lietotne instalēta',
    changeAvatar: 'Izvēlies savu varoni',
  },
};
