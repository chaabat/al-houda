// Commissions overview, based on the internal rules (art. 5 and 6).
import type { Localized } from "@/content/localized";

export type CommissionsOverview = {
  intro: string;
  points: { title: string; text: string }[];
  worshipCard: string;
};

export const COMMISSIONS_OVERVIEW: Localized<CommissionsOverview> = {
  fr: {
    intro:
      "Au début de chaque année, le Conseil d’Administration constitue ses commissions de travail. Chacune est dirigée par un président, réunit des membres du Conseil et des adhérents bénévoles, et organise librement ses activités au service de la mosquée.",
    points: [
      {
        title: "Bénévoles",
        text: "Les membres des commissions sont bénévoles et ne perçoivent aucun salaire pour leur travail.",
      },
      {
        title: "Ouvertes",
        text: "Tout membre du CA ou adhérent peut rejoindre une ou plusieurs commissions, et une compétence extérieure peut y apporter son savoir-faire.",
      },
      {
        title: "Transparentes",
        text: "Chaque réunion fait l’objet d’un procès-verbal, et les présidents de commissions présentent leur programme et leur budget au Conseil.",
      },
    ],
    worshipCard:
      "Organiser les prières, les cours et les grands moments de l’année, autour de l’imam. Seule commission permanente de l’association.",
  },
  en: {
    intro:
      "At the beginning of each year, the Board of Directors sets up its working committees. Each one is led by a president, brings together Board members and volunteer members, and freely organises its activities in the service of the mosque.",
    points: [
      {
        title: "Volunteer",
        text: "Committee members are volunteers and receive no salary for their work.",
      },
      {
        title: "Open",
        text: "Any Board member or member of the association can join one or more committees, and outside experts can contribute their know-how.",
      },
      {
        title: "Transparent",
        text: "Every meeting is recorded in minutes, and committee presidents present their programme and budget to the Board.",
      },
    ],
    worshipCard:
      "Organising prayers, lessons and the key moments of the year, around the imam. The association’s only permanent committee.",
  },
  de: {
    intro:
      "Zu Beginn jedes Jahres bildet der Vorstand seine Arbeitskommissionen. Jede wird von einem Vorsitzenden geleitet, vereint Vorstandsmitglieder und ehrenamtliche Mitglieder und gestaltet ihre Aktivitäten im Dienst der Moschee frei.",
    points: [
      {
        title: "Ehrenamtlich",
        text: "Die Mitglieder der Kommissionen arbeiten ehrenamtlich und erhalten für ihre Arbeit kein Gehalt.",
      },
      {
        title: "Offen",
        text: "Jedes Vorstandsmitglied und jedes Vereinsmitglied kann einer oder mehreren Kommissionen beitreten, und externe Fachleute können ihr Wissen einbringen.",
      },
      {
        title: "Transparent",
        text: "Über jede Sitzung wird ein Protokoll erstellt, und die Vorsitzenden der Kommissionen stellen dem Vorstand ihr Programm und ihr Budget vor.",
      },
    ],
    worshipCard:
      "Gebete, Unterricht und die großen Momente des Jahres rund um den Imam organisieren. Die einzige ständige Kommission des Vereins.",
  },
  ar: {
    intro:
      "في بداية كل سنة، يشكّل مجلس الإدارة لجان العمل التابعة له. يرأس كلَّ لجنة رئيسٌ، وتضمّ أعضاءً من المجلس ومنخرطين متطوعين، وتنظّم أنشطتها بحرية في خدمة المسجد.",
    points: [
      {
        title: "تطوّع",
        text: "أعضاء اللجان متطوعون ولا يتقاضون أي أجر مقابل عملهم.",
      },
      {
        title: "انفتاح",
        text: "يمكن لأي عضو في مجلس الإدارة أو منخرط في الجمعية الانضمام إلى لجنة أو أكثر، كما يمكن لأصحاب الخبرة من خارج الجمعية المساهمة بخبراتهم.",
      },
      {
        title: "شفافية",
        text: "يُحرَّر محضر لكل اجتماع، ويعرض رؤساء اللجان برنامجهم وميزانيتهم على مجلس الإدارة.",
      },
    ],
    worshipCard:
      "تنظيم الصلوات والدروس والمحطات الكبرى في السنة حول الإمام. وهي اللجنة الدائمة الوحيدة في الجمعية.",
  },
};
