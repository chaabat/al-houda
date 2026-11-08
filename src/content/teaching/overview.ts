// Pôle enseignement — text supplied by the association (French original), translated.
import type { Localized } from "@/content/localized";

export type SubjectKey = "arabic" | "quran";

export type Teaching = {
  eyebrow: string;
  title: string;
  intro: string;
  stats: { value: string; label: string }[];
  trust: { title: string; text: string };
  program: {
    title: string;
    intro: string;
    subjects: { key: SubjectKey; title: string; text: string; skills: string[] }[];
    /** Shown as a pull quote, quotation marks included. */
    goal: string;
  };
  team: { title: string; paragraphs: string[]; values: string[] };
  digital: { title: string; paragraphs: string[] };
  motivation: {
    title: string;
    paragraphs: string[];
    highlight: { title: string; text: string };
  };
  religion: { title: string; text: string };
  closing: { title: string; text: string; signature: string };
  registration: { title: string; intro: string };
};

const fr: Teaching = {
  eyebrow: "Pôle enseignement",
  title: "Apprendre, comprendre et progresser",
  intro:
    "L’enseignement constitue l’un des axes majeurs de l’Association El Houda. Notre ambition est d’offrir aux enfants un cadre d’apprentissage sérieux, bienveillant et structuré, leur permettant de progresser dans l’apprentissage de la langue arabe et du Saint Coran, tout en grandissant dans un environnement propice à la transmission des valeurs, au respect et à l’épanouissement.",
  stats: [
    { value: "254", label: "élèves inscrits cette année" },
    { value: "2", label: "enseignements : langue arabe et Coran" },
    { value: "1", label: "équipe pédagogique expérimentée" },
  ],
  trust: {
    title: "Une année placée sous le signe de la confiance",
    text: "Pour cette nouvelle année scolaire, 254 élèves sont inscrits au sein de notre pôle enseignement. Ce nombre important témoigne de la confiance accordée par les familles à notre association et nous encourage à poursuivre nos efforts pour améliorer continuellement la qualité de l’accueil, de l’enseignement et du suivi pédagogique. Dès leur arrivée, les élèves sont accueillis et accompagnés afin qu’ils puissent trouver leur place, évoluer à leur rythme et apprendre dans les meilleures conditions possibles.",
  },
  program: {
    title: "Langue arabe et apprentissage du Coran",
    intro:
      "Notre programme pédagogique s’articule principalement autour de deux enseignements complémentaires : la langue arabe et le Saint Coran.",
    subjects: [
      {
        key: "arabic",
        title: "La langue arabe",
        text: "L’apprentissage de l’arabe permet progressivement à l’enfant de se familiariser avec la lecture, l’écriture, le vocabulaire et la compréhension. Il constitue également un outil essentiel pour mieux aborder le texte coranique.",
        skills: ["Lecture", "Écriture", "Vocabulaire", "Compréhension"],
      },
      {
        key: "quran",
        title: "Le Saint Coran",
        text: "L’enseignement du Coran vise quant à lui à accompagner chaque élève dans la lecture, la bonne récitation, la mémorisation et, progressivement, la compréhension.",
        skills: ["Lecture", "Récitation", "Mémorisation", "Compréhension"],
      },
    ],
    goal: "« Notre objectif ne consiste donc pas uniquement à mémoriser : nous souhaitons aider l’enfant à mieux lire, mieux réciter et mieux comprendre ce qu’il apprend. »",
  },
  team: {
    title: "Une équipe pédagogique expérimentée",
    paragraphs: [
      "La qualité de notre enseignement repose avant tout sur l’engagement de notre équipe pédagogique composée d’enseignants et d’enseignantes compétents et expérimentés, dont plusieurs disposent d’une longue expérience au sein de notre mosquée. Au-delà de la transmission des connaissances, une attention particulière est portée au suivi de chaque enfant, à sa progression et aux éventuelles difficultés qu’il peut rencontrer.",
      "L’équipe pédagogique travaille ainsi dans une démarche commune : accompagner, encourager et faire progresser chaque élève en tenant compte de son niveau et de son rythme d’apprentissage.",
    ],
    values: ["Accompagner", "Encourager", "Faire progresser"],
  },
  digital: {
    title: "Un enseignement qui entre dans l’ère du numérique",
    paragraphs: [
      "Cette année marque également une nouvelle étape dans la modernisation de notre pôle enseignement. L’Association El Houda se dote progressivement de nouveaux moyens techniques et numériques destinés à faciliter l’organisation pédagogique et à renforcer le lien entre les enseignants et les familles.",
      "Un nouvel outil numérique de gestion de l’enseignement permettra notamment aux parents de disposer d’un accès dédié afin de suivre la progression et le parcours pédagogique de leurs enfants, dans un esprit comparable aux outils numériques de suivi aujourd’hui utilisés dans l’enseignement scolaire. Cette évolution a vocation à se poursuivre. À terme, notre objectif est également de permettre aux familles d’effectuer les inscriptions directement en ligne, afin de simplifier les démarches et d’améliorer encore l’organisation du pôle enseignement.",
    ],
  },
  motivation: {
    title: "Encourager les enfants à donner le meilleur d’eux-mêmes",
    paragraphs: [
      "Apprendre doit aussi être une source de motivation et de satisfaction. Tout au long de l’année, différentes initiatives seront mises en place afin de valoriser les efforts et les progrès de nos élèves.",
      "Des évaluations et des concours pédagogiques et coraniques permettront notamment aux enfants de mesurer leur progression et de développer le goût de l’effort dans un esprit positif et bienveillant.",
      "Les élèves qui se distingueront par leur travail, leur progression et leurs résultats pourront être récompensés, afin de mettre à l’honneur leurs efforts et de donner envie à chacun de progresser davantage.",
    ],
    highlight: {
      title: "Laylat al-Qadr",
      text: "À l’occasion de Laylat al-Qadr, un temps particulier sera consacré à la valorisation de nos élèves à travers des concours de récitation et de mémorisation du Saint Coran.",
    },
  },
  religion: {
    title: "Des connaissances religieuses adaptées aux enfants",
    text: "Avec l’accompagnement et l’apport de l’imam de la mosquée El Houda, notre programme comporte également une initiation adaptée à l’âge des élèves aux connaissances religieuses fondamentales. Il ne s’agit pas d’un enseignement spécialisé ou approfondi, mais d’une transmission accessible des notions essentielles, notamment dans le domaine de la pratique religieuse et de la jurisprudence de base, afin que les enfants puissent mieux comprendre certains aspects de leur religion et de leur pratique quotidienne.",
  },
  closing: {
    title: "Enseigner, accompagner et transmettre",
    text: "À travers son pôle enseignement, l’Association El Houda souhaite construire un environnement dans lequel l’apprentissage, la transmission, le respect, l’encouragement et l’épanouissement de l’enfant avancent ensemble. Avec 254 élèves, une équipe pédagogique expérimentée, un programme structuré et de nouveaux outils numériques, notre pôle enseignement poursuit aujourd’hui son évolution avec une ambition claire : permettre à chaque enfant d’apprendre la langue arabe, de progresser dans la lecture et la mémorisation du Coran, d’en améliorer la compréhension et la récitation, tout en étant accompagné et encouragé tout au long de son parcours.",
    signature:
      "Association El Houda – Transmettre aujourd’hui, accompagner les générations de demain",
  },
  registration: {
    title: "Inscription aux cours d’arabe et / ou de Coran",
    intro:
      "Des cours d’arabe et de Coran sont proposés dans votre mosquée ! Remplissez le formulaire ci-dessous pour inscrire votre ou vos enfants.",
  },
};

const en: Teaching = {
  eyebrow: "Teaching department",
  title: "Learning, understanding and progressing",
  intro:
    "Teaching is one of the main pillars of the El Houda Association. Our ambition is to offer children a serious, caring and structured learning environment, enabling them to progress in learning the Arabic language and the Holy Qur’an while growing up in a setting that fosters the passing on of values, respect and personal fulfilment.",
  stats: [
    { value: "254", label: "pupils enrolled this year" },
    { value: "2", label: "subjects: Arabic language and Qur’an" },
    { value: "1", label: "experienced teaching team" },
  ],
  trust: {
    title: "A year built on trust",
    text: "For this new school year, 254 pupils are enrolled in our teaching department. This large number reflects the trust families place in our association and encourages us to keep improving the quality of our welcome, our teaching and our educational follow-up. From the moment they arrive, pupils are welcomed and supported so that they can find their place, progress at their own pace and learn in the best possible conditions.",
  },
  program: {
    title: "Arabic language and learning the Qur’an",
    intro:
      "Our curriculum is built mainly around two complementary subjects: the Arabic language and the Holy Qur’an.",
    subjects: [
      {
        key: "arabic",
        title: "The Arabic language",
        text: "Learning Arabic gradually familiarises the child with reading, writing, vocabulary and comprehension. It is also an essential tool for a better approach to the Qur’anic text.",
        skills: ["Reading", "Writing", "Vocabulary", "Comprehension"],
      },
      {
        key: "quran",
        title: "The Holy Qur’an",
        text: "Qur’an lessons aim to support each pupil in reading, correct recitation, memorisation and, step by step, understanding.",
        skills: ["Reading", "Recitation", "Memorisation", "Comprehension"],
      },
    ],
    goal: "“Our goal is therefore not only memorisation: we want to help the child read better, recite better and better understand what they learn.”",
  },
  team: {
    title: "An experienced teaching team",
    paragraphs: [
      "The quality of our teaching rests above all on the commitment of our teaching team, made up of skilled and experienced male and female teachers, several of whom have long experience at our mosque. Beyond passing on knowledge, particular attention is paid to following each child, their progress and any difficulties they may encounter.",
      "The teaching team therefore works with a shared approach: to support, encourage and help every pupil progress, taking into account their level and learning pace.",
    ],
    values: ["Support", "Encourage", "Help progress"],
  },
  digital: {
    title: "Teaching enters the digital age",
    paragraphs: [
      "This year also marks a new step in modernising our teaching department. The El Houda Association is gradually acquiring new technical and digital resources to make organising lessons easier and to strengthen the link between teachers and families.",
      "A new digital teaching-management tool will in particular give parents dedicated access to follow their children’s progress and learning path, much like the digital tracking tools now used in schools. This development is set to continue. In time, our goal is also to let families register online directly, to simplify the process and further improve the organisation of the teaching department.",
    ],
  },
  motivation: {
    title: "Encouraging children to give their best",
    paragraphs: [
      "Learning should also be a source of motivation and satisfaction. Throughout the year, various initiatives will be put in place to recognise our pupils’ efforts and progress.",
      "Assessments and educational and Qur’anic competitions will in particular allow children to measure their progress and develop a taste for effort in a positive and caring spirit.",
      "Pupils who stand out through their work, progress and results may be rewarded, to honour their efforts and make everyone want to progress even further.",
    ],
    highlight: {
      title: "Laylat al-Qadr",
      text: "On the occasion of Laylat al-Qadr, a special time will be devoted to celebrating our pupils through Qur’an recitation and memorisation competitions.",
    },
  },
  religion: {
    title: "Religious knowledge adapted to children",
    text: "With the guidance and contribution of the imam of El Houda Mosque, our curriculum also includes an age-appropriate introduction to fundamental religious knowledge. This is not specialised or in-depth teaching, but an accessible transmission of essential notions, particularly in religious practice and basic jurisprudence, so that children can better understand certain aspects of their religion and their daily practice.",
  },
  closing: {
    title: "Teaching, supporting and passing on",
    text: "Through its teaching department, the El Houda Association wants to build an environment in which the child’s learning, transmission of knowledge, respect, encouragement and fulfilment go hand in hand. With 254 pupils, an experienced teaching team, a structured curriculum and new digital tools, our teaching department continues to evolve today with a clear ambition: to enable every child to learn Arabic, progress in reading and memorising the Qur’an, and improve their understanding and recitation, while being supported and encouraged throughout their journey.",
    signature:
      "El Houda Association – Passing on knowledge today, supporting the generations of tomorrow",
  },
  registration: {
    title: "Registration for Arabic and/or Qur’an classes",
    intro:
      "Arabic and Qur’an classes are offered at your mosque! Fill in the form below to register your child or children.",
  },
};

const de: Teaching = {
  eyebrow: "Bildungsbereich",
  title: "Lernen, verstehen und Fortschritte machen",
  intro:
    "Der Unterricht ist einer der Schwerpunkte des Vereins El Houda. Unser Anspruch ist es, Kindern einen ernsthaften, wohlwollenden und strukturierten Lernrahmen zu bieten, in dem sie beim Erlernen der arabischen Sprache und des Heiligen Korans Fortschritte machen und zugleich in einem Umfeld aufwachsen, das die Weitergabe von Werten, Respekt und persönliche Entfaltung fördert.",
  stats: [
    { value: "254", label: "eingeschriebene Schüler in diesem Jahr" },
    { value: "2", label: "Fächer: arabische Sprache und Koran" },
    { value: "1", label: "erfahrenes Lehrerteam" },
  ],
  trust: {
    title: "Ein Jahr im Zeichen des Vertrauens",
    text: "Für dieses neue Schuljahr sind 254 Schüler in unserem Bildungsbereich eingeschrieben. Diese hohe Zahl zeigt das Vertrauen, das die Familien unserem Verein entgegenbringen, und ermutigt uns, die Qualität der Aufnahme, des Unterrichts und der pädagogischen Begleitung stetig zu verbessern. Vom ersten Tag an werden die Schüler empfangen und begleitet, damit sie ihren Platz finden, sich in ihrem eigenen Tempo entwickeln und unter bestmöglichen Bedingungen lernen können.",
  },
  program: {
    title: "Arabische Sprache und Koranunterricht",
    intro:
      "Unser Lehrplan stützt sich hauptsächlich auf zwei sich ergänzende Fächer: die arabische Sprache und den Heiligen Koran.",
    subjects: [
      {
        key: "arabic",
        title: "Die arabische Sprache",
        text: "Beim Arabischlernen wird das Kind schrittweise mit Lesen, Schreiben, Wortschatz und Textverständnis vertraut. Die Sprache ist zudem ein wesentliches Werkzeug, um den Korantext besser zu erschließen.",
        skills: ["Lesen", "Schreiben", "Wortschatz", "Verständnis"],
      },
      {
        key: "quran",
        title: "Der Heilige Koran",
        text: "Der Koranunterricht begleitet jeden Schüler beim Lesen, bei der korrekten Rezitation, beim Auswendiglernen und nach und nach beim Verstehen.",
        skills: ["Lesen", "Rezitation", "Auswendiglernen", "Verständnis"],
      },
    ],
    goal: "„Unser Ziel ist also nicht nur das Auswendiglernen: Wir möchten dem Kind helfen, besser zu lesen, besser zu rezitieren und besser zu verstehen, was es lernt.“",
  },
  team: {
    title: "Ein erfahrenes Lehrerteam",
    paragraphs: [
      "Die Qualität unseres Unterrichts beruht vor allem auf dem Engagement unseres Teams aus kompetenten und erfahrenen Lehrerinnen und Lehrern, von denen mehrere schon seit langer Zeit in unserer Moschee unterrichten. Über die Wissensvermittlung hinaus achten wir besonders auf die Begleitung jedes Kindes, seine Fortschritte und mögliche Schwierigkeiten.",
      "Das Lehrerteam verfolgt daher einen gemeinsamen Ansatz: jeden Schüler begleiten, ermutigen und voranbringen, unter Berücksichtigung seines Niveaus und seines Lerntempos.",
    ],
    values: ["Begleiten", "Ermutigen", "Voranbringen"],
  },
  digital: {
    title: "Unterricht im digitalen Zeitalter",
    paragraphs: [
      "Dieses Jahr markiert auch einen neuen Schritt in der Modernisierung unseres Bildungsbereichs. Der Verein El Houda stattet sich nach und nach mit neuen technischen und digitalen Mitteln aus, um die Unterrichtsorganisation zu erleichtern und die Verbindung zwischen Lehrkräften und Familien zu stärken.",
      "Ein neues digitales Verwaltungstool gibt den Eltern insbesondere einen eigenen Zugang, um die Fortschritte und den Lernweg ihrer Kinder zu verfolgen – ähnlich wie die digitalen Werkzeuge, die heute in Schulen verwendet werden. Diese Entwicklung wird fortgesetzt. Langfristig möchten wir den Familien auch ermöglichen, die Anmeldung direkt online vorzunehmen, um die Abläufe zu vereinfachen und die Organisation des Bildungsbereichs weiter zu verbessern.",
    ],
  },
  motivation: {
    title: "Kinder ermutigen, ihr Bestes zu geben",
    paragraphs: [
      "Lernen soll auch eine Quelle der Motivation und Zufriedenheit sein. Im Laufe des Jahres werden verschiedene Initiativen umgesetzt, um die Bemühungen und Fortschritte unserer Schüler zu würdigen.",
      "Prüfungen sowie pädagogische und Koran-Wettbewerbe ermöglichen es den Kindern insbesondere, ihre Fortschritte zu messen und in einem positiven und wohlwollenden Geist Freude an der Anstrengung zu entwickeln.",
      "Schüler, die sich durch ihre Arbeit, ihre Fortschritte und ihre Ergebnisse auszeichnen, können belohnt werden, um ihre Bemühungen zu würdigen und allen Lust zu machen, noch weiter voranzukommen.",
    ],
    highlight: {
      title: "Laylat al-Qadr",
      text: "Anlässlich der Laylat al-Qadr wird eine besondere Zeit der Würdigung unserer Schüler gewidmet, mit Wettbewerben in der Rezitation und im Auswendiglernen des Heiligen Korans.",
    },
  },
  religion: {
    title: "Religiöses Wissen kindgerecht vermittelt",
    text: "Mit der Begleitung und Unterstützung des Imams der Moschee El Houda umfasst unser Programm auch eine altersgerechte Einführung in grundlegendes religiöses Wissen. Es handelt sich nicht um einen spezialisierten oder vertieften Unterricht, sondern um eine verständliche Vermittlung wesentlicher Begriffe, insbesondere aus der religiösen Praxis und den Grundlagen der Rechtswissenschaft, damit die Kinder bestimmte Aspekte ihrer Religion und ihrer täglichen Praxis besser verstehen.",
  },
  closing: {
    title: "Unterrichten, begleiten und weitergeben",
    text: "Mit seinem Bildungsbereich möchte der Verein El Houda ein Umfeld schaffen, in dem Lernen, Weitergabe, Respekt, Ermutigung und die Entfaltung des Kindes Hand in Hand gehen. Mit 254 Schülern, einem erfahrenen Lehrerteam, einem strukturierten Programm und neuen digitalen Werkzeugen entwickelt sich unser Bildungsbereich heute mit einem klaren Ziel weiter: jedem Kind zu ermöglichen, Arabisch zu lernen, im Lesen und Auswendiglernen des Korans voranzukommen und sein Verständnis und seine Rezitation zu verbessern – begleitet und ermutigt auf seinem gesamten Weg.",
    signature:
      "Verein El Houda – Heute weitergeben, die Generationen von morgen begleiten",
  },
  registration: {
    title: "Anmeldung zum Arabisch- und/oder Koranunterricht",
    intro:
      "In Ihrer Moschee wird Arabisch- und Koranunterricht angeboten! Füllen Sie das folgende Formular aus, um Ihr Kind oder Ihre Kinder anzumelden.",
  },
};

const ar: Teaching = {
  eyebrow: "قطب التعليم",
  title: "نتعلّم، نفهم، ونتقدّم",
  intro:
    "يُعدّ التعليم أحد المحاور الرئيسية لجمعية الهدى. وطموحنا أن نوفّر للأطفال إطارًا تعليميًا جادًّا ورحيمًا ومنظَّمًا، يمكّنهم من التقدّم في تعلّم اللغة العربية والقرآن الكريم، وأن ينشؤوا في بيئة تساعد على نقل القيم والاحترام والتفتّح.",
  stats: [
    { value: "254", label: "تلميذًا مسجَّلًا هذه السنة" },
    { value: "2", label: "مادّتان: اللغة العربية والقرآن" },
    { value: "1", label: "فريق تربوي ذو خبرة" },
  ],
  trust: {
    title: "سنة تحت شعار الثقة",
    text: "في هذه السنة الدراسية الجديدة، سُجِّل 254 تلميذًا في قطب التعليم لدينا. ويشهد هذا العدد الكبير على الثقة التي توليها العائلات لجمعيتنا، ويشجّعنا على مواصلة جهودنا لتحسين جودة الاستقبال والتعليم والمتابعة التربوية باستمرار. ومنذ وصولهم، يُستقبَل التلاميذ ويُرافَقون حتى يجدوا مكانهم، ويتقدّموا حسب وتيرتهم، ويتعلّموا في أفضل الظروف الممكنة.",
  },
  program: {
    title: "اللغة العربية وتعلّم القرآن",
    intro: "يرتكز برنامجنا التربوي أساسًا على مادّتين متكاملتين: اللغة العربية والقرآن الكريم.",
    subjects: [
      {
        key: "arabic",
        title: "اللغة العربية",
        text: "يتيح تعلّم العربية للطفل أن يألف تدريجيًا القراءة والكتابة والمفردات والفهم. كما تُعدّ أداة أساسية لفهم النص القرآني على نحو أفضل.",
        skills: ["القراءة", "الكتابة", "المفردات", "الفهم"],
      },
      {
        key: "quran",
        title: "القرآن الكريم",
        text: "أما تعليم القرآن فيهدف إلى مرافقة كل تلميذ في القراءة وحسن التلاوة والحفظ، ثم الفهم تدريجيًا.",
        skills: ["القراءة", "التلاوة", "الحفظ", "الفهم"],
      },
    ],
    goal: "«هدفنا إذن ليس الحفظ فقط: بل نريد أن نساعد الطفل على أن يقرأ أفضل، ويرتّل أفضل، ويفهم ما يتعلّمه فهمًا أفضل.»",
  },
  team: {
    title: "فريق تربوي ذو خبرة",
    paragraphs: [
      "تقوم جودة تعليمنا قبل كل شيء على التزام فريقنا التربوي المكوَّن من معلّمين ومعلّمات أكفاء وذوي خبرة، لكثير منهم تجربة طويلة في مسجدنا. وإلى جانب نقل المعارف، نولي عناية خاصة لمتابعة كل طفل وتقدّمه والصعوبات التي قد تعترضه.",
      "ولذلك يعمل الفريق التربوي وفق نهج مشترك: مرافقة كل تلميذ وتشجيعه ومساعدته على التقدّم، مع مراعاة مستواه ووتيرة تعلّمه.",
    ],
    values: ["المرافقة", "التشجيع", "الارتقاء"],
  },
  digital: {
    title: "تعليم يدخل العصر الرقمي",
    paragraphs: [
      "تمثّل هذه السنة أيضًا مرحلة جديدة في تحديث قطب التعليم لدينا. إذ تتزوّد جمعية الهدى تدريجيًا بوسائل تقنية ورقمية جديدة لتسهيل التنظيم التربوي وتعزيز الصلة بين المعلّمين والعائلات.",
      "وستتيح أداة رقمية جديدة لإدارة التعليم للأولياء، على وجه الخصوص، الحصول على فضاء خاص بهم لمتابعة تقدّم أبنائهم ومسارهم التعليمي، على غرار أدوات المتابعة الرقمية المستعملة اليوم في المدارس. وهذا التطوّر مرشّح للاستمرار. وعلى المدى البعيد، نهدف أيضًا إلى تمكين العائلات من التسجيل مباشرة عبر الإنترنت، لتبسيط الإجراءات وتحسين تنظيم قطب التعليم أكثر.",
    ],
  },
  motivation: {
    title: "تشجيع الأطفال على بذل أفضل ما لديهم",
    paragraphs: [
      "ينبغي أن يكون التعلّم أيضًا مصدرًا للتحفيز والرضا. وعلى مدار السنة، ستُطلَق مبادرات مختلفة لتثمين جهود تلاميذنا وتقدّمهم.",
      "وستتيح التقييمات والمسابقات التربوية والقرآنية، على وجه الخصوص، للأطفال قياس تقدّمهم وتنمية حبّ الاجتهاد بروح إيجابية ورحيمة.",
      "ويمكن مكافأة التلاميذ المتميّزين بعملهم وتقدّمهم ونتائجهم، تكريمًا لجهودهم وتحفيزًا للجميع على مزيد من التقدّم.",
    ],
    highlight: {
      title: "ليلة القدر",
      text: "بمناسبة ليلة القدر، سيُخصَّص وقت مميّز لتكريم تلاميذنا من خلال مسابقات في تلاوة القرآن الكريم وحفظه.",
    },
  },
  religion: {
    title: "معارف دينية ملائمة للأطفال",
    text: "بمرافقة إمام مسجد الهدى ومساهمته، يتضمّن برنامجنا أيضًا تعريفًا بالمعارف الدينية الأساسية يتلاءم مع سنّ التلاميذ. ولا يتعلّق الأمر بتعليم متخصّص أو معمَّق، بل بنقل ميسَّر للمفاهيم الأساسية، خاصة في مجال الممارسة الدينية والفقه الأساسي، حتى يتمكّن الأطفال من فهم بعض جوانب دينهم وممارستهم اليومية فهمًا أفضل.",
  },
  closing: {
    title: "نعلّم، نرافق، وننقل العلم",
    text: "من خلال قطب التعليم، تسعى جمعية الهدى إلى بناء بيئة يسير فيها التعلّم ونقل المعرفة والاحترام والتشجيع وتفتّح الطفل جنبًا إلى جنب. ومع 254 تلميذًا، وفريق تربوي ذي خبرة، وبرنامج منظَّم، وأدوات رقمية جديدة، يواصل قطب التعليم اليوم تطوّره بطموح واضح: تمكين كل طفل من تعلّم اللغة العربية، والتقدّم في قراءة القرآن وحفظه، وتحسين فهمه وتلاوته، مع مرافقته وتشجيعه طوال مساره.",
    signature: "جمعية الهدى – ننقل العلم اليوم، ونرافق أجيال الغد",
  },
  registration: {
    title: "التسجيل في دروس العربية و/أو القرآن",
    intro: "تُقدَّم دروس العربية والقرآن في مسجدكم! املؤوا الاستمارة أدناه لتسجيل طفلكم أو أطفالكم.",
  },
};

export const TEACHING: Localized<Teaching> = { fr, en, de, ar };
