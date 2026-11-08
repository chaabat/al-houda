import type { Localized } from "@/content/localized";

// "Notre association" overview, based on the statutes, in the site's 4 languages.
const fr = {
  intro:
    "Fondée à Illzach le 5 juin 1993, l’Association Al-Houda gère la mosquée Al-Houda dans un cadre exclusivement cultuel. Elle est autonome, indépendante de tout courant ou parti, et poursuit un but non lucratif.",
  facts: [
    { label: "Fondée en", value: "1993" },
    { label: "Statut", value: "Association à objet cultuel (droit local)" },
    { label: "Siège", value: "56 a, rue de Pfastatt, Illzach" },
    { label: "SIREN", value: "808 712 244" },
  ],
  values: [
    {
      title: "Respect",
      text: "Respect de la personne, des opinions et des compétences, dans un climat d’écoute et de sérénité.",
    },
    {
      title: "Neutralité",
      text: "Une association indépendante et neutre : communautarisme, sectarisme et nationalisme sont proscrits.",
    },
    {
      title: "Transparence",
      text: "Une gestion désintéressée et un fonctionnement transparent qui favorise la participation de tous.",
    },
    {
      title: "Fraternité",
      text: "Des décisions prises dans l’esprit de dialogue et de consensus, fondé sur la fraternité musulmane.",
    },
  ],
  pages: {
    membership: "Devenir membre et participer à la vie de la mosquée.",
    editorial: "Le message du Président de l’association.",
    statutes: "Le texte officiel qui encadre l’association.",
    rules: "Les règles pratiques de fonctionnement.",
    projects: "Les projets de la mosquée, en cours et à venir.",
  },
};

type Overview = typeof fr;

const en: Overview = {
  intro:
    "Founded in Illzach on 5 June 1993, the Association Al-Houda manages the Al-Houda mosque within an exclusively religious framework. It is autonomous, independent of any movement or party, and non-profit.",
  facts: [
    { label: "Founded in", value: "1993" },
    { label: "Status", value: "Association with a religious purpose (local law)" },
    { label: "Registered office", value: "56 a, rue de Pfastatt, Illzach" },
    { label: "SIREN", value: "808 712 244" },
  ],
  values: [
    {
      title: "Respect",
      text: "Respect for the person, for opinions and for skills, in an atmosphere of listening and serenity.",
    },
    {
      title: "Neutrality",
      text: "An independent and neutral association: communitarianism, sectarianism and nationalism are prohibited.",
    },
    {
      title: "Transparency",
      text: "Non-profit management and transparent operation that encourages everyone to take part.",
    },
    {
      title: "Brotherhood",
      text: "Decisions taken in a spirit of dialogue and consensus, based on Muslim brotherhood.",
    },
  ],
  pages: {
    membership: "Become a member and take part in the life of the mosque.",
    editorial: "The message of the President of the association.",
    statutes: "The official text governing the association.",
    rules: "The practical operating rules.",
    projects: "The mosque's current and future projects.",
  },
};

const de: Overview = {
  intro:
    "Die am 5. Juni 1993 in Illzach gegründete Association Al-Houda verwaltet die Moschee Al-Houda in einem ausschließlich religiösen Rahmen. Sie ist eigenständig, von jeder Strömung oder Partei unabhängig und verfolgt keinen Erwerbszweck.",
  facts: [
    { label: "Gegründet", value: "1993" },
    { label: "Rechtsform", value: "Verein mit religiösem Zweck (lokales Recht)" },
    { label: "Sitz", value: "56 a, rue de Pfastatt, Illzach" },
    { label: "SIREN", value: "808 712 244" },
  ],
  values: [
    {
      title: "Respekt",
      text: "Respekt vor der Person, den Meinungen und den Fähigkeiten, in einer Atmosphäre des Zuhörens und der Gelassenheit.",
    },
    {
      title: "Neutralität",
      text: "Ein unabhängiger und neutraler Verein: Kommunitarismus, Sektierertum und Nationalismus sind untersagt.",
    },
    {
      title: "Transparenz",
      text: "Eine uneigennützige Führung und eine transparente Arbeitsweise, die die Beteiligung aller fördert.",
    },
    {
      title: "Brüderlichkeit",
      text: "Entscheidungen im Geist des Dialogs und des Konsenses, gestützt auf die muslimische Brüderlichkeit.",
    },
  ],
  pages: {
    membership: "Mitglied werden und am Leben der Moschee teilnehmen.",
    editorial: "Die Botschaft des Vorsitzenden des Vereins.",
    statutes: "Der offizielle Text, der den Verein regelt.",
    rules: "Die praktischen Regeln der Arbeitsweise.",
    projects: "Die laufenden und künftigen Projekte der Moschee.",
  },
};

const ar: Overview = {
  intro:
    "تأسست جمعية الهدى في إلزاك بتاريخ 5 يونيو 1993، وتتولى إدارة مسجد الهدى في إطار ديني حصري. وهي مستقلة وذاتية التسيير، لا تتبع أي تيار أو حزب، ولا تهدف إلى الربح.",
  facts: [
    { label: "تأسست سنة", value: "1993" },
    { label: "الصفة القانونية", value: "جمعية ذات غرض ديني (القانون المحلي)" },
    { label: "المقر", value: "56 a, rue de Pfastatt, Illzach" },
    { label: "رقم SIREN", value: "808 712 244" },
  ],
  values: [
    { title: "الاحترام", text: "احترام الشخص والآراء والكفاءات، في جو من الإصغاء والسكينة." },
    { title: "الحياد", text: "جمعية مستقلة ومحايدة: تُمنع فيها الطائفية والتعصب والنزعة القومية." },
    { title: "الشفافية", text: "تسيير غير ربحي وعمل شفاف يشجّع مشاركة الجميع." },
    { title: "الأخوّة", text: "قرارات تُتخذ بروح الحوار والتوافق، القائمة على الأخوّة الإسلامية." },
  ],
  pages: {
    membership: "انخرطوا وشاركوا في حياة المسجد.",
    editorial: "رسالة رئيس الجمعية.",
    statutes: "النص الرسمي الذي ينظّم الجمعية.",
    rules: "القواعد العملية للتسيير.",
    projects: "مشاريع المسجد الجارية والمقبلة.",
  },
};

export const OVERVIEW: Localized<Overview> = { fr, en, de, ar };
