// Membership content, from alhouda.org and the internal rules (art. 4) — French only for now.
export const MEMBERSHIP = {
  title: "L’adhésion à la mosquée",
  lead: [
    "Adhérer à l’Association Al-Houda d’Illzach, c’est s’engager auprès de toute la communauté musulmane de la ville et œuvrer pour le vivre ensemble.",
    "L’objet de l’Association est d’organiser la pratique du culte musulman, de favoriser l’apprentissage et le partage de l’Islam, et d’engager le dialogue avec les autres communautés religieuses et les institutions publiques.",
  ],
  photo: "/images/association/mosque-building.jpg",
  fee: {
    amount: "10 €",
    period: "par mois",
    note: "Montant fixé par le Conseil d’Administration et approuvé par l’Assemblée Générale, du 1er janvier au 31 décembre.",
  },
  frequencies: [
    { label: "Mensuelle", detail: "Acquise du 1er au dernier jour du mois" },
    {
      label: "Trimestrielle",
      detail: "Avant le 31 mars, 30 juin, 30 septembre, 31 décembre",
    },
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
