import { Language } from '../types';

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
  matchPrompt: string;
  audioPrompt: string;
  score: string;
  starsEarned: string;
  roundComplete: string;
  soundOn: string;
  soundOff: string;
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
}

export const translations: Record<Language, Translations> = {
  ru: {
    appTitle: 'WordyKids',
    appSubtitle: 'Английский для 1–2 класса',
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
    matchPrompt: 'Найди пары: английское слово и перевод',
    audioPrompt: 'Слушай внимательно и выбери правильный ответ',
    score: 'Счёт',
    starsEarned: 'Получено звёзд',
    roundComplete: 'Тема пройдена!',
    soundOn: 'Звук включен',
    soundOff: 'Звук выключен',
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
  },
  lv: {
    appTitle: 'WordyKids',
    appSubtitle: 'Angļu valoda 1.–2. klasei',
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
    matchPrompt: 'Atrodi pārus: angļu vārds un tulkojums',
    audioPrompt: 'Klausies uzmanīgi un izvēlies pareizo atbildi',
    score: 'Rezultāts',
    starsEarned: 'Nopelnītās zvaigznītes',
    roundComplete: 'Tēma pabeigta!',
    soundOn: 'Skaņa ieslēgta',
    soundOff: 'Skaņa izslēgta',
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
  },
};
