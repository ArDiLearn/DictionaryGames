import { Language, Grade } from '../types';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  welcomeGreeting: string;
  defaultPlayerName: string;
  chooseTopic: string;
  searchPlaceholder: string;
  allTopics: string;
  noResultsFound: string;
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
  wrongVariantsTitle: string;
  tryAnotherOrder: string;
  matchPrompt: string;
  audioPrompt: string;
  score: string;
  starsEarned: string;
  roundComplete: string;
  soundOn: string;
  soundOff: string;
  modes: {
    flashcards: string;
    builder: string;
    match: string;
    truefalse: string;
    balloons: string;
    audio: string;
  };
  modeDescriptions: {
    flashcards: string;
    builder: string;
    match: string;
    truefalse: string;
    balloons: string;
    audio: string;
  };
  trueBtn: string;
  falseBtn: string;
  trafficPrompt: string;
  balloonPrompt: string;
  balloonMissed: string;
  sync: {
    title: string;
    description: string;
    loginLabel: string;
    passwordLabel: string;
    loginPlaceholder: string;
    passwordPlaceholder: string;
    loginBtn: string;
    signupBtn: string;
    logout: string;
    synced: string;
    notSynced: string;
    syncNow: string;
    syncShortBtn: string;
    cloudShortBtn: string;
    myProfile: string;
    accountLogin: string;
    accountCreate: string;
    loggedInAs: string;
    syncSuccess: string;
    syncError: string;
    loginSuccess: string;
    signupSuccess: string;
    emptyFieldsError: string;
    shortPasswordError: string;
    alreadyHaveAccount: string;
    needNewAccount: string;
    switchModeToSignup: string;
    switchModeToLogin: string;
  };
  installApp: string;
  installedNotice: string;
  changeAvatar: string;
  gradeSelectorLabel: string;
  grade1: string;
  grade2: string;
  grade3: string;
  gradeAll: string;
  grade1Short: string;
  grade2Short: string;
  grade3Short: string;
  gradeAllShort: string;
  gradeTitle1: string;
  gradeTitle2: string;
  gradeTitle3: string;
  gradeTitleAll: string;
  gradeFilterNotice1: string;
  gradeFilterNotice2: string;
  gradeFilterNotice3: string;
  gradeFilterNoticeAll: string;
  // Avatar Shop
  avatarShopTitle: string;
  avatarShopSubtitle: string;
  myStarBalance: string;
  totalEarnedStarsLabel: string;
  buyFor: string;
  equipped: string;
  equip: string;
  freeStarter: string;
  notEnoughStars: string;
  categoryAll: string;
  categoryStarter: string;
  categorySimple: string;
  categoryMedium: string;
  categoryUnique: string;
  tierBadgeSimple: string;
  tierBadgeMedium: string;
  tierBadgeUnique: string;
  starsAddedToBank: string;
  shopNotice: string;
  congratsAvatarPurchased: string;
}

export const translations: Record<Language, Translations> = {
  ru: {
    appTitle: 'WordyKids',
    appSubtitle: 'Английский для 1–3 классов',
    welcomeGreeting: 'Привет',
    defaultPlayerName: 'Знайка',
    chooseTopic: 'Выбери тему для игры',
    searchPlaceholder: 'Поиск темы...',
    allTopics: 'Все темы',
    noResultsFound: 'Ничего не нашлось',
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
    wrongVariantsTitle: 'Неправильные варианты:',
    tryAnotherOrder: 'Попробуй составить иначе',
    matchPrompt: 'Найди пары: английское слово и перевод',
    audioPrompt: 'Слушай внимательно и выбери правильный ответ',
    score: 'Счёт',
    starsEarned: 'Получено звёзд',
    roundComplete: 'Тема пройдена!',
    soundOn: 'Звук включен',
    soundOff: 'Звук выключен',
    modes: {
      flashcards: 'Карточки',
      builder: 'Собери слово',
      match: 'Найди пару',
      truefalse: 'Правда или ложь?',
      balloons: 'Поймай перевод',
      audio: 'На слух',
    },
    modeDescriptions: {
      flashcards: 'Учи новые слова с озвучкой и переводом',
      builder: 'Составляй английские слова из букв-кубиков',
      match: 'Соединяй английские слова с переводом',
      truefalse: 'Светофор: нажимай зелёный (Верно) или красный (Неверно)',
      balloons: 'Лопай шарик с правильным английским словом',
      audio: 'Тренируй ушки: слушай произношение и угадывай',
    },
    trueBtn: 'Верно',
    falseBtn: 'Неверно',
    trafficPrompt: 'Подходит ли перевод к слову?',
    balloonPrompt: 'Поймай шарик с правильным английским словом!',
    balloonMissed: 'Время вышло! Правильный перевод:',
    sync: {
      title: 'Синхронизация прогресса',
      description: 'Сохраняй звёздочки и прогресс между компьютером и телефоном!',
      loginLabel: 'Имя (логин):',
      passwordLabel: 'Пароль (или PIN-код):',
      loginPlaceholder: 'Например: ivan или danik',
      passwordPlaceholder: 'Не менее 6 символов',
      loginBtn: 'Войти',
      signupBtn: 'Создать профиль',
      logout: 'Выйти из профиля',
      synced: 'Синхронизировано с облаком',
      notSynced: 'Сохраняется только на этом устройстве',
      syncNow: 'Синхронизировать сейчас',
      syncShortBtn: 'Синхр.',
      cloudShortBtn: 'Облако',
      myProfile: 'Мой профиль',
      accountLogin: 'Вход в профиль',
      accountCreate: 'Новый игрок',
      loggedInAs: 'Вы вошли как:',
      syncSuccess: 'Данные успешно синхронизированы!',
      syncError: 'Не удалось синхронизировать данные',
      loginSuccess: 'Успешный вход! Синхронизируем...',
      signupSuccess: 'Профиль создан! Синхронизируем...',
      emptyFieldsError: 'Пожалуйста, введите логин и пароль',
      shortPasswordError: 'Пароль должен содержать от 6 символов',
      alreadyHaveAccount: 'Уже есть профиль?',
      needNewAccount: 'Ещё нет профиля?',
      switchModeToSignup: 'Создать новый профиль',
      switchModeToLogin: 'Уже есть профиль? Войти',
    },
    installApp: 'Установить на экран',
    installedNotice: 'Приложение установлено',
    changeAvatar: 'Выбери своего героя',
    gradeSelectorLabel: 'Класс',
    grade1: '1 класс',
    grade2: '2 класс',
    grade3: '3 класс',
    gradeAll: 'Все классы',
    grade1Short: '1 кл.',
    grade2Short: '2 кл.',
    grade3Short: '3 кл.',
    gradeAllShort: 'Все',
    gradeTitle1: 'Только 1 класс',
    gradeTitle2: 'Только 2 класс',
    gradeTitle3: 'Только 3 класс',
    gradeTitleAll: 'Все классы (1, 2 и 3)',
    gradeFilterNotice1: 'Показаны темы только для 1 класса',
    gradeFilterNotice2: 'Показаны темы только для 2 класса',
    gradeFilterNotice3: 'Показаны темы только для 3 класса',
    gradeFilterNoticeAll: 'Показаны темы для всех классов (1, 2 и 3)',
    // Avatar Shop
    avatarShopTitle: 'Магазин аватаров',
    avatarShopSubtitle: 'Выбирай и покупай новых героев за звёздочки!',
    myStarBalance: 'Твой баланс',
    totalEarnedStarsLabel: 'Всего звёзд заработано',
    buyFor: 'Купить за',
    equipped: 'Надет',
    equip: 'Выбрать',
    freeStarter: 'Бесплатно',
    notEnoughStars: 'Не хватает звёзд',
    categoryAll: 'Все',
    categoryStarter: 'Стартовые',
    categorySimple: 'Простые (10 ⭐)',
    categoryMedium: 'Средние (50 ⭐)',
    categoryUnique: 'Уникальные (100 ⭐)',
    tierBadgeSimple: 'Простой',
    tierBadgeMedium: 'Средний',
    tierBadgeUnique: '✨ Уникальный',
    starsAddedToBank: 'в копилку аватаров!',
    shopNotice: 'Играй в игры и учи слова, чтобы пополнять копилку звёздочек и открывать новых героев!',
    congratsAvatarPurchased: 'Ура! Новый аватар разблокирован!',
  },
  lv: {
    appTitle: 'WordyKids',
    appSubtitle: 'Angļu valoda 1.–3. klasei',
    welcomeGreeting: 'Sveiks',
    defaultPlayerName: 'Zinītis',
    chooseTopic: 'Izvēlies tēmu spēlei',
    searchPlaceholder: 'Meklēt tēmu...',
    allTopics: 'Visas tēmas',
    noResultsFound: 'Nekas netika atrasts',
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
    wrongVariantsTitle: 'Nepareizi varianti:',
    tryAnotherOrder: 'Mēģini salikt citādi',
    matchPrompt: 'Atrodi pārus: angļu vārds un tulkojums',
    audioPrompt: 'Klausies uzmanīgi un izvēlies pareizo atbildi',
    score: 'Rezultāts',
    starsEarned: 'Nopelnītās zvaigznītes',
    roundComplete: 'Tēma pabeigta!',
    soundOn: 'Skaņa ieslēgta',
    soundOff: 'Skaņa izslēgta',
    modes: {
      flashcards: 'Kartītes',
      builder: 'Saliec vārdu',
      match: 'Atrodi pāri',
      truefalse: 'Patiesība vai meli?',
      balloons: 'Noķer tulkojumu',
      audio: 'Pēc dzirdes',
    },
    modeDescriptions: {
      flashcards: 'Mācies vārdus ar izrunu un tulkojumu',
      builder: 'Saliec angļu vārdus no burtu klucīšiem',
      match: 'Savieno angļu vārdus ar tulkojumu',
      truefalse: 'Luksofors: spied zaļo (Pareizi) vai sarkano (Nepareizi)',
      balloons: 'Pārspried balonu ar pareizo angļu vārdu',
      audio: 'Trenē dzirdi: klausies un uzmini vārdu',
    },
    trueBtn: 'Pareizi',
    falseBtn: 'Nepareizi',
    trafficPrompt: 'Vai tulkojums atbilst vārdam?',
    balloonPrompt: 'Noķer balonu ar pareizo angļu vārdu!',
    balloonMissed: 'Laiks beidzās! Pareizais tulkojums:',
    sync: {
      title: 'Progresa sinhronizācija',
      description: 'Saglabā zvaigznītes un progresu starp datoru un telefonu!',
      loginLabel: 'Lietotājvārds (vārds):',
      passwordLabel: 'Parole (vai PIN kods):',
      loginPlaceholder: 'Piemēram: janis vai anna',
      passwordPlaceholder: 'Vismaz 6 simboli',
      loginBtn: 'Ienākt',
      signupBtn: 'Izveidot profilu',
      logout: 'Iziet no profila',
      synced: 'Sinhronizēts ar mākoni',
      notSynced: 'Saglabāts tikai šajā ierīcē',
      syncNow: 'Sinhronizēt tagad',
      syncShortBtn: 'Sinhron.',
      cloudShortBtn: 'Mākonis',
      myProfile: 'Mans profils',
      accountLogin: 'Ienākšana profilā',
      accountCreate: 'Jauns spēlētājs',
      loggedInAs: 'Tu esi ienācis kā:',
      syncSuccess: 'Dati veiksmīgi sinhronizēti!',
      syncError: 'Neizdevās sinhronizēt datus',
      loginSuccess: 'Veiksmīga pieteikšanās! Sinhronizējam...',
      signupSuccess: 'Profils izveidots! Sinhronizējam...',
      emptyFieldsError: 'Lūdzu, ievadi lietotājvārdu un paroli',
      shortPasswordError: 'Parolei jābūt vismaz 6 simbolu garai',
      alreadyHaveAccount: 'Jau ir profils?',
      needNewAccount: 'Vēl nav profila?',
      switchModeToSignup: 'Izveidot jaunu profilu',
      switchModeToLogin: 'Jau ir profils? Ienākt',
    },
    installApp: 'Instalēt sākuma ekrānā',
    installedNotice: 'Lietotne instalēta',
    changeAvatar: 'Izvēlies savu varoni',
    gradeSelectorLabel: 'Klase',
    grade1: '1. klase',
    grade2: '2. klase',
    grade3: '3. klase',
    gradeAll: 'Visas klases',
    grade1Short: '1. kl.',
    grade2Short: '2. kl.',
    grade3Short: '3. kl.',
    gradeAllShort: 'Visi',
    gradeTitle1: 'Tikai 1. klase',
    gradeTitle2: 'Tikai 2. klase',
    gradeTitle3: 'Tikai 3. klase',
    gradeTitleAll: 'Visas klases (1., 2. un 3.)',
    gradeFilterNotice1: 'Rādītās tēmas tikai 1. klasei',
    gradeFilterNotice2: 'Rādītās tēmas tikai 2. klasei',
    gradeFilterNotice3: 'Rādītās tēmas tikai 3. klasei',
    gradeFilterNoticeAll: 'Rādītās tēmas visām klasēm (1., 2. un 3.)',
    // Avatar Shop
    avatarShopTitle: 'Avataru veikals',
    avatarShopSubtitle: 'Izvēlies un pērc jaunus varoņus par zvaigznītēm!',
    myStarBalance: 'Tavs atlikums',
    totalEarnedStarsLabel: 'Kopā nopelnītas zvaigznes',
    buyFor: 'Pirkt par',
    equipped: 'Izvēlēts',
    equip: 'Izvēlēties',
    freeStarter: 'Bezmaksas',
    notEnoughStars: 'Trūkst zvaigžņu',
    categoryAll: 'Visi',
    categoryStarter: 'Sākuma',
    categorySimple: 'Vienkāršie (10 ⭐)',
    categoryMedium: 'Vidējie (50 ⭐)',
    categoryUnique: 'Unikālie (100 ⭐)',
    tierBadgeSimple: 'Vienkāršs',
    tierBadgeMedium: 'Vidējs',
    tierBadgeUnique: '✨ Unikāls',
    starsAddedToBank: 'avataru krājkasītē!',
    shopNotice: 'Spēlē spēles un mācies vārdus, lai pelnītu zvaigznītes un atbloķētu jaunus varoņus!',
    congratsAvatarPurchased: 'Urā! Jauns avatars atbloķēts!',
  },
};

export function getGradeFilterInfo(
  grades: Grade[],
  language: Language
): { notice: string; badge: string; subtitle: string } {
  const sorted = Array.from(new Set(grades)).sort((a, b) => a - b);
  const key = sorted.join(',');

  if (language === 'ru') {
    switch (key) {
      case '1,2':
        return {
          notice: '1 и 2 классы (без 3)',
          badge: '1 и 2 кл.',
          subtitle: 'Показаны слова для 1 и 2 классов, без 3 класса',
        };
      case '2,3':
        return {
          notice: '2 и 3 классы (без 1)',
          badge: '2 и 3 кл.',
          subtitle: 'Показаны слова для 2 и 3 классов, без 1 класса',
        };
      case '1,3':
        return {
          notice: '1 и 3 классы (без 2)',
          badge: '1 и 3 кл.',
          subtitle: 'Показаны слова для 1 и 3 классов, без 2 класса',
        };
      case '1':
        return {
          notice: 'Только 1 класс',
          badge: '1 класс',
          subtitle: 'Показаны темы только для 1 класса',
        };
      case '2':
        return {
          notice: 'Только 2 класс',
          badge: '2 класс',
          subtitle: 'Показаны темы только для 2 класса',
        };
      case '3':
        return {
          notice: 'Только 3 класс',
          badge: '3 класс',
          subtitle: 'Показаны темы только для 3 класса',
        };
      default:
        return {
          notice: 'Все классы (1, 2 и 3)',
          badge: 'Все классы',
          subtitle: 'Показаны слова всех классов (1, 2 и 3)',
        };
    }
  } else {
    // Latvian
    switch (key) {
      case '1,2':
        return {
          notice: '1. un 2. klase (bez 3.)',
          badge: '1. un 2. kl.',
          subtitle: 'Rādīti 1. un 2. klases vārdi, bez 3. klases',
        };
      case '2,3':
        return {
          notice: '2. un 3. klase (bez 1.)',
          badge: '2. un 3. kl.',
          subtitle: 'Rādīti 2. un 3. klases vārdi, bez 1. klases',
        };
      case '1,3':
        return {
          notice: '1. un 3. klase (bez 2.)',
          badge: '1. un 3. kl.',
          subtitle: 'Rādīti 1. un 3. klases vārdi, bez 2. klases',
        };
      case '1':
        return {
          notice: 'Tikai 1. klase',
          badge: '1. klase',
          subtitle: 'Rādītās tēmas tikai 1. klasei',
        };
      case '2':
        return {
          notice: 'Tikai 2. klase',
          badge: '2. klase',
          subtitle: 'Rādītās tēmas tikai 2. klasei',
        };
      case '3':
        return {
          notice: 'Tikai 3. klase',
          badge: '3. klase',
          subtitle: 'Rādītās tēmas tikai 3. klasei',
        };
      default:
        return {
          notice: 'Visas klases (1., 2. un 3.)',
          badge: 'Visas klases',
          subtitle: 'Rādīti visu klašu vārdi (1., 2. un 3.)',
        };
    }
  }
}
