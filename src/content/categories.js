// content.md › PRODUCT CATEGORIES SECTION (home cards) + the eight PRODUCT CATEGORY pages.
// `theme` is visual-only: the material accent colour, CSS texture and icon for each category.

export const categories = [
  {
    slug: 'chinese-restaurant',
    theme: { color: 'var(--color-mat-wok)', texture: 'tex-seasoned', icon: 'wok' },
    card: { title: 'Chinese Restaurant Equipment', summary: 'Woks, steamers, noodle stations & more' },
    formOption: 'Chinese Restaurant Equipment',
    heading: 'Chinese Restaurant Equipment',
    subheading:
      'Kitchen setup for Chinese fast-food outlets, noodle kadais and Indo-Chinese restaurants — in bulk.',
    intro:
      'From street-side noodle kadais to food-court Chinese counters — woks, steamers and prep gear for every Indo-Chinese kitchen, at wholesale rates.',
    servesIntro: 'Our Chinese restaurant equipment range is suited for:',
    serves: [
      'Chinese fast-food outlets and small restaurants',
      'Noodle kadai setups',
      'Indo-Chinese counters inside larger restaurant kitchens',
      'Hotel kitchens with dedicated Chinese sections',
    ],
    products: [
      { name: 'Chinese Woks (Kadai)', desc: 'Heavy-gauge woks (kadai) for high-heat stir-fry, sized to match your burner.' },
      { name: 'Noodle Kadai / Noodle Station Vessels', desc: 'Commercial vessels for batch noodle cooking and holding.' },
      { name: 'Choppers', desc: 'Commercial veg and meat choppers built for fast Chinese-kitchen prep.' },
      { name: 'Momo Steamers', desc: 'Multi-tier stainless steel steamers for momos, dimsums and dumplings.' },
      { name: 'Deep Freezers', desc: 'Commercial deep freezers for bulk ingredient storage in busy kitchens.' },
      { name: 'Mini Cookers', desc: 'Compact cookers for single servings and side dishes.' },
      { name: 'Chopping Boards', desc: 'Heavy-duty commercial boards sized for Chinese prep stations.' },
    ],
    note: {
      heading: 'Why Buy From Us',
      body: "Metal goods at kilogram rates — the same benchmark as Chennai's trade market. On a full outlet setup, that adds up. We'll help spec the right mix for your layout.",
    },
    cta: 'Request a Quote for Chinese Restaurant Equipment',
    meta: 'Wholesale Chinese restaurant equipment in Pondicherry — woks, momo steamers, noodle vessels, choppers, and deep freezers. Bulk pricing for commercial buyers in Tamil Nadu.',
  },
  {
    slug: 'tea-shop',
    theme: { color: 'var(--color-mat-copper)', texture: 'tex-hammered', icon: 'tea' },
    card: { title: 'Tea Shop & Milk Bar Setup', summary: 'Boilers, burner stoves, copper vessels' },
    formOption: 'Tea Shop Setup',
    heading: 'Tea Shop & Milk Bar Setup Equipment',
    subheading:
      'Boilers, burner stoves and copper vessels for tea stalls and milk bars — commercial grade.',
    intro:
      'The tea kadai drives daily trade across Tamil Nadu and Puducherry. New stall or replacement, our gear is built for constant heat and a busy counter.',
    servesIntro: 'Our tea shop equipment range serves:',
    serves: ['Tea stalls and roadside tea shops', 'Milk bars and milk vendors', 'Tiffin centres with tea service', 'Hotel tea and coffee counters'],
    products: [
      { name: 'Tea Boilers', desc: 'Stainless steel boilers in commercial sizes, built for all-day running.' },
      { name: 'Milk Boilers', desc: "Heavy-gauge milk boilers for a tea kadai's morning and evening rush." },
      { name: '3-Burner Gas Stoves', desc: 'The standard tea-and-tiffin counter stove — three items on the go at once.' },
      { name: '2-Burner Gas Stoves', desc: 'Sturdy commercial stoves for small setups or a second burner station.' },
      { name: 'Copper Boilers', desc: 'Copper boilers for heat and flavour — tea, coffee and temple kitchens.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Tea shop gear takes daily punishment — constant heat, heavy use and South Indian hard water. We pick for durability. No compromise on gauge or build.',
    },
    cta: 'Enquire About Tea Shop Setup Packages',
    meta: 'Commercial tea shop and milk bar equipment from Star Metal Store, Pondicherry — tea boilers, milk boilers, copper vessels, and gas stoves at wholesale rates.',
  },
  {
    slug: 'restaurant-kitchen',
    theme: { color: 'var(--color-mat-hindolium)', texture: 'tex-spun', icon: 'idly' },
    card: { title: 'Restaurant Kitchen Equipment', summary: 'Gas stoves, idly pots, large-format cookware' },
    formOption: 'Restaurant Kitchen',
    heading: 'Restaurant Kitchen Equipment',
    subheading:
      'Big stoves, idly pots and cookware for full-service restaurants — new setups and replacements.',
    intro:
      'Too small and service stalls. Too light and you replace vessels yearly. From the idly pot to the main-line gas stove, our kitchen gear is commercial grade.',
    servesIntro: 'Our restaurant kitchen equipment range serves:',
    serves: ['South Indian restaurants and tiffin houses', 'Multi-cuisine restaurants', 'Hotel kitchens', 'Dhaba and highway restaurant setups'],
    products: [
      { name: 'Commercial Gas Stoves (Big Size)', desc: 'High-capacity stoves for the main cooking line, in multiple burner sizes.' },
      {
        name: 'Hindolium Dabara Sets',
        desc: 'Classic Hindolium dabara for coffee, tea and decoction — standard and bulk sizes.',
        note: 'Note: Hindolium refers to aluminium alloy construction; confirm specific grade with our team.',
      },
      { name: 'Idly Pots — Standard Round', desc: 'Commercial round idly pots with multiple tray options for high volume.' },
      { name: 'Round Idly Pots', desc: 'Heavy-gauge round pots in 24, 48 and higher-count batch sizes.' },
      { name: 'Square Idly Pots', desc: 'Space-saving square idly pots that stack neatly for storage.' },
      { name: 'Stock Pots', desc: 'Stainless steel stock pots with lids — for soups, gravies, and stocks in a busy restaurant kitchen.' },
      { name: 'Work Tables', desc: 'Stainless steel work tables with undershelves — a sturdy prep surface with storage below for kitchen prep stations.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Pondicherry kitchens face humidity, intense heat and hard water. Our cookware is benchmarked for exactly that — nothing that only lasts in ideal conditions.',
    },
    cta: 'Get a Quote for Restaurant Kitchen Equipment',
    meta: 'Commercial restaurant kitchen equipment — large gas stoves, idly pots, Hindolium dabara sets, and cookware at wholesale prices in Pondicherry. Serving Tamil Nadu restaurants and hotels.',
  },
  {
    slug: 'catering-equipment',
    theme: { color: 'var(--color-mat-brass)', texture: 'tex-hammered', icon: 'carrier' },
    card: { title: 'Catering Service Equipment', summary: 'Carriers, storage drums, anda tables, dabara sets' },
    formOption: 'Catering Equipment',
    heading: 'Catering Service Equipment',
    subheading:
      'Big carriers, storage drums and service gear for caterers — built for volume and transport.',
    intro:
      'Catering is a volume game. At a 500-plate function, nothing can leak, buckle or fail. Our gear is specced for big batches, transport and heavy repeat use.',
    servesIntro: 'Our catering equipment range serves:',
    serves: [
      'Wedding and function caterers',
      'Corporate event catering companies',
      'School and college bulk meal contractors',
      'Pilgrimage and temple catering operations',
      'Industrial canteen catering contractors',
    ],
    products: [
      { name: 'Big-Size Carriers (Catering Carriers)', desc: 'Insulated carriers to move cooked food from kitchen to venue. Multiple sizes.' },
      { name: 'Storage Drums', desc: 'Heavy-gauge stainless steel drums for bulk ingredients and cooked food.' },
      { name: 'Dabara Sets (Catering Grade)', desc: 'Bigger, heavier dabara sets than restaurant grade, for bulk serving.' },
      {
        name: 'Anda (Serving/Transfer Vessels)',
        desc: 'Traditional serving and transfer vessels for rice, curries and bulk items.',
        pending: 'Specific configurations to be confirmed with our team.',
      },
      { name: 'Anda Tables / Service Tables', desc: 'Heavy-duty tables that stay stable under load during function service.' },
      { name: 'Cotton Candy Machines', desc: 'Cotton candy machines for live snack counters at weddings, functions, and events.' },
      { name: 'Popcorn Machines', desc: 'Popcorn machines with glass display cabinets — for live snack counters at functions, events, and fairs.' },
      { name: 'Biryani Dabara / Handi', desc: 'Biryani handis for hotel, restaurant, and catering supply — for cooking and serving biryani in bulk. Available in all sizes.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Temple functions, wedding lines, corporate events — we know the trade. Our team will match carriers, drums and vessels to your operation size.',
    },
    cta: 'Enquire About Catering Equipment Packages',
    meta: 'Bulk catering equipment from Star Metal Store, Pondicherry — large-format carriers, storage drums, anda tables, and dabara sets for commercial caterers across Tamil Nadu.',
  },
  {
    slug: 'corporate-cafeteria',
    theme: { color: 'var(--color-mat-steel-blue)', texture: 'tex-brushed', icon: 'canteen' },
    card: { title: 'Corporate Restaurant & Cafeteria', summary: 'Bain-marie units, plates, tumblers, seating' },
    formOption: 'Corporate Canteen',
    heading: 'Corporate Restaurant & Cafeteria Equipment',
    subheading:
      'Bain-maries, plates, tumblers, cutlery and seating for corporate canteens and institutions.',
    intro:
      'Canteens need standard, scalable gear that handles 200 covers a day without wear. We supply it all — from the bain-marie counter to the last tumbler.',
    servesIntro: 'Our corporate restaurant and cafeteria range serves:',
    serves: [
      'IT company cafeterias and canteens',
      'Factory and industrial canteen operators',
      'Hospital and institutional food service operations',
      'College and school canteen contractors',
      'Government and PSU cafeteria setups',
    ],
    products: [
      { name: 'Plates (Tiffler / Meal Plates)', desc: 'Institutional steel meal plates — plain or tiffler compartment format.' },
      { name: 'Tumblers', desc: 'Stainless steel tumblers in canteen quantities for water, tea and drinks.' },
      { name: 'Cutlery Sets', desc: 'Spoons, forks and serving spoons in commercial steel, sold in bulk.' },
      { name: 'Lunch Plates (Full Plate)', desc: 'Full-size stainless steel plates for South Indian rice meals.' },
      { name: 'Bain-Marie Units', desc: 'Warming counters that hold food at serving temperature through lunch.' },
      { name: 'Tables and Chairs', desc: 'Stackable steel and MS-frame tables and chairs for high-traffic dining.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Canteen contracts need large, consistent quantities on one invoice. Our wholesale pricing and stock depth are built for exactly that.',
    },
    cta: 'Enquire About Corporate Canteen Equipment Procurement',
    meta: 'Corporate canteen and cafeteria equipment — bain-marie units, meal plates, tumblers, cutlery, and tables at wholesale rates from Star Metal Store, Pondicherry.',
  },
  {
    slug: 'machinery',
    theme: { color: 'var(--color-mat-gunmetal)', texture: 'tex-plate', icon: 'gear' },
    card: { title: 'Machinery & Food Processing Equipment', summary: 'Atta machines, vegetable cutters, grinders' },
    formOption: 'Food Processing Machinery',
    heading: 'Food Processing Machinery & Equipment',
    subheading:
      'Atta machines, veg cutters, mixer and tilting grinders for kitchens, bakeries and food units.',
    intro:
      'Machines keep commercial kitchens fast and consistent. Ours come from reliable makers, for restaurants, caterers and small food units — single unit or bulk.',
    servesIntro: 'Our machinery range serves:',
    serves: [
      'Large restaurant and hotel kitchens',
      'Catering production kitchens',
      'Small and medium food processing units',
      'Atta and flour supply operations',
      'Commercial wet grinder and batter production units',
    ],
    products: [
      { name: 'Atta Machines (Flour Grinders)', desc: 'High-volume flour grinding for restaurant kitchens and atta supply units.' },
      { name: 'Vegetable-Cutting Machines', desc: 'High-speed veg cutters that slash prep time in busy kitchens.' },
      { name: 'Mixer Grinders (Commercial)', desc: 'Heavy-duty grinders for wet and dry grinding at scale.' },
      { name: 'Tilting Grinders (Wet Grinders)', desc: 'Tilting wet grinders for idly and dosa batter — big batches tip out easily.' },
      { name: 'Coriander/Masala Grinder', alias: 'coridar', desc: 'Dedicated grinder for bulk spice and masala prep.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Machinery is a big investment. We size capacity to your daily output — no under-spec, no over-spend — and guide you on basic maintenance.',
    },
    cta: 'Enquire About Commercial Machinery',
    meta: 'Commercial food processing machinery in Pondicherry — atta machines, vegetable cutters, mixer grinders, tilting grinders. Bulk pricing for restaurant and catering kitchens.',
  },
  {
    slug: 'hawkins-cookers',
    theme: { color: 'var(--color-mat-anodised)', texture: 'tex-anodised', icon: 'cooker' },
    card: { title: 'Cooker & Cookware (Hawkins)', summary: 'Pressure cookers, cookware, spare parts' },
    formOption: 'Hawkins Cookers & Cookware',
    heading: 'Hawkins Pressure Cookers, Cookware & Spare Parts',
    subheading:
      'Authorised Hawkins range — pressure cookers, cookware and genuine spares for bulk buyers.',
    intro:
      "India's trusted pressure cooker brand, in home and commercial kitchens alike. Cookers, cookware and genuine spares — bulk for operators, resale for traders.",
    servesIntro: 'Our Hawkins range serves:',
    serves: [
      'Restaurants and institutional kitchens using pressure cooking at scale',
      'Traders and distributors looking for reliable wholesale supply',
      'Hotel and catering operations requiring consistent cooker stock',
      'Service operators needing genuine spare parts for maintenance',
    ],
    products: [
      { name: 'Hawkins Pressure Cookers', desc: 'Genuine Hawkins cookers in multiple commercial capacities, at bulk prices.' },
      { name: 'Hawkins Cookers (1.5–12 Litre)', desc: 'Hawkins pressure cookers from 1.5 to 12 litres — smaller capacities for side dishes, small batches, and individual kitchen stations.' },
      { name: 'Hawkins Cookware', desc: 'Hawkins pans, pots and vessels from the official cookware line.' },
      { name: 'Spare Parts (Genuine)', desc: 'Genuine gaskets, weights and handles — longer life, safe pressure.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Traders get wholesale Hawkins pricing across Pondicherry and Tamil Nadu. Operators get genuine spares on hand — less downtime for high-volume kitchens.',
    },
    cta: 'Enquire About Hawkins Bulk Supply',
    meta: 'Hawkins pressure cookers, cookware, and genuine spare parts — wholesale supply from Star Metal Store, Pondicherry for commercial operators and traders in Tamil Nadu.',
  },
  {
    slug: 'bakery-cafe',
    theme: { color: 'var(--color-mat-crust)', texture: 'tex-crumb', icon: 'mixer' },
    card: { title: 'Bakery & Café Equipment', summary: 'Ovens, mixers, coffee machines, display showcases' },
    formOption: 'Bakery & Café Equipment',
    heading: 'Bakery & Café Equipment',
    subheading:
      'Planetary mixers, ovens, showcases and tea/coffee machines for commercial bakeries and cafés.',
    intro:
      'Bakeries and cafés are booming across Tamil Nadu and Puducherry. We supply their commercial gear — from the planetary mixer to the display showcase.',
    servesIntro: 'Our bakery and café equipment range serves:',
    serves: [
      'Commercial bakeries and confectioneries',
      'Standalone cafés and coffee shops',
      'Hotel F&B outlets and all-day dining counters',
      'Corporate café operations',
      'Cloud kitchens with bakery product lines',
    ],
    products: [
      { name: 'Planetary Mixers', desc: 'The heart of any bakery — dough, cream and batter at commercial volume.' },
      { name: 'Blenders (Commercial)', desc: 'High-capacity blenders for smoothies, sauces and drinks.' },
      { name: 'Display Showcases', desc: 'Chilled and ambient showcases for cakes, pastries and drinks. Many sizes.' },
      { name: 'Tea/Coffee Dispensing Units', desc: 'Tea and coffee dispensers for high-volume self or counter service.' },
      { name: 'Tea Makers (Machine)', desc: 'Machines for consistent, high-volume tea in canteens and cafeterias.' },
      { name: 'Coffee Makers (Espresso & Filter Machines)', desc: 'Espresso machines for cafés, filter machines for traditional coffee.' },
      { name: 'Warmers (Food & Beverage Warmers)', desc: 'Keep baked goods, soups and drinks at temperature through service.' },
      { name: 'Ovens (Baking/Cooking Ovens)', desc: 'Deck and convection ovens for full-scale bakery production.' },
      { name: 'Microwave Ovens (Commercial)', desc: 'Heavy-duty microwaves for high-volume reheating and finishing.' },
      { name: 'OTG (Oven/Toaster/Grill)', desc: 'Versatile OTGs for small-batch baking and grilling in café kitchens.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Bakery gear is a long-term investment. We match your mixer, oven and showcase to your real output and sales — not a catalogue guess.',
    },
    cta: 'Enquire About Bakery & Café Equipment',
    meta: 'Commercial bakery and café equipment — planetary mixers, ovens, display showcases, tea and coffee machines from Star Metal Store, Pondicherry. Wholesale pricing for businesses.',
  },
]

// Footer link labels (content.md › Product Categories (footer links)) match the form options.
export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
