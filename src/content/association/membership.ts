import type { Localized } from "@/content/localized";

// Membership: alhouda.org text + internal rules (art. 4), in the site's 4 languages.
const fr = {
  title: "L’adhésion à la mosquée",
  lead: [
    "Adhérer à l’Association Al-Houda d’Illzach, c’est s’engager auprès de toute la communauté musulmane de la ville et œuvrer pour le vivre ensemble.",
    "L’objet de l’Association est d’organiser la pratique du culte musulman, de favoriser l’apprentissage et le partage de l’Islam, et d’engager le dialogue avec les autres communautés religieuses et les institutions publiques.",
  ],
  photoAlt: "Mosquée Al-Houda, Illzach",
  fee: {
    amount: "10 €",
    period: "par mois",
    note: "Montant fixé par le Conseil d’Administration et approuvé par l’Assemblée Générale, du 1er janvier au 31 décembre.",
  },
  frequencies: [
    { label: "Mensuelle", detail: "Acquise du 1er au dernier jour du mois" },
    { label: "Trimestrielle", detail: "Avant le 31 mars, 30 juin, 30 septembre, 31 décembre" },
    { label: "Semestrielle", detail: "Avant le 30 juin et le 31 décembre" },
    { label: "Annuelle", detail: "Avant le 31 décembre de l’année en cours" },
  ],
  payment: ["Virement", "Chèque", "Carte bancaire", "Espèces"],
  paymentNote:
    "Pour un paiement en espèces ou par carte, une décharge vous est remise. Pour un virement, indiquez votre nom : un versement anonyme ne peut pas être rattaché à un adhérent.",
  taxNote:
    "Une attestation de versement est délivrée chaque année en février, pour votre déclaration fiscale de l’année écoulée.",
  conditions: [
    "Être majeur et résider dans la région mulhousienne",
    "Adhérer aux statuts et au règlement intérieur de l’association",
    "Adresser une demande écrite au Conseil d’Administration, qui prononce l’admission",
  ],
  active: [
    "Être à jour de ses cotisations",
    "Fréquenter régulièrement la mosquée",
    "Manifester la volonté d’œuvrer pour la mosquée",
  ],
  activeNote:
    "L’adhérent actif participe aux Assemblées Générales et vote. Après 12 mois de cotisation régulière, il peut se présenter aux élections du Conseil d’Administration.",
};

type Membership = typeof fr;

const en: Membership = {
  title: "Becoming a member of the mosque",
  lead: [
    "Joining the Association Al-Houda of Illzach means committing to the whole Muslim community of the town and working for living together.",
    "The purpose of the Association is to organise the practice of the Muslim faith, to encourage learning about and sharing Islam, and to engage in dialogue with other religious communities and public institutions.",
  ],
  photoAlt: "Al-Houda Mosque, Illzach",
  fee: {
    amount: "€10",
    period: "per month",
    note: "Amount set by the Board of Directors and approved by the General Assembly, from 1 January to 31 December.",
  },
  frequencies: [
    { label: "Monthly", detail: "Covers the 1st to the last day of the month" },
    { label: "Quarterly", detail: "Before 31 March, 30 June, 30 September, 31 December" },
    { label: "Half-yearly", detail: "Before 30 June and 31 December" },
    { label: "Annual", detail: "Before 31 December of the current year" },
  ],
  payment: ["Bank transfer", "Cheque", "Bank card", "Cash"],
  paymentNote:
    "For payments in cash or by card, you will be given a receipt. For bank transfers, please give your name: an anonymous payment cannot be linked to a member.",
  taxNote:
    "A certificate of payment is issued every February for your tax return for the previous year.",
  conditions: [
    "Be an adult and live in the Mulhouse area",
    "Adhere to the association's statutes and internal rules",
    "Send a written application to the Board of Directors, which decides on admission",
  ],
  active: [
    "Be up to date with your membership fees",
    "Attend the mosque regularly",
    "Show the will to work for the mosque",
  ],
  activeNote:
    "Active members take part in General Assemblies and vote. After 12 months of regular payments, they can stand in the elections for the Board of Directors.",
};

const de: Membership = {
  title: "Mitglied der Moschee werden",
  lead: [
    "Wer der Association Al-Houda in Illzach beitritt, engagiert sich für die gesamte muslimische Gemeinschaft der Stadt und setzt sich für das Miteinander ein.",
    "Zweck des Vereins ist es, die Ausübung des muslimischen Glaubens zu organisieren, das Lernen und Teilen des Islam zu fördern und den Dialog mit anderen Religionsgemeinschaften und öffentlichen Institutionen zu pflegen.",
  ],
  photoAlt: "Moschee Al-Houda, Illzach",
  fee: {
    amount: "10 €",
    period: "pro Monat",
    note: "Vom Vorstand festgelegter und von der Mitgliederversammlung genehmigter Betrag, vom 1. Januar bis 31. Dezember.",
  },
  frequencies: [
    { label: "Monatlich", detail: "Gilt vom 1. bis zum letzten Tag des Monats" },
    { label: "Vierteljährlich", detail: "Vor dem 31. März, 30. Juni, 30. September, 31. Dezember" },
    { label: "Halbjährlich", detail: "Vor dem 30. Juni und dem 31. Dezember" },
    { label: "Jährlich", detail: "Vor dem 31. Dezember des laufenden Jahres" },
  ],
  payment: ["Überweisung", "Scheck", "Bankkarte", "Bar"],
  paymentNote:
    "Bei Zahlung in bar oder mit Karte erhalten Sie eine Quittung. Bei Überweisungen geben Sie bitte Ihren Namen an: Eine anonyme Zahlung kann keinem Mitglied zugeordnet werden.",
  taxNote:
    "Jedes Jahr im Februar wird eine Zahlungsbescheinigung für Ihre Steuererklärung des Vorjahres ausgestellt.",
  conditions: [
    "Volljährig sein und in der Region Mulhouse wohnen",
    "Der Satzung und der Hausordnung des Vereins zustimmen",
    "Einen schriftlichen Antrag an den Vorstand richten, der über die Aufnahme entscheidet",
  ],
  active: [
    "Die Beiträge vollständig bezahlt haben",
    "Die Moschee regelmäßig besuchen",
    "Den Willen zeigen, sich für die Moschee einzusetzen",
  ],
  activeNote:
    "Aktive Mitglieder nehmen an den Mitgliederversammlungen teil und stimmen ab. Nach 12 Monaten regelmäßiger Beitragszahlung können sie bei den Vorstandswahlen kandidieren.",
};

const ar: Membership = {
  title: "الانخراط في المسجد",
  lead: [
    "الانخراط في جمعية الهدى بإلزاك يعني الالتزام إلى جانب كل المجتمع المسلم في المدينة والعمل من أجل العيش المشترك.",
    "تهدف الجمعية إلى تنظيم ممارسة الشعائر الإسلامية، وتشجيع تعلّم الإسلام والتعريف به، وإقامة الحوار مع الطوائف الدينية الأخرى والمؤسسات العمومية.",
  ],
  photoAlt: "مسجد الهدى، إلزاك",
  fee: {
    amount: "10 €",
    period: "شهريًا",
    note: "مبلغ يحدّده مجلس الإدارة وتصادق عليه الجمعية العامة، من 1 يناير إلى 31 ديسمبر.",
  },
  frequencies: [
    { label: "شهري", detail: "يغطي الفترة من اليوم الأول إلى آخر يوم في الشهر" },
    { label: "فصلي", detail: "قبل 31 مارس و30 يونيو و30 سبتمبر و31 ديسمبر" },
    { label: "نصف سنوي", detail: "قبل 30 يونيو و31 ديسمبر" },
    { label: "سنوي", detail: "قبل 31 ديسمبر من السنة الجارية" },
  ],
  payment: ["تحويل مصرفي", "شيك", "بطاقة مصرفية", "نقدًا"],
  paymentNote:
    "عند الدفع نقدًا أو بالبطاقة، يُسلَّم لكم وصل. وعند التحويل المصرفي، يرجى ذكر اسمكم: لا يمكن ربط دفعة مجهولة الهوية بأي عضو.",
  taxNote: "تُسلَّم كل سنة في شهر فبراير شهادة دفع لتصريحكم الضريبي عن السنة المنقضية.",
  conditions: [
    "أن يكون راشدًا ومقيمًا في منطقة مولوز",
    "الالتزام بالنظام الأساسي والنظام الداخلي للجمعية",
    "تقديم طلب كتابي إلى مجلس الإدارة الذي يقرّر القبول",
  ],
  active: [
    "أن يكون مسدّدًا لاشتراكاته",
    "أن يرتاد المسجد بانتظام",
    "أن يُبدي رغبة في العمل من أجل المسجد",
  ],
  activeNote:
    "يشارك العضو النشيط في الجمعيات العامة ويصوّت. وبعد 12 شهرًا من الاشتراك المنتظم، يمكنه الترشح لانتخابات مجلس الإدارة.",
};

export const MEMBERSHIP: Localized<Membership> = { fr, en, de, ar };
export const MEMBERSHIP_PHOTO = "/images/association/mosque-building.png";
