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
  backToTopicGames: string;
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
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    passwordMismatchError: string;
    showPassword: string;
    hidePassword: string;
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
  grade4: string;
  gradeAll: string;
  grade1Short: string;
  grade2Short: string;
  grade3Short: string;
  grade4Short: string;
  gradeAllShort: string;
  gradeTitle1: string;
  gradeTitle2: string;
  gradeTitle3: string;
  gradeTitle4: string;
  gradeTitleAll: string;
  gradeFilterNotice1: string;
  gradeFilterNotice2: string;
  gradeFilterNotice3: string;
  gradeFilterNotice4: string;
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
  categoryLegendary: string;
  categoryMythic: string;
  tierBadgeSimple: string;
  tierBadgeMedium: string;
  tierBadgeUnique: string;
  tierBadgeLegendary: string;
  tierBadgeMythic: string;
  titlesModalTitle: string;
  titlesModalSubtitle: string;
  equippedTitleBadge: string;
  equipTitleAction: string;
  lockedTitleBadge: string;
  titleCategoryAll: string;
  titleCategoryAcademic: string;
  titleCategoryWords: string;
  titleCategoryTopics: string;
  titleCategoryActivity: string;
  activeDaysLabel: string;
  activeDaysSubtitle: string;
  titleUnlockedToast: string;
  topicMasteryBonusToast: string;
  wordMilestoneToast: string;
  starsAddedToBank: string;
  shopNotice: string;
  congratsAvatarPurchased: string;
  equipNow: string;
  continueShopping: string;
  shopTabAvatars: string;
  shopTabAnimations: string;
  shopTabMusic: string;
  previewEffect: string;
  stopPreview: string;
  equippedBadge: string;
  victoryMusicTitle: string;
  victoryAnimationTitle: string;
  flashcardsComplete: string;
  flashcardsFinishedHeadline: string;
  flashcardsNoRewardHint: string;
  miniTopicComplete: string;
  miniTopicNoRewardHint: string;
  firstClearRewardBadge: string;
  repeatClearRewardBadge: string;
  accuracyThresholdHint: string;
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
    appSubtitle: 'Английский для 1–4 классов',
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
    backToTopicGames: 'К играм темы',
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
      confirmPasswordLabel: 'Повторите пароль:',
      confirmPasswordPlaceholder: 'Введите пароль ещё раз',
      passwordMismatchError: 'Пароли не совпадают. Проверьте ввод',
      showPassword: 'Показать пароль',
      hidePassword: 'Скрыть пароль',
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
    grade4: '4 класс',
    gradeAll: 'Все классы',
    grade1Short: '1 кл.',
    grade2Short: '2 кл.',
    grade3Short: '3 кл.',
    grade4Short: '4 кл.',
    gradeAllShort: 'Все',
    gradeTitle1: 'Только 1 класс',
    gradeTitle2: 'Только 2 класс',
    gradeTitle3: 'Только 3 класс',
    gradeTitle4: 'Только 4 класс',
    gradeTitleAll: 'Все классы (1, 2, 3 и 4)',
    gradeFilterNotice1: 'Показаны темы только для 1 класса',
    gradeFilterNotice2: 'Показаны темы только для 2 класса',
    gradeFilterNotice3: 'Показаны темы только для 3 класса',
    gradeFilterNotice4: 'Показаны темы только для 4 класса',
    gradeFilterNoticeAll: 'Показаны темы для всех классов (1, 2, 3 и 4)',
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
    categoryLegendary: 'Легендарные (150–200 ⭐)',
    categoryMythic: 'Мифические (1000+ ⭐)',
    tierBadgeSimple: 'Простой',
    tierBadgeMedium: 'Средний',
    tierBadgeUnique: '✨ Уникальный',
    tierBadgeLegendary: '👑 Легендарный',
    tierBadgeMythic: '🌌 Мифический',
    titlesModalTitle: 'Мои титулы и звания',
    titlesModalSubtitle: 'Заслуженные почётные звания за успехи и упорство',
    equippedTitleBadge: 'Надет',
    equipTitleAction: 'Надеть',
    lockedTitleBadge: 'Закрыт',
    titleCategoryAll: 'Все',
    titleCategoryAcademic: '🎓 Экзамены',
    titleCategoryWords: '📖 Словарный запас',
    titleCategoryTopics: '🐾 Темы',
    titleCategoryActivity: '🚀 Усердие',
    activeDaysLabel: 'Календарь усердия',
    activeDaysSubtitle: 'Дней занятий (не сгорают)',
    titleUnlockedToast: 'Получен новый титул!',
    topicMasteryBonusToast: 'Бонус за 100% темы!',
    wordMilestoneToast: 'Словарная веха достигнута!',
    starsAddedToBank: 'в копилку аватаров!',
    shopNotice: 'Играй в игры и учи слова, чтобы пополнять копилку звёздочек и открывать новых героев!',
    congratsAvatarPurchased: 'Ура! Новый аватар разблокирован!',
    equipNow: 'Надеть сейчас!',
    continueShopping: 'Отлично',
    shopTabAvatars: 'Герои',
    shopTabAnimations: 'Анимации победы',
    shopTabMusic: 'Музыка победы',
    previewEffect: 'Попробовать',
    stopPreview: 'Стоп',
    equippedBadge: 'Выбрано',
    victoryMusicTitle: 'Музыка победы',
    victoryAnimationTitle: 'Анимация победы',
    flashcardsComplete: 'Карточки пройдены!',
    flashcardsFinishedHeadline: 'Отличная тренировка!',
    flashcardsNoRewardHint: 'В режиме карточек звёзды не начисляются. Играй в игры, чтобы заработать звёзды!',
    miniTopicComplete: 'Тренировка завершена!',
    miniTopicNoRewardHint: 'В теме меньше 5 слов — это режим тренировки. Звёзды в копилку даются в темах от 5 слов!',
    firstClearRewardBadge: 'Первая победа в игре!',
    repeatClearRewardBadge: 'Повторное прохождение (+1 ⭐)',
    accuracyThresholdHint: 'Нужно набрать от 70% верных ответов, чтобы получить звёзды. Попробуй ещё раз!',
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
    appSubtitle: 'Angļu valoda 1.–4. klasei',
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
    backToTopicGames: 'Uz tēmas spēlēm',
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
      confirmPasswordLabel: 'Apstipriniet paroli:',
      confirmPasswordPlaceholder: 'Ievadiet paroli vēlreiz',
      passwordMismatchError: 'Paroles nesakrīt. Lūdzu, pārbaudiet',
      showPassword: 'Rādīt paroli',
      hidePassword: 'Paslēpt paroli',
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
    grade4: '4. klase',
    gradeAll: 'Visas klases',
    grade1Short: '1. kl.',
    grade2Short: '2. kl.',
    grade3Short: '3. kl.',
    grade4Short: '4. kl.',
    gradeAllShort: 'Visi',
    gradeTitle1: 'Tikai 1. klase',
    gradeTitle2: 'Tikai 2. klase',
    gradeTitle3: 'Tikai 3. klase',
    gradeTitle4: 'Tikai 4. klase',
    gradeTitleAll: 'Visas klases (1., 2., 3. un 4.)',
    gradeFilterNotice1: 'Rādītās tēmas tikai 1. klasei',
    gradeFilterNotice2: 'Rādītās tēmas tikai 2. klasei',
    gradeFilterNotice3: 'Rādītās tēmas tikai 3. klasei',
    gradeFilterNotice4: 'Rādītās tēmas tikai 4. klasei',
    gradeFilterNoticeAll: 'Rādītās tēmas visām klasēm (1., 2., 3. un 4.)',
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
    categoryLegendary: 'Leģendārie (150–200 ⭐)',
    categoryMythic: 'Mītiskie (1000+ ⭐)',
    tierBadgeSimple: 'Vienkāršs',
    tierBadgeMedium: 'Vidējs',
    tierBadgeUnique: '✨ Unikāls',
    tierBadgeLegendary: '👑 Leģendārs',
    tierBadgeMythic: '🌌 Mītisks',
    titlesModalTitle: 'Mani tituli un pakāpes',
    titlesModalSubtitle: 'Nopelnītie goda tituli par panākumiem un centību',
    equippedTitleBadge: 'Uzvilkts',
    equipTitleAction: 'Uzvilkt',
    lockedTitleBadge: 'Slēgts',
    titleCategoryAll: 'Visi',
    titleCategoryAcademic: '🎓 Eksāmeni',
    titleCategoryWords: '📖 Vārdu krājums',
    titleCategoryTopics: '🐾 Tēmas',
    titleCategoryActivity: '🚀 Centība',
    activeDaysLabel: 'Centības kalendārs',
    activeDaysSubtitle: 'Mācību dienas (nekad nepazūd)',
    titleUnlockedToast: 'Iegūts jauns tituls!',
    topicMasteryBonusToast: 'Bonuss par 100% tēmu!',
    wordMilestoneToast: 'Vārdu krājuma robežstabs sasniegts!',
    starsAddedToBank: 'avataru krājkasītē!',
    shopNotice: 'Spēlē spēles un mācies vārdus, lai pelnītu zvaigznītes un atbloķētu jaunus varoņus!',
    congratsAvatarPurchased: 'Urā! Jauns avatars atbloķēts!',
    equipNow: 'Uzvilkt tagad!',
    continueShopping: 'Labi',
    shopTabAvatars: 'Varoņi',
    shopTabAnimations: 'Uzvaras animācijas',
    shopTabMusic: 'Uzvaras mūzika',
    previewEffect: 'Izmēģināt',
    stopPreview: 'Apturēt',
    equippedBadge: 'Izvēlēts',
    victoryMusicTitle: 'Uzvaras mūzika',
    victoryAnimationTitle: 'Uzvaras animācija',
    flashcardsComplete: 'Kartītes pabeigtas!',
    flashcardsFinishedHeadline: 'Lielisks treniņš!',
    flashcardsNoRewardHint: 'Kartīšu režīmā zvaigznes netiek piešķirtas. Spēlē spēles, lai nopelnītu zvaigznes!',
    miniTopicComplete: 'Treniņš pabeigts!',
    miniTopicNoRewardHint: 'Tēmā ir mazāk par 5 vārdiem — treniņa režīms. Zvaigznes tiek piešķirtas tēmās ar vismaz 5 vārdiem!',
    firstClearRewardBadge: 'Pirmā uzvara spēlē!',
    repeatClearRewardBadge: 'Spēles atkārtojums (+1 ⭐)',
    accuracyThresholdHint: 'Lai iegūtu zvaigznes, nepieciešams vismaz 70% pareizu atbilžu. Pamēģini vēlreiz!',
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
      case '4':
        return {
          notice: 'Только 4 класс',
          badge: '4 класс',
          subtitle: 'Показаны темы только для 4 класса',
        };
      case '1,2,3,4':
        return {
          notice: 'Все классы (1, 2, 3 и 4)',
          badge: 'Все классы',
          subtitle: 'Показаны слова всех классов (1, 2, 3 и 4)',
        };
      default:
        return {
          notice: `${sorted.join(', ')} классы`,
          badge: `${sorted.join(', ')} кл.`,
          subtitle: `Показаны слова для выбранных классов (${sorted.join(', ')})`,
        };
    }
  } else {
    // Latvian
    switch (key) {
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
      case '4':
        return {
          notice: 'Tikai 4. klase',
          badge: '4. klase',
          subtitle: 'Rādītās tēmas tikai 4. klasei',
        };
      case '1,2,3,4':
        return {
          notice: 'Visas klases (1., 2., 3. un 4.)',
          badge: 'Visas klases',
          subtitle: 'Rādīti visu klašu vārdi (1., 2., 3. un 4.)',
        };
      default:
        return {
          notice: `${sorted.join('. un ')}. klase`,
          badge: `${sorted.join(', ')}. kl.`,
          subtitle: `Rādīti izvēlēto klašu vārdi (${sorted.join(', ')})`,
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
  if (!playerName || playerName === 'Знайка' || playerName === 'Zinītis' || playerName === 'Супер-Знайка') {
    return t.defaultPlayerName;
  }
  return playerName;
}

export * from '../data/curriculum';

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



