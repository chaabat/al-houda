type SiteConfig = {
  contact: {
    address: string;
    phone: string;
    mobile?: string;
    email?: string;
    secretariatEmail?: string;
    imamEmail?: string;
  };
  social: { facebook?: string; instagram?: string; tiktok?: string; youtube?: string };
  links: {
    /** HelloAsso donation form of the association. */
    helloasso?: string;
    /** HelloAsso membership form ("Adhérer à l'Association Al-Houda"). */
    membership?: string;
    /** School management portal (RosarioSIS). */
    teachingPortal?: string;
    /** Online registration form for the Arabic / Qur'an classes (Google Forms). */
    registrationForm?: string;
  };
  /** Mawaqit mosque slug, from the mosque page URL: https://mawaqit.net/fr/<slug> */
  mawaqit: { slug: string };
};

// Taken from the association's official site (alhouda.org).
// A social icon or link only appears when its address is filled in (leave "" to hide it).
export const SITE: SiteConfig = {
  contact: {
    address: "56A Rue de Pfastatt, 68110 Illzach",
    phone: "03 65 67 51 96",
    mobile: "07 43 66 43 58",
    email: "contact@alhouda.org",
    secretariatEmail: "secretariat@alhouda.org",
    imamEmail: "imam@alhouda.org",
  },
  social: {
    facebook:
      "https://www.facebook.com/people/Mosqu%C3%A9e-Al-Houda-Illzach/pfbid02k12e44womY3qDAHE7G4cDFLjr61jcmQCYZKMuJxkVnQQdsCquMvBELuza4SGuiSxl/",
    instagram: "https://www.instagram.com/mosqueealhoudaillzach/",
    tiktok: "https://www.tiktok.com/@assocuiy0q0",
    youtube: "",
  },
  links: {
    helloasso: "https://www.helloasso.com/associations/association-al-houda-illzach/formulaires/1",
    membership:
      "https://www.helloasso.com/associations/association-al-houda-illzach/adhesions/adherer-a-l-association-al-houda-d-illzach",
    teachingPortal: "https://alhouda.rosariosis.com/sis",
    // Registration for the Arabic / Qur'an classes (same Google Form as alhouda.org).
    registrationForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSdxwopYMDt4zM5jyiL7LMMWz5iPoc_b7Q465BJSt5lg0UZpWQ/viewform",
  },
  mawaqit: {
    slug: "m-alhouda-illzach",
  },
};

export const REGISTRATION_URL = SITE.links.registrationForm || "/contact";

/** Donation link (HelloAsso); falls back to the contact page if the link is removed. */
export const DONATION_URL = SITE.links.helloasso || "/contact";

/**
 * "Choisissez un contact" on the contact page → mailbox that receives the message.
 * An empty address falls back to contact@. Each address must be activated once on FormSubmit
 * (see README).
 */
export const CONTACT_RECIPIENTS = {
  contact: SITE.contact.email ?? "contact@alhouda.org",
  teaching: "",
  presidency: "",
  secretariat: SITE.contact.secretariatEmail ?? "",
  imam: SITE.contact.imamEmail ?? "",
} as const;

export type ContactRecipient = keyof typeof CONTACT_RECIPIENTS;
