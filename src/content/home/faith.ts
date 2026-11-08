// Home page: Qur'an reminders, names of Allah and the mosque's agenda.
// Edit EVENTS each year (dates confirmed by the Commission Culte).
import type { Localized } from "@/content/localized";

/* ----------------------------------------------------------------------------
 * Section texts
 * ------------------------------------------------------------------------- */

export type HomeFaithTexts = {
  reminders: { eyebrow: string; title: string; previous: string; next: string; goTo: string };
  names: { eyebrow: string; title: string; text: string };
  events: {
    eyebrow: string;
    title: string;
    text: string;
    next: string;
    days: string;
    hours: string;
    minutes: string;
    today: string;
    estimated: string;
    estimatedNote: string;
    weekly: { title: string; text: string };
    mawaqit: { title: string; text: string; cta: string };
  };
};

export const HOME_FAITH: Localized<HomeFaithTexts> = {
  fr: {
    reminders: {
      eyebrow: "Rappel",
      title: "Une parole pour le cœur",
      previous: "Verset précédent",
      next: "Verset suivant",
      goTo: "Afficher le verset",
    },
    names: {
      eyebrow: "Al-Asmā’ al-Ḥusnā",
      title: "Les plus beaux noms d’Allah",
      text: "« À Allah appartiennent les plus beaux noms : invoquez-Le par ces noms. » (7:180)",
    },
    events: {
      eyebrow: "Agenda",
      title: "Les grands rendez-vous de la mosquée",
      text: "Ramadan, nuits bénies, fêtes de l’Aïd : préparons ensemble les moments forts de l’année.",
      next: "Prochain rendez-vous",
      days: "jours",
      hours: "heures",
      minutes: "min",
      today: "C’est aujourd’hui !",
      estimated: "Date estimée",
      estimatedNote:
        "Les dates des fêtes dépendent de l’observation du croissant lunaire. Elles sont confirmées par la Commission Culte et annoncées sur Mawaqit.",
      weekly: {
        title: "Chaque vendredi",
        text: "Prière du Jumu’a et sermon. L’horaire exact est affiché dans les horaires de prière.",
      },
      mawaqit: {
        title: "Annonces de la mosquée",
        text: "Cours, conférences, collectes et informations pratiques sont publiés en direct sur Mawaqit. Ajoutez la mosquée Al-Houda en favori dans l’application pour recevoir les notifications.",
        cta: "Voir les annonces sur Mawaqit",
      },
    },
  },
  en: {
    reminders: {
      eyebrow: "Reminder",
      title: "A word for the heart",
      previous: "Previous verse",
      next: "Next verse",
      goTo: "Show verse",
    },
    names: {
      eyebrow: "Al-Asmā’ al-Ḥusnā",
      title: "The most beautiful names of Allah",
      text: "“To Allah belong the most beautiful names, so call upon Him by them.” (7:180)",
    },
    events: {
      eyebrow: "Agenda",
      title: "The mosque’s key dates",
      text: "Ramadan, blessed nights, the Eid celebrations: let us prepare the highlights of the year together.",
      next: "Next event",
      days: "days",
      hours: "hours",
      minutes: "min",
      today: "It’s today!",
      estimated: "Estimated date",
      estimatedNote:
        "Festival dates depend on the sighting of the crescent moon. They are confirmed by the Worship Committee and announced on Mawaqit.",
      weekly: {
        title: "Every Friday",
        text: "Jumu’ah prayer and sermon. The exact time is shown in the prayer times.",
      },
      mawaqit: {
        title: "Mosque announcements",
        text: "Lessons, lectures, collections and practical information are published live on Mawaqit. Add Al-Houda Mosque to your favourites in the app to receive notifications.",
        cta: "See the announcements on Mawaqit",
      },
    },
  },
  de: {
    reminders: {
      eyebrow: "Erinnerung",
      title: "Ein Wort für das Herz",
      previous: "Vorheriger Vers",
      next: "Nächster Vers",
      goTo: "Vers anzeigen",
    },
    names: {
      eyebrow: "Al-Asmā’ al-Ḥusnā",
      title: "Die schönsten Namen Allahs",
      text: "„Allah gehören die schönsten Namen, so ruft Ihn mit ihnen an.“ (7:180)",
    },
    events: {
      eyebrow: "Termine",
      title: "Die großen Termine der Moschee",
      text: "Ramadan, gesegnete Nächte, die Eid-Feste: Bereiten wir gemeinsam die Höhepunkte des Jahres vor.",
      next: "Nächster Termin",
      days: "Tage",
      hours: "Stunden",
      minutes: "Min.",
      today: "Heute ist es so weit!",
      estimated: "Voraussichtliches Datum",
      estimatedNote:
        "Die Daten der Feste hängen von der Sichtung der Mondsichel ab. Sie werden von der Kommission für Gottesdienst bestätigt und auf Mawaqit bekanntgegeben.",
      weekly: {
        title: "Jeden Freitag",
        text: "Freitagsgebet (Jumu’a) und Predigt. Die genaue Uhrzeit steht bei den Gebetszeiten.",
      },
      mawaqit: {
        title: "Ankündigungen der Moschee",
        text: "Unterricht, Vorträge, Spendenaktionen und praktische Informationen werden live auf Mawaqit veröffentlicht. Fügen Sie die Moschee Al-Houda in der App zu Ihren Favoriten hinzu, um Benachrichtigungen zu erhalten.",
        cta: "Ankündigungen auf Mawaqit ansehen",
      },
    },
  },
  ar: {
    reminders: {
      eyebrow: "تذكير",
      title: "كلمة للقلب",
      previous: "الآية السابقة",
      next: "الآية التالية",
      goTo: "عرض الآية",
    },
    names: {
      eyebrow: "الأسماء الحسنى",
      title: "أسماء الله الحسنى",
      text: "﴿وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا﴾ (الأعراف: 180)",
    },
    events: {
      eyebrow: "المواعيد",
      title: "المواعيد الكبرى في المسجد",
      text: "رمضان، والليالي المباركة، والأعياد: لنستعدّ معًا لأبرز محطات السنة.",
      next: "الموعد القادم",
      days: "يوم",
      hours: "ساعة",
      minutes: "دقيقة",
      today: "اليوم!",
      estimated: "تاريخ تقديري",
      estimatedNote:
        "تتوقف مواعيد الأعياد على رؤية الهلال. وتؤكدها لجنة الشؤون الدينية وتُعلَن على تطبيق مواقيت.",
      weekly: {
        title: "كل يوم جمعة",
        text: "صلاة الجمعة والخطبة. الوقت الدقيق معروض في مواقيت الصلاة.",
      },
      mawaqit: {
        title: "إعلانات المسجد",
        text: "تُنشر الدروس والمحاضرات وحملات التبرع والمعلومات العملية مباشرة على مواقيت. أضيفوا مسجد الهدى إلى المفضلة في التطبيق لتصلكم الإشعارات.",
        cta: "عرض الإعلانات على مواقيت",
      },
    },
  },
};

/* ----------------------------------------------------------------------------
 * Qur'an verses shown in the reminder carousel
 * ------------------------------------------------------------------------- */

export type Verse = {
  arabic: string;
  /** Surah:verse reference. */
  ref: string;
  meaning: Localized<string>;
  surah: Localized<string>;
};

export const VERSES: Verse[] = [
  {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ref: "13:28",
    surah: { fr: "Ar-Ra‘d", en: "Ar-Ra‘d", de: "Ar-Ra‘d", ar: "الرعد" },
    meaning: {
      fr: "N’est-ce point par l’évocation d’Allah que les cœurs se tranquillisent ?",
      en: "Surely it is in the remembrance of Allah that hearts find peace.",
      de: "Wahrlich, im Gedenken Allahs finden die Herzen Ruhe.",
      ar: "بذكر الله تسكن القلوب وتطمئن.",
    },
  },
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ref: "94:5-6",
    surah: { fr: "Ash-Sharh", en: "Ash-Sharh", de: "Ash-Sharh", ar: "الشرح" },
    meaning: {
      fr: "À côté de la difficulté est, certes, une facilité. Oui, à côté de la difficulté est une facilité.",
      en: "So surely with hardship comes ease. Surely with hardship comes ease.",
      de: "Wahrlich, mit der Erschwernis kommt Erleichterung. Wahrlich, mit der Erschwernis kommt Erleichterung.",
      ar: "مع كل شدة فرج، ومع كل ضيق سعة.",
    },
  },
  {
    arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
    ref: "2:186",
    surah: { fr: "Al-Baqara", en: "Al-Baqarah", de: "Al-Baqara", ar: "البقرة" },
    meaning: {
      fr: "Et quand Mes serviteurs t’interrogent sur Moi, alors Je suis tout proche.",
      en: "And when My servants ask you about Me, I am truly near.",
      de: "Und wenn dich Meine Diener nach Mir fragen, so bin Ich nahe.",
      ar: "الله قريب من عباده، يسمع دعاءهم ويجيبه.",
    },
  },
  {
    arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    ref: "39:53",
    surah: { fr: "Az-Zumar", en: "Az-Zumar", de: "Az-Zumar", ar: "الزمر" },
    meaning: {
      fr: "Ne désespérez pas de la miséricorde d’Allah.",
      en: "Do not despair of the mercy of Allah.",
      de: "Verliert nicht die Hoffnung auf Allahs Barmherzigkeit.",
      ar: "رحمة الله واسعة، فلا ييأس منها أحد.",
    },
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    ref: "65:3",
    surah: { fr: "At-Talāq", en: "At-Talaq", de: "At-Talaq", ar: "الطلاق" },
    meaning: {
      fr: "Et quiconque place sa confiance en Allah, Il lui suffit.",
      en: "And whoever puts their trust in Allah, He is sufficient for them.",
      de: "Und wer auf Allah vertraut, dem genügt Er.",
      ar: "من توكّل على الله كفاه.",
    },
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    ref: "2:152",
    surah: { fr: "Al-Baqara", en: "Al-Baqarah", de: "Al-Baqara", ar: "البقرة" },
    meaning: {
      fr: "Souvenez-vous de Moi, Je Me souviendrai de vous.",
      en: "Remember Me, and I will remember you.",
      de: "Gedenkt Meiner, so gedenke Ich eurer.",
      ar: "من ذكر الله ذكره الله.",
    },
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    ref: "2:153",
    surah: { fr: "Al-Baqara", en: "Al-Baqarah", de: "Al-Baqara", ar: "البقرة" },
    meaning: {
      fr: "Certes, Allah est avec ceux qui sont patients.",
      en: "Indeed, Allah is with those who are patient.",
      de: "Wahrlich, Allah ist mit den Geduldigen.",
      ar: "الله مع الصابرين بعونه وتأييده.",
    },
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    ref: "20:114",
    surah: { fr: "Ṭā-Hā", en: "Ta-Ha", de: "Ta-Ha", ar: "طه" },
    meaning: {
      fr: "Et dis : « Ô mon Seigneur, accroît mes connaissances ! »",
      en: "And say: “My Lord, increase me in knowledge.”",
      de: "Und sag: „Mein Herr, mehre mein Wissen.“",
      ar: "دعاء بطلب الزيادة من العلم النافع.",
    },
  },
];

/* ----------------------------------------------------------------------------
 * Names of Allah (marquee)
 * ------------------------------------------------------------------------- */

export type DivineName = { arabic: string; latin: string; meaning: Localized<string> };

export const NAMES: DivineName[] = [
  {
    arabic: "الرَّحْمَٰن",
    latin: "Ar-Raḥmān",
    meaning: {
      fr: "Le Tout Miséricordieux",
      en: "The Most Gracious",
      de: "Der Allerbarmer",
      ar: "واسع الرحمة",
    },
  },
  {
    arabic: "الرَّحِيم",
    latin: "Ar-Raḥīm",
    meaning: {
      fr: "Le Très Miséricordieux",
      en: "The Most Merciful",
      de: "Der Barmherzige",
      ar: "دائم الرحمة",
    },
  },
  {
    arabic: "السَّلَام",
    latin: "As-Salām",
    meaning: { fr: "La Paix", en: "The Source of Peace", de: "Der Friede", ar: "مصدر السلام" },
  },
  {
    arabic: "الْهَادِي",
    latin: "Al-Hādī",
    meaning: { fr: "Le Guide", en: "The Guide", de: "Der Rechtleitende", ar: "الذي يهدي عباده" },
  },
  {
    arabic: "النُّور",
    latin: "An-Nūr",
    meaning: { fr: "La Lumière", en: "The Light", de: "Das Licht", ar: "منوّر السماوات والأرض" },
  },
  {
    arabic: "الْغَفُور",
    latin: "Al-Ghafūr",
    meaning: { fr: "Le Pardonneur", en: "The Forgiving", de: "Der Vergebende", ar: "كثير المغفرة" },
  },
  {
    arabic: "الْوَدُود",
    latin: "Al-Wadūd",
    meaning: { fr: "Le Bien-Aimant", en: "The Loving", de: "Der Liebevolle", ar: "المحبّ لعباده" },
  },
  {
    arabic: "اللَّطِيف",
    latin: "Al-Laṭīf",
    meaning: {
      fr: "Le Bienveillant",
      en: "The Subtle, the Kind",
      de: "Der Gütige",
      ar: "الرفيق بعباده",
    },
  },
  {
    arabic: "الْكَرِيم",
    latin: "Al-Karīm",
    meaning: { fr: "Le Généreux", en: "The Generous", de: "Der Freigebige", ar: "كثير العطاء" },
  },
  {
    arabic: "الْحَلِيم",
    latin: "Al-Ḥalīm",
    meaning: {
      fr: "Le Longanime",
      en: "The Forbearing",
      de: "Der Nachsichtige",
      ar: "الذي لا يعجل بالعقوبة",
    },
  },
  {
    arabic: "الصَّبُور",
    latin: "Aṣ-Ṣabūr",
    meaning: { fr: "Le Patient", en: "The Patient", de: "Der Geduldige", ar: "الذي لا يعجل" },
  },
  {
    arabic: "الْعَلِيم",
    latin: "Al-‘Alīm",
    meaning: {
      fr: "L’Omniscient",
      en: "The All-Knowing",
      de: "Der Allwissende",
      ar: "المحيط علمه بكل شيء",
    },
  },
  {
    arabic: "الْحَكِيم",
    latin: "Al-Ḥakīm",
    meaning: { fr: "Le Sage", en: "The Wise", de: "Der Weise", ar: "ذو الحكمة" },
  },
  {
    arabic: "الرَّزَّاق",
    latin: "Ar-Razzāq",
    meaning: {
      fr: "Celui qui pourvoit",
      en: "The Provider",
      de: "Der Versorger",
      ar: "كثير الرزق",
    },
  },
  {
    arabic: "الْمُجِيب",
    latin: "Al-Mujīb",
    meaning: {
      fr: "Celui qui exauce",
      en: "The Responsive",
      de: "Der Erhörende",
      ar: "الذي يجيب الدعاء",
    },
  },
  {
    arabic: "الشَّكُور",
    latin: "Ash-Shakūr",
    meaning: {
      fr: "Le Reconnaissant",
      en: "The Appreciative",
      de: "Der Dankbare",
      ar: "الذي يجزي على القليل",
    },
  },
];

/* ----------------------------------------------------------------------------
 * Agenda — estimated dates for 1448–1449 AH (France). Update every year.
 * `date` is the first day (or the evening for a night), local time.
 * ------------------------------------------------------------------------- */

export type MosqueEvent = {
  id: string;
  date: string;
  estimated: boolean;
  icon: "moon" | "star" | "lantern" | "sparkles" | "calendar";
  title: Localized<string>;
  text: Localized<string>;
};

export const EVENTS: MosqueEvent[] = [
  {
    id: "isra-miraj",
    date: "2027-01-05T18:00",
    estimated: true,
    icon: "star",
    title: {
      fr: "Al-Isrā’ wal-Mi‘rāj",
      en: "Al-Isra’ wal-Mi‘raj",
      de: "Al-Isra’ wal-Mi‘radsch",
      ar: "الإسراء والمعراج",
    },
    text: {
      fr: "Nuit du Voyage nocturne et de l’Ascension (27 Rajab).",
      en: "The Night Journey and Ascension (27 Rajab).",
      de: "Die Nacht der Reise und der Himmelfahrt (27. Radschab).",
      ar: "ليلة الإسراء والمعراج (27 رجب).",
    },
  },
  {
    id: "ramadan",
    date: "2027-02-08T00:00",
    estimated: true,
    icon: "lantern",
    title: {
      fr: "Début du Ramadan",
      en: "Start of Ramadan",
      de: "Beginn des Ramadan",
      ar: "بداية شهر رمضان",
    },
    text: {
      fr: "Premier jour de jeûne. Tarawih chaque soir à la mosquée.",
      en: "First day of fasting. Tarawih every night at the mosque.",
      de: "Erster Fastentag. Jeden Abend Tarawih in der Moschee.",
      ar: "أول أيام الصيام، وصلاة التراويح كل ليلة في المسجد.",
    },
  },
  {
    id: "laylat-al-qadr",
    date: "2027-03-04T18:00",
    estimated: true,
    icon: "sparkles",
    title: { fr: "Laylat al-Qadr", en: "Laylat al-Qadr", de: "Laylat al-Qadr", ar: "ليلة القدر" },
    text: {
      fr: "Nuit du 27 Ramadan, meilleure que mille mois. Concours de Coran des élèves.",
      en: "The 27th night of Ramadan, better than a thousand months. Pupils’ Qur’an competition.",
      de: "Die 27. Nacht des Ramadan, besser als tausend Monate. Koran-Wettbewerb der Schüler.",
      ar: "ليلة 27 من رمضان، خير من ألف شهر. مسابقة القرآن لتلاميذنا.",
    },
  },
  {
    id: "eid-al-fitr",
    date: "2027-03-10T00:00",
    estimated: true,
    icon: "moon",
    title: { fr: "Aïd al-Fitr", en: "Eid al-Fitr", de: "Eid al-Fitr", ar: "عيد الفطر" },
    text: {
      fr: "Prière de l’Aïd et fête de la rupture du jeûne.",
      en: "Eid prayer and the celebration of breaking the fast.",
      de: "Eid-Gebet und Fest des Fastenbrechens.",
      ar: "صلاة العيد والاحتفال بالفطر.",
    },
  },
  {
    id: "eid-al-adha",
    date: "2027-05-16T00:00",
    estimated: true,
    icon: "moon",
    title: { fr: "Aïd al-Adha", en: "Eid al-Adha", de: "Eid al-Adha", ar: "عيد الأضحى" },
    text: {
      fr: "Prière de l’Aïd et fête du sacrifice.",
      en: "Eid prayer and the festival of sacrifice.",
      de: "Eid-Gebet und Opferfest.",
      ar: "صلاة العيد وعيد الأضحى المبارك.",
    },
  },
  {
    id: "hijri-new-year",
    date: "2027-06-06T00:00",
    estimated: true,
    icon: "calendar",
    title: {
      fr: "Nouvel an de l’Hégire 1449",
      en: "Islamic New Year 1449",
      de: "Islamisches Neujahr 1449",
      ar: "رأس السنة الهجرية 1449",
    },
    text: {
      fr: "Premier jour du mois de Muharram.",
      en: "First day of the month of Muharram.",
      de: "Erster Tag des Monats Muharram.",
      ar: "أول أيام شهر محرم.",
    },
  },
];
