// content.md › PAGE: ABOUT
// `**text**` marks bold runs from content.md; rendered by <Rich>.

export const aboutHero = {
  heading: 'Forty Years of Metal. Three Generations of Trust.',
  subheading:
    "Pondicherry's wholesale kitchen and metal goods supplier since 1988.",
}

export const story = {
  heading: 'Where It Started',
  // Timeline is built from the Our Story paragraphs: 1988 → 2000 → Present
  timeline: [
    {
      year: '1988',
      label: 'Founded',
      paragraphs: [
        'Founded in **1988**, when local kitchens relied on irregular trips to Chennai. Our founder built a permanent local supplier: stock the right things, price them fairly, stand behind every sale.',
      ],
    },
    {
      year: '2000',
      label: 'Renovation & Expansion',
      paragraphs: [
        'In **2000**, a full renovation and expansion broadened our catalogue and capacity.',
      ],
    },
    {
      year: 'Today',
      label: 'Third Generation',
      paragraphs: [
        'Now led by the **third generation of the founding family**, with the same trade ethic.',
      ],
    },
  ],
}

export const whatWeDo = {
  heading: 'More Than a Metal Store',
  body: [
    'At heart a metal goods store — steel, brass and copper — our catalogue has grown with the trade we serve.',
  ],
  listIntro: 'Today, we supply:',
  list: [
    { strong: 'Home and commercial stainless-steel vessels', rest: 'in a full range of gauges and sizes' },
    { strong: 'Traditional brassware', rest: 'for both functional use and institutional procurement' },
    { strong: 'Copper items', rest: 'valued in temple kitchens, traditional catering, and Ayurvedic food prep' },
    { strong: 'Hotel and restaurant equipment', rest: 'gas stoves, idly pots, bain-marie units, and more' },
    { strong: 'Commercial machinery', rest: 'atta machines, grinders, vegetable-cutting machines' },
    { strong: 'Bakery and café equipment', rest: 'ovens, planetary mixers, dispensing units' },
    { strong: 'Hawkins pressure cookers and cookware', rest: 'including spare parts' },
  ],
  closing:
    'Every category stocked in depth — the full working range, not one size of one item.',
}

export const approach = {
  heading: 'How We Do Business',
  body: 'Kilogram-based wholesale pricing — pay for the metal, not a brand margin. Chennai-level rates, without the freight.',
  listIntro: 'We are **customer-oriented in our service**. That means:',
  list: [
    'We understand your operation before we recommend',
    'We stock for your volume, not what is easiest to sell',
    '**After-sales service** on applicable products',
    '**Replacements in applicable cases**',
  ],
  closing:
    'No compromise on quality — everything we stock must survive heavy use, high heat and bulk loads.',
}

export const numbers = {
  heading: 'By the Numbers',
  stats: [
    { value: '1988', label: 'Year founded' },
    { value: '40+', label: 'Years in the metal and hotel equipment trade' },
    { value: '2000', label: 'Year of major renovation and expansion' },
    { value: '3', label: 'Generations of family ownership' },
    { value: '8', label: 'Major product categories' },
    { value: '1', label: 'Location — Puducherry, serving Tamil Nadu and beyond' },
  ],
}

export const values = {
  heading: 'What We Stand For',
  items: [
    {
      icon: 'hourglass',
      title: 'Longevity Over Convenience',
      body: 'A vessel from us should serve your kitchen for years, not months.',
    },
    {
      icon: 'scale',
      title: 'Pricing Transparency',
      body: 'Kilogram pricing — you know exactly what you pay for, and why.',
    },
    {
      icon: 'book',
      title: 'Trade Knowledge',
      body: 'Three generations of material know-how, shared with every buyer.',
    },
    {
      icon: 'handshake',
      title: 'After-Sale Accountability',
      body: 'If a product has an issue, we fix it. Repeat orders built this store.',
    },
  ],
}
