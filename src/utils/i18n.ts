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
  mainTopicsTitle: string;
  mainTopicsSubtitle: string;
  extraTopicsTitle: string;
  extraTopicsSubtitle: string;
  newWordsBadge: string;
  courseSelectorLabel: string;
  courseModeTitle: string;
  courseSwitchHint: string;
  courseEnglish: string;
  courseLatvian: string;
  courseLatvianSubtitle: string;
  interfaceLanguageLabel: string;
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
  selectWord: string;
  allWords: string;
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
  flashcardsComplete: string;
  flashcardsFinishedHeadline: string;
  flashcardsNoRewardHint: string;
  cardsViewed: string;
  progressStatsTitle: string;
  statsModal: {
    title: string;
    subtitle: string;
    tabOverview: string;
    tabTopics: string;
    tabPractice: string;
    tabAwards: string;
    tabExams: string;
    overallProgress: string;
    wordsLearned: string;
    starsEarned: string;
    topicsCompleted: string;
    dayStreak: string;
    streakDays: string;
    gradeBreakdownTitle: string;
    accuracyTitle: string;
    totalAnswers: string;
    correctAnswers: string;
    wrongAnswers: string;
    accuracyRate: string;
    wordsToPracticeTitle: string;
    wordsToPracticeSubtitle: string;
    noWordsToPractice: string;
    topicsTitle: string;
    filterAll: string;
    filterCompleted: string;
    filterInProgress: string;
    filterNotStarted: string;
    achievementsTitle: string;
    achievementsSubtitle: string;
    viewDetails: string;
    close: string;
    timesWrongLabel: string;
    timesCorrectLabel: string;
    examsCompletedTitle: string;
    examsAverageScore: string;
    examsCupsTitle: string;
    examsBestByGrade: string;
    examsHistoryTitle: string;
    examsHistoryEmpty: string;
    examsHistoryEmptyHint: string;
    examsDate: string;
    examsMark: string;
    examsScore: string;
    examsStartForGrade: string;
    examsNotTakenYet: string;
    examsStatsBtn: string;
    examsViewHistory: string;
    examsOverviewSummary: string;
    achievements: {
      firstWord: { title: string; desc: string };
      tenWords: { title: string; desc: string };
      starCollector: { title: string; desc: string };
      fiftyWords: { title: string; desc: string };
      topicMaster: { title: string; desc: string };
      streakMaster: { title: string; desc: string };
    };
  };
  exam: {
    cardTitle: string;
    cardSubtitle: string;
    readyBadge: string;
    bestScoreLabel: string;
    startBtn: string;
    retryBtn: string;
    questionCounter: string;
    promptAudio: string;
    promptChoice: string;
    promptTrueFalse: string;
    promptBuilder: string;
    gradeMark5: string;
    gradeMark4: string;
    gradeMark3: string;
    gradeMarkRetry: string;
    goldCup: string;
    silverCup: string;
    bronzeCup: string;
    passedHeadline: string;
    needPracticeHeadline: string;
    starsAddedToBank: string;
    againBtn: string;
    backToCatalog: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    appTitle: 'WordyMind',
    appSubtitle: 'Английский для 1–3 классов',
    welcomeGreeting: 'Привет',
    defaultPlayerName: 'Знайка',
    chooseTopic: 'Выбери тему для игры',
    searchPlaceholder: 'Поиск темы...',
    allTopics: 'Все темы',
    noResultsFound: 'Ничего не нашлось',
    wordsCount: 'слов',
    learnedCount: 'выучено',
    mainTopicsTitle: 'Основные темы',
    mainTopicsSubtitle: '9 тем школьной программы',
    extraTopicsTitle: 'Дополнительные темы',
    extraTopicsSubtitle: '15 тем для расширения словарного запаса',
    newWordsBadge: 'Новые слова',
    courseSelectorLabel: 'Режим обучения',
    courseModeTitle: 'Режим обучения',
    courseSwitchHint: 'Сменить режим',
    courseEnglish: 'Изучение Английского',
    courseLatvian: 'Изучение Латышского',
    courseLatvianSubtitle: 'Латышский язык с переводом на русский',
    interfaceLanguageLabel: 'Язык меню',
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
    selectWord: 'Выбрать слово',
    allWords: 'Все слова',
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
    flashcardsComplete: 'Карточки пройдены!',
    flashcardsFinishedHeadline: 'Отличная тренировка!',
    flashcardsNoRewardHint: 'В режиме карточек звёзды не начисляются. Играй в игры, чтобы заработать звёзды!',
    cardsViewed: 'Карточек повторено',
    progressStatsTitle: 'Статистика прогресса',
    statsModal: {
      title: 'Статистика обучения',
      subtitle: 'Твои успехи и достижения в изучении английского языка!',
      tabOverview: 'Обзор',
      tabTopics: 'Темы',
      tabPractice: 'Повторение',
      tabAwards: 'Награды',
      tabExams: 'Контрольные',
      overallProgress: 'Общий прогресс',
      wordsLearned: 'Выучено слов',
      starsEarned: 'Всего звёзд',
      topicsCompleted: 'Освоено тем',
      dayStreak: 'Серия занятий',
      streakDays: 'дн. подряд',
      gradeBreakdownTitle: 'Прогресс по классам',
      accuracyTitle: 'Точность ответов',
      totalAnswers: 'Всего ответов',
      correctAnswers: 'Верно',
      wrongAnswers: 'Ошибок',
      accuracyRate: 'Точность',
      wordsToPracticeTitle: 'Слова для повторения',
      wordsToPracticeSubtitle: 'Слова, в которых случались ошибки — нажми и повтори их произношение!',
      noWordsToPractice: 'Отлично! Слов для повторения нет — все ответы уверенные и точные!',
      topicsTitle: 'Прогресс по темам',
      filterAll: 'Все темы',
      filterCompleted: 'Освоены (3 ⭐)',
      filterInProgress: 'В процессе',
      filterNotStarted: 'Не начаты',
      achievementsTitle: 'Достижения и награды',
      achievementsSubtitle: 'Выполняй задания и открывай кубки за старание!',
      viewDetails: 'Подробнее',
      close: 'Закрыть',
      timesWrongLabel: 'ошибок',
      timesCorrectLabel: 'верно',
      examsCompletedTitle: 'Пройдено контрольных',
      examsAverageScore: 'Средний результат',
      examsCupsTitle: 'Коллекция кубков',
      examsBestByGrade: 'Лучшие результаты по классам',
      examsHistoryTitle: 'История сдачи контрольных',
      examsHistoryEmpty: 'Контрольные работы ещё не сдавались',
      examsHistoryEmptyHint: 'Выбери класс выше и пройди свою первую контрольную работу!',
      examsDate: 'Дата',
      examsMark: 'Оценка',
      examsScore: 'Результат',
      examsStartForGrade: 'Сдать контрольную',
      examsNotTakenYet: 'Ещё не сдавалась',
      examsStatsBtn: 'Статистика',
      examsViewHistory: 'Смотреть статистику контрольных',
      examsOverviewSummary: 'Контрольные работы',
      achievements: {
        firstWord: { title: 'Первый шаг!', desc: 'Выучено первое английское слово' },
        tenWords: { title: 'Знаток десятки', desc: 'Успешно выучено 10 слов' },
        starCollector: { title: 'Звёздный герой', desc: 'Заработано 25 звёздочек' },
        fiftyWords: { title: 'Книгочей', desc: 'Выучено 50 английских слов' },
        topicMaster: { title: 'Отличник темы', desc: 'Любая тема завершена на 3 звезды' },
        streakMaster: { title: 'Супер-ученик', desc: 'Серия занятий не менее 3 дней подряд' },
      },
    },
    exam: {
      cardTitle: 'Контрольная работа',
      cardSubtitle: 'Проверка знаний по всем основным темам',
      readyBadge: 'Проверь свои знания! 🎓',
      bestScoreLabel: 'Лучший результат',
      startBtn: 'Начать контрольную',
      retryBtn: 'Улучшить оценку',
      questionCounter: 'Вопрос',
      promptAudio: 'Послушай внимательно и выбери перевод',
      promptChoice: 'Как переводится это слово?',
      promptTrueFalse: 'Верно ли указан перевод?',
      promptBuilder: 'Собери слово из букв',
      gradeMark5: 'Отлично! 5+',
      gradeMark4: 'Хорошо! 4',
      gradeMark3: 'Зачёт! 3',
      gradeMarkRetry: 'Попробуй ещё раз!',
      goldCup: 'Золотой кубок 🏆',
      silverCup: 'Серебряный кубок 🥈',
      bronzeCup: 'Бронзовый кубок 🥉',
      passedHeadline: 'Ура! Контрольная сдана!',
      needPracticeHeadline: 'Нужно ещё немного потренироваться',
      starsAddedToBank: 'добавлено в копилку!',
      againBtn: 'Пройти снова',
      backToCatalog: 'К темам',
    },
  },
  lv: {
    appTitle: 'WordyMind',
    appSubtitle: 'Angļu valoda 1.–3. klasei',
    welcomeGreeting: 'Sveiks',
    defaultPlayerName: 'Zinītis',
    chooseTopic: 'Izvēlies tēmu spēlei',
    searchPlaceholder: 'Meklēt tēmu...',
    allTopics: 'Visas tēmas',
    noResultsFound: 'Nekas netika atrasts',
    wordsCount: 'vārdi',
    learnedCount: 'apgūti',
    mainTopicsTitle: 'Pamatkursa tēmas',
    mainTopicsSubtitle: '9 skolas programmas tēmas',
    extraTopicsTitle: 'Papildus tēmas',
    extraTopicsSubtitle: '15 tēmas vārdu krājuma paplašināšanai',
    newWordsBadge: 'Jauni vārdi',
    courseSelectorLabel: 'Mācību režīms',
    courseModeTitle: 'Mācību režīms',
    courseSwitchHint: 'Mainīt režīmu',
    courseEnglish: 'Mācīties angļu',
    courseLatvian: 'Mācīties latviešu',
    courseLatvianSubtitle: 'Latviešu valoda ar tulkojumu krieviski',
    interfaceLanguageLabel: 'Izvēlnes valoda',
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
    selectWord: 'Izvēlēties vārdu',
    allWords: 'Visi vārdi',
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
    flashcardsComplete: 'Kartītes pabeigtas!',
    flashcardsFinishedHeadline: 'Lielisks treniņš!',
    flashcardsNoRewardHint: 'Kartīšu režīmā zvaigznes netiek piešķirtas. Spēlē spēles, lai nopelnītu zvaigznes!',
    cardsViewed: 'Atkārtotās kartītes',
    progressStatsTitle: 'Progresa statistika',
    statsModal: {
      title: 'Mācību statistika',
      subtitle: 'Tavi panākumi un sasniegumi angļu valodas apguvē!',
      tabOverview: 'Pārskats',
      tabTopics: 'Tēmas',
      tabPractice: 'Atkārtošana',
      tabAwards: 'Balvas',
      tabExams: 'Pārbaudes darbi',
      overallProgress: 'Kopējais progress',
      wordsLearned: 'Apgūtie vārdi',
      starsEarned: 'Kopā zvaigznes',
      topicsCompleted: 'Pabeigtās tēmas',
      dayStreak: 'Dienu sērija',
      streakDays: 'd. pēc kārtas',
      gradeBreakdownTitle: 'Progress pa klasēm',
      accuracyTitle: 'Atbilžu precizitāte',
      totalAnswers: 'Kopā atbildes',
      correctAnswers: 'Pareizi',
      wrongAnswers: 'Kļūdas',
      accuracyRate: 'Precizitāte',
      wordsToPracticeTitle: 'Vārdi atkārtošanai',
      wordsToPracticeSubtitle: 'Vārdi, kuros bija kļūdas — nospied un noklausies to izrunu!',
      noWordsToPractice: 'Lieliski! Nav vārdu atkārtošanai — visas atbildes ir pārliecinošas!',
      topicsTitle: 'Progress pa tēmām',
      filterAll: 'Visas tēmas',
      filterCompleted: 'Apgūts (3 ⭐)',
      filterInProgress: 'Procesā',
      filterNotStarted: 'Nav sāktas',
      achievementsTitle: 'Sasniegumi un balvas',
      achievementsSubtitle: 'Pildi uzdevumus un atver jaunus kausus!',
      viewDetails: 'Sīkāk',
      close: 'Aizvērt',
      timesWrongLabel: 'kļūdas',
      timesCorrectLabel: 'pareizi',
      examsCompletedTitle: 'Nokārtoti pārbaudes darbi',
      examsAverageScore: 'Vidējais rezultāts',
      examsCupsTitle: 'Kausu kolekcija',
      examsBestByGrade: 'Labākie rezultāti pa klasēm',
      examsHistoryTitle: 'Pārbaudes darbu vēsture',
      examsHistoryEmpty: 'Pārbaudes darbi vēl nav kārtoti',
      examsHistoryEmptyHint: 'Izvēlies klasi augstāk un nokārto savu pirmo pārbaudes darbu!',
      examsDate: 'Datums',
      examsMark: 'Atzīme',
      examsScore: 'Rezultāts',
      examsStartForGrade: 'Kārtot pārbaudes darbu',
      examsNotTakenYet: 'Vēl nav kārtots',
      examsStatsBtn: 'Statistika',
      examsViewHistory: 'Skatīt pārbaudes darbu statistiku',
      examsOverviewSummary: 'Pārbaudes darbi',
      achievements: {
        firstWord: { title: 'Pirmais solis!', desc: 'Apgūts pirmais angļu vārds' },
        tenWords: { title: 'Desmitnieks', desc: 'Veiksmīgi apgūti 10 vārdi' },
        starCollector: { title: 'Zvaigžņu varonis', desc: 'Sakrātas 25 zvaigznītes' },
        fiftyWords: { title: 'Grāmatu tārps', desc: 'Apgūti 50 angļu vārdi' },
        topicMaster: { title: 'Tēmas teicamnieks', desc: 'Jebkura tēma pabeigta ar 3 zvaigznēm' },
        streakMaster: { title: 'Super-skolēns', desc: 'Mācību sērija vismaz 3 dienas pēc kārtas' },
      },
    },
    exam: {
      cardTitle: 'Pārbaudes darbs',
      cardSubtitle: 'Zināšanu pārbaude visās pamatkursa tēmās',
      readyBadge: 'Pārbaudi savas zināšanas! 🎓',
      bestScoreLabel: 'Labākais rezultāts',
      startBtn: 'Sākt pārbaudes darbu',
      retryBtn: 'Uzlabot atzīmi',
      questionCounter: 'Jautājums',
      promptAudio: 'Klausies uzmanīgi un izvēlies tulkojumu',
      promptChoice: 'Kā tulko šo vārdu?',
      promptTrueFalse: 'Vai tulkojums ir pareizs?',
      promptBuilder: 'Saliec vārdu no burtiem',
      gradeMark5: 'Teicami! 5+',
      gradeMark4: 'Labi! 4',
      gradeMark3: 'Ieskaitīts! 3',
      gradeMarkRetry: 'Mēģini vēlreiz!',
      goldCup: 'Zelta kauss 🏆',
      silverCup: 'Sudraba kauss 🥈',
      bronzeCup: 'Bronzas kauss 🥉',
      passedHeadline: 'Urrā! Pārbaudes darbs nokārtots!',
      needPracticeHeadline: 'Vēl nedaudz jāpatrenējas',
      starsAddedToBank: 'pievienotas krājkasītei!',
      againBtn: 'Pildīt vēlreiz',
      backToCatalog: 'Uz tēmām',
    },
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

/**
 * Возвращает грамматически корректную форму слова "слово" в зависимости от количества:
 * - 1 слово, 21 слово, 31 слово, 101 слово...
 * - 2 слова, 3 слова, 4 слова, 22 слова, 23 слова, 24 слова...
 * - 0 слов, 5 слов, 6 слов, 11 слов, 12 слов, 14 слов, 20 слов, 25 слов...
 * 
 * В латышском:
 * - 1 vārds (21 vārds, 31 vārds...)
 * - 2, 3, 4 ... vārdi
 */
export function getWordsPlural(count: number, language: Language = 'lv'): string {
  if (language === 'ru') {
    const abs = Math.abs(count);
    const mod10 = abs % 10;
    const mod100 = abs % 100;

    if (mod10 === 1 && mod100 !== 11) {
      return 'слово';
    }
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return 'слова';
    }
    return 'слов';
  }

  // Latvian (lv)
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return 'vārds';
  }
  return 'vārdi';
}

export function formatWordsCount(count: number, language: Language = 'lv'): string {
  return `${count} ${getWordsPlural(count, language)}`;
}

/**
 * Возвращает имя игрока с учетом текущего языка интерфейса.
 * Если имя игрока не задано или установлено значение по умолчанию ("Знайка" / "Zinītis"),
 * возвращается корректно локализованное имя ("Знайка" для RU, "Zinītis" для LV).
 */
export function getPlayerDisplayName(
  playerName: string | undefined | null,
  language: Language = 'lv'
): string {
  const t = translations[language];
  if (!playerName || playerName === 'Знайка' || playerName === 'Zinītis') {
    return t.defaultPlayerName;
  }
  return playerName;
}

export const EXTRA_TOPICS: string[] = [
  'days_of_the_week',
  'shapes',
  'actions',
  'classroom_objects_plus',
  'farm_animals_plus',
  'food_and_drink_plus',
  'fruit_and_vegetables_plus',
  'family_plus',
  'art_and_games_plus',
  'toys_plus',
  'adjectives_plus',
  'wild_animals',
  'nature',
  'garden',
  'building_materials',
  'christmas_and_holidays',
  'circus',
  'positions_plus',
  'at_home_plus',
  'town_plus',
  'friendship',
  'craft_and_projects',
  'routine_and_time',
  'introductions',
  'questions',
  'instructions',
  'places',
  'helper_words',
  'pronouns',
  'other_words',
];

export const GRADE_1_EXTRA_TOPICS: string[] = [
  'days_of_the_week',
  'shapes',
  'actions',
  'classroom_objects_plus',
  'farm_animals_plus',
  'family_plus',
  'food_and_drink_plus',
  'art_and_games_plus',
  'toys_plus',
  'adjectives_plus',
  'wild_animals',
  'feelings',
  'nature',
  'introductions',
  'questions',
  'instructions',
  'places',
  'helper_words',
  'pronouns',
  'other_words',
];

export const GRADE_1_MAIN_TOPICS: string[] = [
  'numbers_1_20',
  'colours',
  'classroom_objects',
  'family',
  'adjectives',
  'toys',
  'activities',
  'pets',
  'farm_animals',
];

export const GRADE_2_MAIN_TOPICS: string[] = [
  'food_and_drink',
  'fruit_and_vegetables',
  'body',
  'face',
  'abilities',
  'clothes',
  'hair',
  'at_home',
  'rooms',
];

export const GRADE_3_MAIN_TOPICS: string[] = [
  'months',
  'seasons',
  'birthday',
  'feelings',
  'jobs',
  'transport',
  'senses',
  'town',
  'positions',
  'directions',
];

export const GRADE_1_TOPIC_ORDER: string[] = [
  ...GRADE_1_MAIN_TOPICS,
  'days_of_the_week',
  'shapes',
  'actions',
  'classroom_objects_plus',
  'farm_animals_plus',
  'family_plus',
  'food_and_drink_plus',
  'art_and_games_plus',
  'toys_plus',
  'adjectives_plus',
  'wild_animals',
  'feelings',
  'nature',
  'introductions',
  'questions',
  'instructions',
  'places',
  'helper_words',
  'pronouns',
  'other_words',
];

export const GRADE_2_TOPIC_ORDER: string[] = [
  ...GRADE_2_MAIN_TOPICS,
  'christmas_and_holidays',
  'circus',
  'positions_plus',
  'at_home_plus',
  'town_plus',
  'friendship',
  'craft_and_projects',
  'routine_and_time',
  'food_and_drink_plus',
  'fruit_and_vegetables_plus',
  'family_plus',
  'garden',
  'building_materials',
  'wild_animals',
  'nature',
  'adjectives_plus',
  'farm_animals_plus',
  'art_and_games_plus',
  'toys_plus',
  'actions',
  'days_of_the_week',
  'shapes',
  'classroom_objects_plus',
  'introductions',
  'questions',
  'instructions',
  'places',
  'helper_words',
  'pronouns',
  'other_words',
];

export const GRADE_3_TOPIC_ORDER: string[] = [
  ...GRADE_3_MAIN_TOPICS,
  ...EXTRA_TOPICS,
];

/**
 * Checks if a topic should be categorized as Extra (Дополнительно)
 * taking into account active grade selection.
 * Specifically: 'feelings' is an extra topic for Grade 1,
 * but when Grade 3 is selected, it moves to Main topics and is removed from Extra!
 */
export function isTopicExtra(topicId: string, selectedGrades: Grade[]): boolean {
  if (topicId === 'feelings') {
    return !selectedGrades.includes(3);
  }
  return EXTRA_TOPICS.includes(topicId);
}

/**
 * Checks if an extra topic contains new words for the given selected grades.
 * - Grade 1: no topics are highlighted (baseline grade).
 * - Grade 2 (and Grade 3 not selected): topics containing Grade 2 words (w.grade === 2) are highlighted.
 * - Grade 3: words from Grade 2 are NOT new ("в 3ем классе слова из 2го не считаются новыми"),
 *   only topics containing Grade 3 words (w.grade === 3) are highlighted.
 */
export function hasNewWordsForGrades(topic: { words: { grade?: number }[] }, selectedGrades: Grade[]): boolean {
  if (selectedGrades.includes(3)) {
    return topic.words.some((w) => (w.grade || 1) === 3);
  }
  if (selectedGrades.includes(2)) {
    return topic.words.some((w) => (w.grade || 1) === 2);
  }
  return false;
}

/**
 * Words that are taught as Main topics in Grade 3 (town, jobs, birthday),
 * but also appear in lower-grade extra topics (places, classroom_objects_plus, food_and_drink_plus).
 * When Grade 3 is selected, these duplicate words are removed from extra topics.
 */
export const GRADE_3_EXTRA_DUPLICATES = new Set([
  'park',
  'school',
  'teacher',
  'chocolate',
]);

export function getTopicsPlural(count: number, language: Language = 'lv'): string {
  if (language === 'ru') {
    const abs = Math.abs(count);
    const mod10 = abs % 10;
    const mod100 = abs % 100;

    if (mod10 === 1 && mod100 !== 11) {
      return 'тема';
    }
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return 'темы';
    }
    return 'тем';
  }

  // Latvian (lv)
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return 'tēma';
  }
  return 'tēmas';
}

export function getMainTopicsSubtitle(count: number, language: Language = 'lv'): string {
  if (language === 'ru') {
    return `${count} ${getTopicsPlural(count, 'ru')} школьной программы`;
  }
  return `${count} skolas programmas ${getTopicsPlural(count, 'lv')}`;
}

export function getExtraTopicsSubtitle(count: number, language: Language = 'lv'): string {
  if (language === 'ru') {
    return `${count} ${getTopicsPlural(count, 'ru')} для расширения словарного запаса`;
  }
  return `${count} ${getTopicsPlural(count, 'lv')} vārdu krājuma paplašināšanai`;
}

/**
 * Returns ~65% of words from the main curriculum topics for the given grade:
 * - Grade 1: 97 words in main topics -> ~65% is 63 words
 * - Grade 2: 64 words in main topics -> ~65% is 42 words
 * - Grade 3: 76 words in main topics -> ~65% is 49 words
 */
export function getExamWordsCountForGrade(grade: Grade): number {
  switch (grade) {
    case 1:
      return 63;
    case 2:
      return 42;
    case 3:
      return 49;
    default:
      return 42;
  }
}

