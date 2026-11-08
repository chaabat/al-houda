// Commission Culte — text supplied by the association (French original), translated.
import type { Localized } from "@/content/localized";

export type DomainKey = "quran" | "fiqh" | "sira";

export type Worship = {
  eyebrow: string;
  title: string;
  intro: [string, string];
  imam: { title: string; paragraphs: string[] };
  lessons: { title: string; paragraphs: string[] };
  domains: { key: DomainKey; title: string; paragraphs: string[] }[];
  moments: { title: string; text: string; items: string[] };
  close: { title: string; paragraphs: string[] };
  mission: { title: string; paragraphs: string[]; signature: string };
};

const fr: Worship = {
  eyebrow: "Commission Culte",
  title: "Prier, apprendre et grandir dans la connaissance",
  intro: [
    "La Commission Culte de l’Association El Houda occupe une place centrale dans la vie de notre mosquée. Elle a pour mission d’organiser et d’accompagner les activités cultuelles, mais également de permettre à chacun de mieux connaître, comprendre et pratiquer sa religion.",
    "Autour de notre imam et avec l’implication des membres de la commission, nous souhaitons faire de la mosquée un véritable lieu de prière, de transmission, d’apprentissage, de conseil et de fraternité, accessible à toutes les générations.",
  ],
  imam: {
    title: "Un imam au service des fidèles et de la transmission",
    paragraphs: [
      "La mosquée El Houda bénéficie de l’accompagnement d’un imam expérimenté, disposant de solides connaissances religieuses et d’une expérience dans l’enseignement et la formation.",
      "Au-delà de la conduite des prières et des missions traditionnellement attachées à l’imamat, son rôle est également celui de la transmission et de l’accompagnement. Par les sermons, les cours, les rappels, les formations et les différents temps d’échange proposés au sein de la mosquée, notre imam contribue à rendre la connaissance religieuse accessible au plus grand nombre. Cette présence régulière permet également aux fidèles de trouver au sein de leur mosquée un interlocuteur pour les accompagner dans leur apprentissage et répondre, dans le cadre de ses compétences, aux interrogations liées à la pratique religieuse.",
    ],
  },
  lessons: {
    title: "Des cours et des rappels tout au long de la semaine",
    paragraphs: [
      "La transmission de la connaissance ne se limite pas au sermon du vendredi. Des dourous, rappels et temps d’enseignement sont proposés au cours de la semaine ainsi que durant les week-ends, afin que chacun puisse trouver des occasions d’apprendre et d’approfondir progressivement ses connaissances.",
      "Ces rendez-vous abordent différents domaines fondamentaux de la connaissance islamique et sont organisés de manière accessible, afin de permettre à chacun d’y participer selon son niveau.",
    ],
  },
  domains: [
    {
      key: "quran",
      title: "Apprendre à mieux lire et réciter le Coran",
      paragraphs: [
        "Une attention particulière est accordée au Saint Coran. Des enseignements et formations sont proposés afin d’aider les fidèles à améliorer leur lecture et leur récitation, à corriger certaines erreurs et à progresser dans l’apprentissage des règles nécessaires à une récitation correcte.",
        "L’objectif est d’accompagner chacun progressivement, quel que soit son niveau de départ, et de renforcer le lien du fidèle avec le Livre d’Allah.",
      ],
    },
    {
      key: "fiqh",
      title: "Comprendre sa pratique religieuse",
      paragraphs: [
        "La Commission Culte souhaite également permettre aux fidèles de mieux comprendre les actes qui rythment leur vie religieuse. Des cours de jurisprudence islamique (fiqh) permettent ainsi d’aborder de manière pédagogique les questions relatives notamment à la purification, à la prière, au jeûne et aux autres pratiques de la vie quotidienne.",
        "L’objectif est de transmettre des connaissances utiles et accessibles, afin que chacun puisse pratiquer sa religion avec davantage de compréhension et de sérénité.",
      ],
    },
    {
      key: "sira",
      title: "Découvrir la Sîra et les enseignements du Hadith",
      paragraphs: [
        "La connaissance de la religion passe également par la découverte de la vie et des enseignements du Prophète ﷺ. Des cours consacrés à la Sîra, la biographie prophétique, permettent de découvrir les différentes étapes de sa vie, son comportement, ses enseignements et les leçons que le croyant peut en tirer.",
        "L’étude du Hadith vient compléter cet enseignement en permettant aux fidèles de découvrir et de mieux comprendre les paroles, les enseignements et la tradition prophétique. Ces différents domaines sont abordés dans une démarche pédagogique : apprendre, comprendre et pouvoir mettre en pratique les enseignements acquis dans la vie quotidienne.",
      ],
    },
  ],
  moments: {
    title: "Une mosquée présente dans les grands moments de l’année",
    text: "La Commission Culte organise et accompagne également les différents temps forts qui rythment la vie religieuse de notre communauté. Ces moments constituent à la fois des temps de spiritualité, de rassemblement et de fraternité. Une attention particulière est portée à leur organisation afin d’accueillir les fidèles dans les meilleures conditions possibles.",
    items: [
      "Les prières quotidiennes",
      "La prière du vendredi",
      "Le mois de Ramadan",
      "Les prières nocturnes",
      "Les fêtes de l’Aïd",
      "Les rendez-vous et événements cultuels de l’année",
    ],
  },
  close: {
    title: "Une mosquée proche de ses fidèles",
    paragraphs: [
      "Notre ambition est que la mosquée El Houda ne soit pas uniquement un lieu dans lequel on vient accomplir une prière avant de repartir. Nous souhaitons qu’elle soit également un lieu vivant de connaissance, de transmission, d’écoute et de rencontre, dans lequel chacun puisse progresser à son rythme.",
      "Jeunes, adultes, personnes débutantes ou souhaitant approfondir leurs connaissances doivent pouvoir trouver des enseignements adaptés et des occasions régulières d’apprendre.",
    ],
  },
  mission: {
    title: "Prier, apprendre, comprendre et transmettre",
    paragraphs: [
      "À travers sa Commission Culte, l’Association El Houda poursuit une ambition simple : accompagner les fidèles dans leur vie religieuse et leur permettre d’accéder à une connaissance authentique, structurée et accessible. Prières, sermons, dourous, apprentissage et récitation du Coran, jurisprudence, Sîra, Hadith, rappels et formations constituent autant de moyens de faire vivre cette mission tout au long de l’année.",
      "Parce qu’une mosquée est à la fois un lieu de prière, de connaissance, de transmission et de fraternité, la Commission Culte et l’imam de la mosquée El Houda œuvrent ensemble afin que chacun puisse y trouver sa place et avancer dans son apprentissage.",
    ],
    signature: "Mosquée El Houda – Prier, apprendre, comprendre et transmettre",
  },
};

const en: Worship = {
  eyebrow: "Worship Committee",
  title: "Praying, learning and growing in knowledge",
  intro: [
    "The Worship Committee of the El Houda Association holds a central place in the life of our mosque. Its mission is to organise and support religious activities, and also to help everyone know, understand and practise their religion better.",
    "Around our imam, and with the involvement of the committee members, we want to make the mosque a true place of prayer, transmission, learning, counsel and brotherhood, open to every generation.",
  ],
  imam: {
    title: "An imam serving the faithful and the transmission of knowledge",
    paragraphs: [
      "El Houda Mosque benefits from the guidance of an experienced imam with solid religious knowledge and experience in teaching and training.",
      "Beyond leading the prayers and the duties traditionally attached to the imamate, his role is also one of transmission and guidance. Through sermons, lessons, reminders, training sessions and the various moments of exchange offered at the mosque, our imam helps make religious knowledge accessible to as many people as possible. His regular presence also means the faithful can find, within their own mosque, someone to support them in their learning and to answer, within the scope of his expertise, their questions about religious practice.",
    ],
  },
  lessons: {
    title: "Lessons and reminders throughout the week",
    paragraphs: [
      "The transmission of knowledge is not limited to the Friday sermon. Durus, reminders and teaching sessions are offered during the week and at weekends, so that everyone can find opportunities to learn and gradually deepen their knowledge.",
      "These sessions cover several fundamental fields of Islamic knowledge and are organised in an accessible way, so that everyone can take part according to their level.",
    ],
  },
  domains: [
    {
      key: "quran",
      title: "Learning to read and recite the Qur’an better",
      paragraphs: [
        "Particular attention is given to the Holy Qur’an. Lessons and training are offered to help the faithful improve their reading and recitation, correct certain mistakes and progress in learning the rules needed for correct recitation.",
        "The aim is to support everyone step by step, whatever their starting level, and to strengthen the bond between the believer and the Book of Allah.",
      ],
    },
    {
      key: "fiqh",
      title: "Understanding your religious practice",
      paragraphs: [
        "The Worship Committee also wants to help the faithful better understand the acts that shape their religious life. Lessons in Islamic jurisprudence (fiqh) address, in an educational way, questions relating in particular to purification, prayer, fasting and other practices of daily life.",
        "The aim is to pass on useful and accessible knowledge, so that everyone can practise their religion with greater understanding and serenity.",
      ],
    },
    {
      key: "sira",
      title: "Discovering the Sira and the teachings of the Hadith",
      paragraphs: [
        "Knowledge of the religion also comes through discovering the life and teachings of the Prophet ﷺ. Lessons devoted to the Sira, the prophetic biography, explore the different stages of his life, his conduct, his teachings and the lessons the believer can draw from them.",
        "The study of Hadith completes this teaching by helping the faithful discover and better understand the sayings, teachings and prophetic tradition. These fields are approached in an educational spirit: to learn, to understand and to be able to put what has been learned into practice in daily life.",
      ],
    },
  ],
  moments: {
    title: "A mosque present at the great moments of the year",
    text: "The Worship Committee also organises and supports the highlights that mark the religious life of our community. These moments are times of spirituality, gathering and brotherhood. Particular care is taken in their organisation in order to welcome the faithful in the best possible conditions.",
    items: [
      "The daily prayers",
      "The Friday prayer",
      "The month of Ramadan",
      "The night prayers",
      "The Eid celebrations",
      "The religious gatherings and events of the year",
    ],
  },
  close: {
    title: "A mosque close to its faithful",
    paragraphs: [
      "Our ambition is for El Houda Mosque to be more than a place where people come to pray and then leave. We want it to also be a living place of knowledge, transmission, listening and encounter, where everyone can progress at their own pace.",
      "Young people, adults, beginners and those wishing to deepen their knowledge should all be able to find suitable teaching and regular opportunities to learn.",
    ],
  },
  mission: {
    title: "Praying, learning, understanding and passing on",
    paragraphs: [
      "Through its Worship Committee, the El Houda Association pursues a simple ambition: to support the faithful in their religious life and give them access to authentic, structured and accessible knowledge. Prayers, sermons, durus, learning and reciting the Qur’an, jurisprudence, Sira, Hadith, reminders and training are all ways of bringing this mission to life throughout the year.",
      "Because a mosque is at once a place of prayer, knowledge, transmission and brotherhood, the Worship Committee and the imam of El Houda Mosque work together so that everyone can find their place there and progress in their learning.",
    ],
    signature: "El Houda Mosque – Praying, learning, understanding and passing on",
  },
};

const de: Worship = {
  eyebrow: "Kommission für Gottesdienst",
  title: "Beten, lernen und im Wissen wachsen",
  intro: [
    "Die Kommission für Gottesdienst des Vereins El Houda nimmt einen zentralen Platz im Leben unserer Moschee ein. Ihre Aufgabe ist es, die religiösen Aktivitäten zu organisieren und zu begleiten, aber auch jedem zu ermöglichen, seine Religion besser kennenzulernen, zu verstehen und zu praktizieren.",
    "Rund um unseren Imam und mit dem Engagement der Kommissionsmitglieder möchten wir die Moschee zu einem echten Ort des Gebets, der Weitergabe, des Lernens, der Beratung und der Brüderlichkeit machen, offen für alle Generationen.",
  ],
  imam: {
    title: "Ein Imam im Dienst der Gläubigen und der Wissensvermittlung",
    paragraphs: [
      "Die Moschee El Houda wird von einem erfahrenen Imam begleitet, der über fundierte religiöse Kenntnisse sowie Erfahrung in Unterricht und Ausbildung verfügt.",
      "Über das Leiten der Gebete und die traditionell mit dem Imamat verbundenen Aufgaben hinaus besteht seine Rolle auch in der Weitergabe von Wissen und in der Begleitung. Durch Predigten, Unterricht, Erinnerungen, Schulungen und die verschiedenen Gesprächsangebote in der Moschee trägt unser Imam dazu bei, religiöses Wissen möglichst vielen Menschen zugänglich zu machen. Seine regelmäßige Anwesenheit ermöglicht es den Gläubigen zudem, in ihrer Moschee einen Ansprechpartner zu finden, der sie beim Lernen begleitet und im Rahmen seiner Kompetenzen Fragen zur religiösen Praxis beantwortet.",
    ],
  },
  lessons: {
    title: "Unterricht und Erinnerungen die ganze Woche über",
    paragraphs: [
      "Die Weitergabe von Wissen beschränkt sich nicht auf die Freitagspredigt. Durus, Erinnerungen und Unterrichtseinheiten werden unter der Woche und an den Wochenenden angeboten, damit jeder Gelegenheiten findet, zu lernen und sein Wissen Schritt für Schritt zu vertiefen.",
      "Diese Termine behandeln verschiedene grundlegende Bereiche des islamischen Wissens und sind verständlich gestaltet, damit jeder entsprechend seinem Niveau teilnehmen kann.",
    ],
  },
  domains: [
    {
      key: "quran",
      title: "Den Koran besser lesen und rezitieren lernen",
      paragraphs: [
        "Besondere Aufmerksamkeit gilt dem Heiligen Koran. Unterricht und Schulungen helfen den Gläubigen, ihr Lesen und ihre Rezitation zu verbessern, bestimmte Fehler zu korrigieren und beim Erlernen der Regeln für eine korrekte Rezitation Fortschritte zu machen.",
        "Ziel ist es, jeden unabhängig von seinem Ausgangsniveau schrittweise zu begleiten und die Verbindung des Gläubigen zum Buch Allahs zu stärken.",
      ],
    },
    {
      key: "fiqh",
      title: "Die eigene religiöse Praxis verstehen",
      paragraphs: [
        "Die Kommission für Gottesdienst möchte den Gläubigen auch helfen, die Handlungen, die ihr religiöses Leben prägen, besser zu verstehen. Unterricht in islamischer Rechtswissenschaft (Fiqh) behandelt auf pädagogische Weise insbesondere Fragen der rituellen Reinigung, des Gebets, des Fastens und weiterer Praktiken des Alltags.",
        "Ziel ist es, nützliches und verständliches Wissen zu vermitteln, damit jeder seine Religion mit mehr Verständnis und Gelassenheit praktizieren kann.",
      ],
    },
    {
      key: "sira",
      title: "Die Sira und die Lehren des Hadith entdecken",
      paragraphs: [
        "Das Wissen über die Religion umfasst auch die Entdeckung des Lebens und der Lehren des Propheten ﷺ. Unterricht über die Sira, die Prophetenbiografie, stellt die verschiedenen Abschnitte seines Lebens, sein Verhalten, seine Lehren und die Lehren vor, die der Gläubige daraus ziehen kann.",
        "Das Studium des Hadith ergänzt diesen Unterricht, indem es den Gläubigen ermöglicht, die Aussprüche, Lehren und die prophetische Tradition zu entdecken und besser zu verstehen. Diese Bereiche werden pädagogisch behandelt: lernen, verstehen und das Gelernte im Alltag umsetzen können.",
      ],
    },
  ],
  moments: {
    title: "Eine Moschee, die in den großen Momenten des Jahres präsent ist",
    text: "Die Kommission für Gottesdienst organisiert und begleitet auch die Höhepunkte, die das religiöse Leben unserer Gemeinschaft prägen. Diese Momente sind zugleich Zeiten der Spiritualität, der Zusammenkunft und der Brüderlichkeit. Ihrer Organisation wird besondere Aufmerksamkeit geschenkt, um die Gläubigen unter bestmöglichen Bedingungen zu empfangen.",
    items: [
      "Die täglichen Gebete",
      "Das Freitagsgebet",
      "Der Monat Ramadan",
      "Die Nachtgebete",
      "Die Eid-Feste",
      "Die religiösen Termine und Veranstaltungen des Jahres",
    ],
  },
  close: {
    title: "Eine Moschee nah bei ihren Gläubigen",
    paragraphs: [
      "Unser Anspruch ist, dass die Moschee El Houda nicht nur ein Ort ist, an den man zum Beten kommt und wieder geht. Wir möchten, dass sie auch ein lebendiger Ort des Wissens, der Weitergabe, des Zuhörens und der Begegnung ist, an dem jeder in seinem eigenen Tempo vorankommen kann.",
      "Jugendliche, Erwachsene, Anfänger und alle, die ihr Wissen vertiefen möchten, sollen passenden Unterricht und regelmäßige Gelegenheiten zum Lernen finden.",
    ],
  },
  mission: {
    title: "Beten, lernen, verstehen und weitergeben",
    paragraphs: [
      "Mit seiner Kommission für Gottesdienst verfolgt der Verein El Houda ein einfaches Ziel: die Gläubigen in ihrem religiösen Leben zu begleiten und ihnen Zugang zu authentischem, strukturiertem und verständlichem Wissen zu geben. Gebete, Predigten, Durus, das Erlernen und Rezitieren des Korans, Rechtswissenschaft, Sira, Hadith, Erinnerungen und Schulungen sind Wege, diese Aufgabe das ganze Jahr über mit Leben zu füllen.",
      "Weil eine Moschee zugleich ein Ort des Gebets, des Wissens, der Weitergabe und der Brüderlichkeit ist, arbeiten die Kommission für Gottesdienst und der Imam der Moschee El Houda zusammen, damit jeder dort seinen Platz findet und beim Lernen vorankommt.",
    ],
    signature: "Moschee El Houda – Beten, lernen, verstehen und weitergeben",
  },
};

const ar: Worship = {
  eyebrow: "لجنة الشؤون الدينية",
  title: "نصلّي، نتعلّم، ونرتقي في طلب العلم",
  intro: [
    "تحتلّ لجنة الشؤون الدينية في جمعية الهدى مكانة محورية في حياة مسجدنا. ومهمّتها تنظيم الأنشطة الدينية ومواكبتها، وكذلك تمكين كل فرد من معرفة دينه وفهمه وممارسته على نحو أفضل.",
    "حول إمامنا، وبمشاركة أعضاء اللجنة، نطمح إلى أن يكون المسجد مكانًا حقيقيًا للصلاة ونقل العلم والتعلّم والنصح والأخوّة، مفتوحًا لجميع الأجيال.",
  ],
  imam: {
    title: "إمام في خدمة المصلّين ونقل العلم",
    paragraphs: [
      "يحظى مسجد الهدى بمرافقة إمام ذي خبرة، يتمتّع بمعارف دينية متينة وبتجربة في التعليم والتكوين.",
      "إلى جانب إمامة الصلوات والمهام المرتبطة تقليديًا بالإمامة، يتمثّل دوره أيضًا في نقل العلم والمرافقة. فمن خلال الخطب والدروس والتذكيرات والدورات التكوينية ومختلف أوقات التبادل التي يقترحها المسجد، يساهم إمامنا في جعل العلم الشرعي في متناول أكبر عدد من الناس. كما يتيح هذا الحضور المنتظم للمصلّين أن يجدوا في مسجدهم من يرافقهم في تعلّمهم ويجيب، في حدود اختصاصه، عن تساؤلاتهم المتعلقة بالممارسة الدينية.",
    ],
  },
  lessons: {
    title: "دروس وتذكيرات طوال الأسبوع",
    paragraphs: [
      "لا يقتصر نقل العلم على خطبة الجمعة. إذ تُقدَّم دروس وتذكيرات وحصص تعليمية خلال أيام الأسبوع وفي عطل نهاية الأسبوع، حتى يجد كل فرد فرصًا للتعلّم وتعميق معارفه تدريجيًا.",
      "تتناول هذه اللقاءات مجالات أساسية مختلفة من العلوم الإسلامية، وتُنظَّم بأسلوب ميسَّر يتيح لكل فرد المشاركة فيها حسب مستواه.",
    ],
  },
  domains: [
    {
      key: "quran",
      title: "تحسين قراءة القرآن الكريم وتلاوته",
      paragraphs: [
        "يحظى القرآن الكريم بعناية خاصة. إذ تُقدَّم دروس ودورات لمساعدة المصلّين على تحسين قراءتهم وتلاوتهم، وتصحيح بعض الأخطاء، والتقدّم في تعلّم الأحكام اللازمة للتلاوة الصحيحة.",
        "والهدف هو مرافقة كل فرد خطوة بخطوة، مهما كان مستواه في البداية، وتقوية صلة المؤمن بكتاب الله.",
      ],
    },
    {
      key: "fiqh",
      title: "فهم الممارسة الدينية",
      paragraphs: [
        "تسعى لجنة الشؤون الدينية أيضًا إلى تمكين المصلّين من فهم أفضل للعبادات التي تنتظم بها حياتهم الدينية. فدروس الفقه الإسلامي تتناول بأسلوب تربوي المسائل المتعلقة خصوصًا بالطهارة والصلاة والصيام وسائر ممارسات الحياة اليومية.",
        "والهدف هو نقل معارف نافعة وميسَّرة، حتى يتمكّن كل فرد من ممارسة دينه بمزيد من الفهم والطمأنينة.",
      ],
    },
    {
      key: "sira",
      title: "التعرّف على السيرة النبوية وتعاليم الحديث",
      paragraphs: [
        "تمرّ معرفة الدين أيضًا عبر التعرّف على حياة النبي ﷺ وتعاليمه. فالدروس المخصّصة للسيرة النبوية تتيح التعرّف على مختلف مراحل حياته وأخلاقه وتعاليمه والعِبر التي يمكن للمؤمن أن يستخلصها منها.",
        "وتأتي دراسة الحديث لتكمّل هذا التعليم، إذ تتيح للمصلّين التعرّف على الأقوال والتعاليم والسنّة النبوية وفهمها فهمًا أفضل. وتُتناول هذه المجالات بمنهج تربوي: التعلّم، والفهم، والقدرة على تطبيق ما اكتُسب في الحياة اليومية.",
      ],
    },
  ],
  moments: {
    title: "مسجد حاضر في المحطات الكبرى من السنة",
    text: "تنظّم لجنة الشؤون الدينية أيضًا مختلف المناسبات البارزة التي تنتظم بها الحياة الدينية لمجتمعنا وتواكبها. وهذه اللحظات أوقات للروحانية والاجتماع والأخوّة في آن واحد. ويُولى تنظيمها عناية خاصة لاستقبال المصلّين في أفضل الظروف الممكنة.",
    items: [
      "الصلوات اليومية",
      "صلاة الجمعة",
      "شهر رمضان",
      "صلوات الليل",
      "عيدا الفطر والأضحى",
      "المواعيد والمناسبات الدينية خلال السنة",
    ],
  },
  close: {
    title: "مسجد قريب من روّاده",
    paragraphs: [
      "طموحنا ألّا يكون مسجد الهدى مجرد مكان يُؤتى إليه لأداء الصلاة ثم يُغادَر. بل نريده أيضًا فضاءً حيًّا للعلم ونقل المعرفة والإصغاء واللقاء، يتقدّم فيه كل فرد حسب وتيرته.",
      "ينبغي أن يجد الشباب والكبار، والمبتدئون ومن يرغبون في تعميق معارفهم، تعليمًا ملائمًا وفرصًا منتظمة للتعلّم.",
    ],
  },
  mission: {
    title: "نصلّي، نتعلّم، نفهم، وننقل العلم",
    paragraphs: [
      "من خلال لجنة الشؤون الدينية، تسعى جمعية الهدى إلى غاية بسيطة: مرافقة المصلّين في حياتهم الدينية وتمكينهم من الوصول إلى علم أصيل ومنظَّم وميسَّر. فالصلوات والخطب والدروس وتعلّم القرآن وتلاوته والفقه والسيرة والحديث والتذكيرات والدورات التكوينية، كلّها وسائل لإحياء هذه المهمّة طوال السنة.",
      "ولأن المسجد مكان للصلاة والعلم ونقل المعرفة والأخوّة في آن واحد، تعمل لجنة الشؤون الدينية وإمام مسجد الهدى معًا حتى يجد فيه كل فرد مكانه ويتقدّم في تعلّمه.",
    ],
    signature: "مسجد الهدى – نصلّي، نتعلّم، نفهم، وننقل العلم",
  },
};

export const WORSHIP: Localized<Worship> = { fr, en, de, ar };
