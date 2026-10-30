// Global content — content.md › "GLOBAL CONTENT ELEMENTS" + shared items.
// Strings marked with `pending` render as placeholder UI (content.md "to be added").

export const business = {
  name: 'Star Metal Store',
  location: 'Pondicherry (Puducherry)',
  established: '1988',
  phone: {
    label: 'Phone',
    numbers: [
      { display: '0413 2334968', tel: '+914132334968' },
      { display: '0413 2220768', tel: '+914132220768' },
    ],
  },
  whatsapp: { pending: true, label: 'WhatsApp', note: 'to be added' },
  email: { label: 'Email', value: 'Starmetalstore@yahoo.com' },
  address: {
    label: 'Address',
    lines: ['No. 66, Thiyagu Mudaliar Street', 'Pondicherry – 605001'],
  },
  hours: {
    pending: true,
    label: 'Business Hours',
    note: 'to be added — typical South Indian trade hours, e.g., Monday–Saturday, 9:30 AM – 7:30 PM',
  },
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/#products' },
  { label: 'Contact', to: '/contact' },
]

export const footer = {
  tagline: "Star Metal Store — Pondicherry's Wholesale Metal & Hotel Equipment Supplier Since 1988.",
  details: ['Star Metal Store, Pondicherry (Puducherry)', 'Est. 1988 · Third Generation Family Business'],
  taglineLine: ['Wholesale Pricing', 'Commercial Grade', 'After-Sales Service', 'Tamil Nadu & Beyond'],
}

// content.md › META DESCRIPTIONS
export const meta = {
  home: 'Star Metal Store, Pondicherry — wholesale supplier of commercial kitchen equipment, stainless steel vessels, brassware, and hotel equipment since 1988. Kilogram-based wholesale pricing for B2B buyers across Tamil Nadu.',
  about: 'Learn about Star Metal Store — a third-generation family business in Pondicherry supplying commercial kitchen equipment and metal goods at wholesale rates since 1988.',
  contact: 'Contact Star Metal Store, Pondicherry for bulk metal goods and commercial kitchen equipment enquiries. Wholesale supplier since 1988, serving Tamil Nadu and beyond.',
}
