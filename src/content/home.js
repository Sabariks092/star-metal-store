// content.md › PAGE: HOME (LANDING PAGE)

export const hero = {
  headline: "Pondicherry's Most Trusted Bulk Metal & Hotel Equipment Supplier — Since 1988",
  subheadline:
    'From traditional brass dabara sets to full restaurant machinery — sourced heavy, priced fair, delivered right.',
  body: 'Wholesale supplier to restaurants, caterers, hotels and canteens across Puducherry and Tamil Nadu — from a tea kadai to an IT-park canteen, at kilogram rates that match Chennai.',
  primaryCta: 'Contact Us',
  secondaryCta: 'Our Products',
}

// TRUST BAR — `strong` is the bold lead, `rest` the remainder
export const trustBar = [
  { strong: 'Est. 1988', rest: '40 Years in the Trade' },
  { strong: '3rd Generation', rest: 'Family Business' },
  { strong: 'Wholesale Kilogram Pricing', rest: 'No Retail Markup' },
  { strong: 'After-Sales Service', rest: 'Included' },
  { strong: 'Chennai-Comparable Rates', rest: 'Right Here in Pondicherry' },
]

export const whoWeServe = {
  headline: 'Built for the Business Kitchen, Not the Home Cook',
  body: 'Not a retail showroom — a wholesale supplier for professionals who know why a 100-litre idly pot beats a 20-litre one on a catering day.',
  clients: [
    { icon: 'hotel', strong: 'Hotel & Restaurant Owners', rest: 'Bulk vessels, cookware & gas equipment' },
    { icon: 'carrier', strong: 'Catering Contractors', rest: 'Drums, carriers & serving equipment' },
    { icon: 'canteen', strong: 'Corporate Canteen Operators', rest: 'Bain-marie counters & cutlery banks' },
    { icon: 'tea', strong: 'Tea & Tiffin Shop Proprietors', rest: 'Burner stations & boiler lines' },
    { icon: 'mixer', strong: 'Bakery & Café Operators', rest: 'Mixers, showcases & dispensers' },
    { icon: 'scale', strong: 'Merchants & Traders', rest: 'Steel, brass & copper for resale' },
  ],
  closing: "Feeding 50 people or more? You're in the right place.",
}

export const productsSection = {
  headline: 'What We Stock',
  intro:
    'Eight categories, each stocked in depth — the complete working range your kitchen needs, not one or two items.',
}

export const whyUs = {
  headline: ['Forty Years Is Not a Number.', "It's a Track Record."],
  body: 'Since 1988 we have known one thing: the kitchen trade runs on trust. A caterer cannot have a carrier that leaks on a wedding day, or a boiler that gives out mid-rush.',
  bridge: 'That understanding is baked into how we operate:',
  // Pull-quote lifted from the body above
  pullQuote: 'A caterer cannot have a carrier that leaks on a wedding day.',
  pillars: [
    {
      title: 'Quality That Lasts',
      body: 'Commercial-grade goods chosen to last years, not a season.',
    },
    {
      title: 'Pricing That Makes Sense',
      body: 'Kilogram-based wholesale rates, no middle-man markup. We match or beat Chennai — without the freight.',
    },
    {
      title: 'Service After the Sale',
      body: 'We stand behind what we sell, with service and replacements in applicable cases.',
    },
    {
      title: 'Decades of Trade Know-How',
      body: 'Three generations of knowing which gauge holds heat and how to spec a dabara set for 200 covers.',
    },
  ],
}

export const location = {
  headline: 'Located in Puducherry. Serving Tamil Nadu and Beyond.',
  body: [
    'A reliable local source for buyers from Cuddalore, Villupuram, Tindivanam, Chidambaram and across Tamil Nadu — no trip to Chennai needed.',
    'Visit us directly — for larger orders, we arrange delivery.',
  ],
  cta: 'Contact Us for Bulk Orders',
}

export const testimonials = {
  headline: 'Trusted by Operators Across the Region',
  // Google Maps reviews, copied as written. Text-less ratings and critical reviews are left out.
  reviews: [
    {
      name: 'Muthu Raja',
      meta: '3 reviews',
      when: '2 months ago',
      rating: 5,
      text: 'As a chef, I regularly look for good-quality kitchen equipment at reasonable prices, and Starmetal is a great place for that. Good quality knives, vessels, and kitchen essentials at affordable prices. Highly recommended for professional kitchen needs.',
    },
    {
      name: 'Namya Mahadev',
      meta: '1 review',
      when: '2 months ago',
      rating: 5,
      text: 'Nice shop to purchase untesills at very low price high quality things very good staaf are definitely come to here',
    },
    { name: 'Manikandan', meta: '4 reviews · 1 photo', when: '2 months ago', rating: 5, text: 'Service is good and affordable price and quality also good' },
    { name: 'Sathish Soft', meta: '5 reviews', when: '3 months ago', rating: 5, text: 'I bought Good products for my soup shop' },
    { name: 'Dhiyagu Smart', meta: '4 reviews · 1 photo', when: '3 months ago', rating: 5, text: 'Good customer service and good product knowledge' },
    {
      name: 'Shavnal Jack',
      meta: 'Local Guide · 48 reviews · 144 photos',
      when: '9 months ago',
      rating: 5,
      text: 'Your starting new shop get one stop all things for your needs completed',
    },
    { name: 'Silviya S', meta: '3 reviews · 1 photo', when: '2 weeks ago', rating: 5, text: 'Good' },
    { name: 'Abdul Rahaman', meta: 'Local Guide · 10 reviews · 3 photos', when: '3 years ago', rating: 5, text: 'Very good place' },
    {
      name: 'Anandbabu Surendran',
      meta: 'Local Guide · 31 reviews · 28 photos',
      when: '6 years ago',
      rating: 5,
      text: 'Due to Corona much items were not available but very reasonable price',
    },
    { name: 'AK Tech', meta: 'Local Guide · 29 reviews · 344 photos', when: '9 years ago', rating: 5, text: 'Best quality products and reasonable rate' },
    { name: 'Janarthanan Jana', meta: '2 reviews', when: '8 years ago', rating: 5, text: 'Good shoppe and good price' },
  ],
}
