import type { Localized } from "@/content/localized";

// "Le mot du Président" (alhouda.org), in the site's 4 languages.
const fr = {
  title: "Le mot du Président de l’association",
  paragraphs: [
    "En ma qualité de Président de l’association de la Mosquée Al-Houda, je tiens à rappeler que notre engagement repose avant tout sur une ambition essentielle : rassembler notre communauté dans un esprit de fraternité, de respect et de vivre-ensemble.",
    "Notre association œuvre chaque jour pour transmettre et faire vivre les valeurs fondamentales de l’Islam, fondées sur la tolérance, la paix, le partage et la solidarité, afin qu’elles puissent éclairer aussi bien les fidèles que l’ensemble de la société. Nous nous attachons également à faire connaître les bienfaits de notre religion à travers des actions pédagogiques, cultuelles et spirituelles, accessibles à tous.",
    "La mosquée est ainsi un lieu de recueillement mais aussi de transmission, où les pratiques cultuelles sont organisées avec rigueur et sérénité, dans le respect des principes religieux et des lois de la République. Une place particulière est accordée à l’enseignement du Coran, ouvert à tous les publics, enfants comme adultes, afin de permettre à chacun de progresser dans sa connaissance et sa spiritualité. Par ailleurs, nous avons à cœur de renforcer nos liens avec notre environnement local en travaillant en étroite collaboration avec l’ensemble des acteurs du territoire, notamment la Mairie d’Illzach, ainsi que les associations et institutions partenaires.",
    "À travers cette dynamique d’ouverture et de coopération, notre association entend contribuer activement à la cohésion sociale et au développement d’un dialogue constructif, au service du bien commun.",
  ],
  quote:
    "Rassembler notre communauté dans un esprit de fraternité, de respect et de vivre-ensemble.",
  signature: { role: "Le Président", name: "A. Zediri" },
};

type Editorial = typeof fr;

const en: Editorial = {
  title: "A word from the President of the association",
  paragraphs: [
    "As President of the association of the Al-Houda Mosque, I would like to recall that our commitment rests above all on one essential ambition: bringing our community together in a spirit of brotherhood, respect and living together.",
    "Every day, our association works to pass on and bring to life the fundamental values of Islam, founded on tolerance, peace, sharing and solidarity, so that they can enlighten both the worshippers and society as a whole. We are also committed to making the benefits of our religion known through educational, religious and spiritual activities that are open to everyone.",
    "The mosque is thus a place of contemplation but also of transmission, where religious practices are organised with rigour and serenity, in respect of religious principles and the laws of the Republic. Special importance is given to the teaching of the Qur'an, open to all, children and adults alike, so that everyone can grow in knowledge and spirituality. We are also keen to strengthen our ties with our local community by working closely with all local stakeholders, in particular the Illzach town hall, as well as partner associations and institutions.",
    "Through this spirit of openness and cooperation, our association intends to contribute actively to social cohesion and to the development of a constructive dialogue, for the common good.",
  ],
  quote: "Bringing our community together in a spirit of brotherhood, respect and living together.",
  signature: { role: "The President", name: "A. Zediri" },
};

const de: Editorial = {
  title: "Ein Wort des Vorsitzenden des Vereins",
  paragraphs: [
    "Als Vorsitzender des Vereins der Moschee Al-Houda möchte ich daran erinnern, dass unser Engagement vor allem auf einem zentralen Anliegen beruht: unsere Gemeinschaft im Geist der Brüderlichkeit, des Respekts und des Miteinanders zusammenzubringen.",
    "Unser Verein setzt sich jeden Tag dafür ein, die grundlegenden Werte des Islam – Toleranz, Frieden, Teilen und Solidarität – weiterzugeben und mit Leben zu füllen, damit sie sowohl den Gläubigen als auch der gesamten Gesellschaft Orientierung geben. Wir möchten außerdem die guten Seiten unserer Religion durch pädagogische, religiöse und spirituelle Angebote bekannt machen, die allen offenstehen.",
    "Die Moschee ist daher ein Ort der Einkehr, aber auch der Weitergabe, an dem die religiösen Praktiken mit Sorgfalt und Gelassenheit organisiert werden, unter Achtung der religiösen Grundsätze und der Gesetze der Republik. Besondere Bedeutung hat der Koranunterricht, der allen offensteht, Kindern wie Erwachsenen, damit jeder in seinem Wissen und seiner Spiritualität wachsen kann. Zudem liegt uns viel daran, unsere Verbindungen zu unserem lokalen Umfeld zu stärken, in enger Zusammenarbeit mit allen Akteuren vor Ort, insbesondere dem Rathaus von Illzach sowie den Partnervereinen und -institutionen.",
    "Mit dieser Offenheit und Zusammenarbeit möchte unser Verein aktiv zum gesellschaftlichen Zusammenhalt und zu einem konstruktiven Dialog im Dienst des Gemeinwohls beitragen.",
  ],
  quote:
    "Unsere Gemeinschaft im Geist der Brüderlichkeit, des Respekts und des Miteinanders zusammenbringen.",
  signature: { role: "Der Vorsitzende", name: "A. Zediri" },
};

const ar: Editorial = {
  title: "كلمة رئيس الجمعية",
  paragraphs: [
    "بصفتي رئيسًا لجمعية مسجد الهدى، أودّ التذكير بأن التزامنا يقوم قبل كل شيء على طموح أساسي: جمع مجتمعنا بروح من الأخوّة والاحترام والعيش المشترك.",
    "تعمل جمعيتنا كل يوم على نقل القيم الأساسية للإسلام وإحيائها، القائمة على التسامح والسلام والتقاسم والتضامن، حتى تنير المصلين والمجتمع بأسره. كما نحرص على التعريف بمحاسن ديننا من خلال أنشطة تربوية ودينية وروحية مفتوحة للجميع.",
    "فالمسجد مكان للسكينة والتأمل، وأيضًا مكان لنقل المعرفة، تُنظَّم فيه الممارسات الدينية بدقة وطمأنينة، في احترام للمبادئ الدينية ولقوانين الجمهورية. ويحظى تعليم القرآن بمكانة خاصة، وهو مفتوح للجميع، صغارًا وكبارًا، حتى يتمكن كل واحد من التقدم في معرفته وروحانيته. كما نحرص على تعزيز روابطنا مع محيطنا المحلي من خلال العمل بتعاون وثيق مع جميع الفاعلين في المنطقة، ولا سيما بلدية إلزاك، وكذلك الجمعيات والمؤسسات الشريكة.",
    "ومن خلال روح الانفتاح والتعاون هذه، تسعى جمعيتنا إلى المساهمة الفعّالة في التماسك الاجتماعي وتطوير حوار بنّاء في خدمة الصالح العام.",
  ],
  quote: "جمع مجتمعنا بروح من الأخوّة والاحترام والعيش المشترك.",
  signature: { role: "الرئيس", name: "A. Zediri" },
};

export const EDITORIAL: Localized<Editorial> = { fr, en, de, ar };
export const EDITORIAL_PHOTO = "/images/association/president.jpg";
