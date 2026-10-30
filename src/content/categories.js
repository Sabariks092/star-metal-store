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
      'Complete kitchen setup supplies for Chinese fast-food outlets, noodle kadais, and Indo-Chinese restaurants — stocked for bulk procurement.',
    intro:
      'The Indo-Chinese food segment is one of the fastest-growing in South Indian commercial kitchens — from standalone noodle kadais on busy streets to Chinese fast-food counters inside food courts and hotels. Star Metal Store stocks the full range of equipment and vessels this kitchen format demands, at wholesale rates.',
    servesIntro: 'Our Chinese restaurant equipment range is suited for:',
    serves: [
      'Chinese fast-food outlets and small restaurants',
      'Noodle kadai setups',
      'Indo-Chinese counters inside larger restaurant kitchens',
      'Hotel kitchens with dedicated Chinese sections',
    ],
    products: [
      { name: 'Chinese Woks (Kadai)', desc: 'Heavy-gauge Chinese woks — also called kadai locally — for high-heat stir-fry cooking. Available in multiple sizes to match burner capacity.' },
      { name: 'Noodle Kadai / Noodle Station Vessels', desc: 'Specialized vessels for noodle preparation and holding. Sized for commercial batch cooking.' },
      { name: 'Choppers', desc: 'Commercial-grade vegetable and meat choppers suited for the fast prep demands of a Chinese kitchen setup.' },
      { name: 'Momo Steamers', desc: 'Stacked momo steamers in stainless steel — for dumplings, dimsums, and steam-cooked items. Available in multi-tier configurations.' },
      { name: 'Deep Freezers', desc: 'Commercial deep freezers for ingredient storage in high-volume Chinese and fast-food kitchens.' },
      { name: 'Mini Cookers', desc: 'Compact cooking vessels suited for individual-serving preparation and side dishes.' },
      { name: 'Chopping Boards', desc: 'Heavy-duty commercial chopping boards in appropriate sizes for Chinese kitchen prep stations.' },
    ],
    note: {
      heading: 'Why Buy From Us',
      body: "Star Metal Store's wholesale pricing model means you pay kilogram-rate pricing on metal goods — the same benchmark as Chennai's commercial trade market. When you're outfitting a new outlet or restocking an existing kitchen, that difference adds up significantly on a full equipment list. Our team can also assist with speccing out the right combination of items for your kitchen layout.",
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
      'Everything a tea stall or milk bar needs — from boilers and burner stoves to copper vessels — in commercial-grade quality.',
    intro:
      "The tea kadai is the backbone of daily commerce across Tamil Nadu and Puducherry. Whether you're starting a new stall or replacing aging equipment, Star Metal Store supplies the full range of commercial tea shop and milk bar equipment — built to handle the constant heat and volume of a busy counter.",
    servesIntro: 'Our tea shop equipment range serves:',
    serves: ['Tea stalls and roadside tea shops', 'Milk bars and milk vendors', 'Tiffin centres with tea service', 'Hotel tea and coffee counters'],
    products: [
      { name: 'Tea Boilers', desc: 'Stainless steel tea boilers in commercial capacities — designed for continuous operation on a busy counter. Available in multiple sizes.' },
      { name: 'Milk Boilers', desc: "Heavy-gauge milk boilers for high-volume milk heating — built for the demands of a tea kadai's morning and evening rush." },
      { name: '3-Burner Gas Stoves', desc: 'Commercial 3-burner gas stoves — the standard configuration for a tea and tiffin counter handling multiple items simultaneously.' },
      { name: '2-Burner Gas Stoves', desc: 'For smaller setups or secondary burner stations. Sturdy, commercial-grade construction.' },
      { name: 'Copper Boilers', desc: 'Traditional copper boilers — valued for heat conductivity and the flavour profile they impart. Preferred in traditional-style tea and coffee service, and in temple and institutional kitchens.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Tea shop equipment takes daily punishment — constant heat cycles, heavy use, and hard water conditions common in South India. The products we stock are selected for durability under exactly these conditions. No compromise on gauge or build quality.',
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
      'Large-format cooking equipment, idly pots, and cookware for full-service restaurants — wholesale stocking for new setups and replacements.',
    intro:
      "A restaurant kitchen runs on the right equipment. Too small and you're constantly holding up service. Too light in gauge and you're replacing vessels every year. Star Metal Store supplies restaurant kitchen equipment at commercial grade — from the idly pot that handles your morning rush to the gas stove that anchors your main cooking line.",
    servesIntro: 'Our restaurant kitchen equipment range serves:',
    serves: ['South Indian restaurants and tiffin houses', 'Multi-cuisine restaurants', 'Hotel kitchens', 'Dhaba and highway restaurant setups'],
    products: [
      { name: 'Commercial Gas Stoves (Big Size)', desc: 'High-capacity commercial gas stoves — the workhorse of any full-service restaurant kitchen. Available in multiple burner configurations and sizes for different kitchen scales.' },
      {
        name: 'Hindolium Dabara Sets',
        desc: 'The classic Hindolium dabara — a South Indian restaurant essential. Used for serving coffee, tea, and filter decoctions. Available in standard and institutional sizes.',
        note: 'Note: Hindolium refers to aluminium alloy construction; confirm specific grade with our team.',
      },
      { name: 'Idly Pots — Standard Round', desc: 'Round idly pots in commercial sizes. Multiple tray configurations available for high-volume idly production.' },
      { name: 'Round Idly Pots', desc: 'Heavy-gauge round idly pots — standard configuration for South Indian restaurant kitchens. Sized for 24, 48, and higher count batches.' },
      { name: 'Square Idly Pots', desc: 'Square-format idly pots — preferred where counter space is a constraint or where specific batch sizes are required. Stacks efficiently for storage.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Restaurant kitchens in Pondicherry operate in a challenging environment — high ambient humidity, intense cooking heat, and hard water conditions in many parts of the region. Our cookware and vessel selection is benchmarked for these exact conditions. We do not stock items that work in controlled environments but degrade quickly in real-world South Indian kitchen conditions.',
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
      'Large-format carriers, storage drums, and service equipment for commercial caterers — built for the volume and mobility that the catering trade demands.',
    intro:
      'Catering is a volume business. A caterer serving a 500-person function cannot afford equipment that leaks, buckles, or fails under load. Star Metal Store supplies commercial catering equipment that is specced for real-world catering conditions — large batches, transportation stress, repeated heavy use.',
    servesIntro: 'Our catering equipment range serves:',
    serves: [
      'Wedding and function caterers',
      'Corporate event catering companies',
      'School and college bulk meal contractors',
      'Pilgrimage and temple catering operations',
      'Industrial canteen catering contractors',
    ],
    products: [
      { name: 'Big-Size Carriers (Catering Carriers)', desc: 'Large-format insulated food carriers — for transporting cooked food from production kitchen to event venue. Available in multiple capacities. Critical for any catering operation that cooks off-site.' },
      { name: 'Storage Drums', desc: 'Heavy-gauge storage drums for bulk ingredient storage and cooked food holding. Stainless steel construction. Available in large capacities for high-volume operations.' },
      { name: 'Dabara Sets (Catering Grade)', desc: 'Catering-grade dabara sets for serving operations. Higher volume and heavier construction than restaurant-grade equivalents.' },
      {
        name: 'Anda (Serving/Transfer Vessels)',
        desc: 'Anda-style serving and transfer vessels — used in traditional South Indian catering service for rice, curries, and other bulk items.',
        pending: 'Specific configurations to be confirmed with our team.',
      },
      { name: 'Anda Tables / Service Tables', desc: 'Heavy-duty service tables for catering setups. Designed for stability under load during function service.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'We understand the specific demands of the South Indian catering trade — the scale of a temple function, the pace of a wedding catering line, the logistics of a corporate event. Our team can advise on the right combination of carriers, drums, and service vessels for your operation size.',
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
      'Bain-marie units, cutlery, plates, tumblers, and seating — complete equipment sourcing for corporate canteens and institutional food service.',
    intro:
      'A corporate cafeteria or institutional canteen operates on a different logic from a street restaurant. It needs standardisation, scalability, and equipment that can handle 200 covers a day without showing wear. Star Metal Store supplies the complete range of equipment for corporate canteen and institutional food service setups — from the bain-marie counter to the last tumbler.',
    servesIntro: 'Our corporate restaurant and cafeteria range serves:',
    serves: [
      'IT company cafeterias and canteens',
      'Factory and industrial canteen operators',
      'Hospital and institutional food service operations',
      'College and school canteen contractors',
      'Government and PSU cafeteria setups',
    ],
    products: [
      { name: 'Plates (Tiffler / Meal Plates)', desc: 'Institutional-grade stainless steel meal plates — for bulk canteen service. Available in standard and partitioned (tiffler/compartment) formats.' },
      { name: 'Tumblers', desc: 'Stainless steel tumblers in institutional quantities — for water, tea, and beverage service at corporate canteen scale.' },
      { name: 'Cutlery Sets', desc: 'Commercial-grade stainless steel cutlery — spoons, forks, serving spoons — in bulk quantities for institutional procurement.' },
      { name: 'Lunch Plates (Full Plate)', desc: 'Full-size stainless steel lunch plates — for rice meal service. Standard South Indian institutional format.' },
      { name: 'Bain-Marie Units', desc: 'Bain-marie food warming counters — the centrepiece of any corporate cafeteria service counter. Keeps food at serving temperature for extended periods during lunch service.' },
      { name: 'Tables and Chairs', desc: 'Canteen-grade stainless steel and MS frame tables and chairs — for institutional dining setups. Durable, stackable, and built for high-traffic daily use.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Corporate canteen contracts often require consistent supply for large quantities across a single invoice. We are structured for this — our wholesale pricing, stock depth, and ability to fulfill bulk orders make us a reliable partner for canteen operators handling large-scale procurement.',
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
      'Commercial atta machines, vegetable-cutting machines, mixer grinders, and tilting grinders — for restaurants, bakeries, and food processing operations.',
    intro:
      'Modern commercial kitchens depend on processing machinery to maintain speed and consistency at scale. Star Metal Store supplies a range of food processing machinery suited for restaurants, catering kitchens, and small food production operations — sourced from reliable manufacturers and stocked for bulk or single-unit procurement.',
    servesIntro: 'Our machinery range serves:',
    serves: [
      'Large restaurant and hotel kitchens',
      'Catering production kitchens',
      'Small and medium food processing units',
      'Atta and flour supply operations',
      'Commercial wet grinder and batter production units',
    ],
    products: [
      { name: 'Atta Machines (Flour Grinders)', desc: 'Commercial atta machines for high-volume flour grinding. Suited for restaurant kitchens and atta supply operations producing fresh dough at scale.' },
      { name: 'Vegetable-Cutting Machines', desc: 'Commercial vegetable cutters for high-speed prep in busy restaurant and catering kitchens. Reduces prep time significantly at volume.' },
      { name: 'Mixer Grinders (Commercial)', desc: 'Heavy-duty commercial mixer grinders — for wet and dry grinding applications in large-scale cooking operations.' },
      { name: 'Tilting Grinders (Wet Grinders)', desc: 'Commercial tilting wet grinders — the standard for idly and dosa batter production at restaurant and catering scale. Tilting mechanism for easy discharge of large batter batches.' },
      { name: 'Coriander/Masala Grinder', alias: 'coridar', desc: 'Dedicated commercial grinder for spice and masala preparation — suited for catering operations and restaurant kitchens producing masala in bulk.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Machinery procurement is a significant investment for any kitchen operation. Our team can advise on capacity requirements based on your daily output — so you are not under-specced or over-invested. We can also assist with guidance on basic maintenance requirements for the equipment we supply.',
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
      'Authorised Hawkins product range — pressure cookers, cookware, and genuine spare parts for commercial and institutional buyers.',
    intro:
      'Hawkins is one of the most trusted names in Indian pressure cooker manufacturing — a standard in both home and commercial kitchens across the country. Star Metal Store stocks the Hawkins product range including pressure cookers, cookware, and genuine spare parts — available for bulk procurement by commercial operators and for resale by traders.',
    servesIntro: 'Our Hawkins range serves:',
    serves: [
      'Restaurants and institutional kitchens using pressure cooking at scale',
      'Traders and distributors looking for reliable wholesale supply',
      'Hotel and catering operations requiring consistent cooker stock',
      'Service operators needing genuine spare parts for maintenance',
    ],
    products: [
      { name: 'Hawkins Pressure Cookers', desc: 'Full range of Hawkins pressure cookers — in multiple capacities suited for commercial and institutional use. Genuine products, bulk pricing available.' },
      { name: 'Hawkins Cookware', desc: "Hawkins branded cookware range — pans, pots, and vessels from the manufacturer's cookware line." },
      { name: 'Spare Parts (Genuine)', desc: 'Genuine Hawkins spare parts — gaskets, weights, handles, and other service components. Stocking genuine parts means longer equipment life and proper pressure safety maintenance.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: "For traders and distributors, Star Metal Store's wholesale pricing on Hawkins products makes us a practical sourcing point for the Pondicherry and wider Tamil Nadu region. For commercial operators, stocking genuine spare parts reduces equipment downtime — a critical consideration in any kitchen that depends on pressure cooking at volume.",
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
      'Planetary mixers, ovens, display showcases, tea and coffee machines — complete equipment sourcing for commercial bakeries and cafés.',
    intro:
      'The bakery and café segment has seen significant growth across Tamil Nadu and Puducherry — from standalone bakeries and patisseries to café chains and hotel F&B outlets. Star Metal Store supplies the commercial-grade equipment this segment demands — from the planetary mixer that anchors a baking operation to the display showcase that presents the finished product.',
    servesIntro: 'Our bakery and café equipment range serves:',
    serves: [
      'Commercial bakeries and confectioneries',
      'Standalone cafés and coffee shops',
      'Hotel F&B outlets and all-day dining counters',
      'Corporate café operations',
      'Cloud kitchens with bakery product lines',
    ],
    products: [
      { name: 'Planetary Mixers', desc: 'Commercial planetary mixers — the centrepiece of any professional baking operation. For dough mixing, cream beating, and batter preparation at commercial volume.' },
      { name: 'Blenders (Commercial)', desc: 'High-capacity commercial blenders for smoothies, sauces, and beverage preparation at café and restaurant scale.' },
      { name: 'Display Showcases', desc: 'Refrigerated and ambient display showcases — for presenting baked goods, pastries, sandwiches, and beverages at retail counters. Multiple size configurations.' },
      { name: 'Tea/Coffee Dispensing Units', desc: 'Commercial tea and coffee dispensing units — for high-volume self-service or counter-service tea and coffee at canteen and café scale.' },
      { name: 'Tea Makers (Machine)', desc: 'Commercial tea-making machines for consistent, high-volume tea production — suited for cafeteria and canteen operations.' },
      { name: 'Coffee Makers (Espresso & Filter Machines)', desc: 'Commercial coffee machines — for espresso-based café operations and for traditional filter coffee service.' },
      { name: 'Warmers (Food & Beverage Warmers)', desc: 'Commercial food and beverage warmers — for holding temperature on baked goods, soups, and beverages during service periods.' },
      { name: 'Ovens (Baking/Cooking Ovens)', desc: 'Commercial baking and cooking ovens — deck ovens and convection ovens for full-scale bakery production.' },
      { name: 'Microwave Ovens (Commercial)', desc: 'Heavy-duty commercial microwave ovens — for reheating and finish cooking at high volume.' },
      { name: 'OTG (Oven/Toaster/Grill)', desc: 'Commercial OTG units — versatile baking and grilling equipment for smaller production batches and café kitchen applications.' },
    ],
    note: {
      heading: 'Buyer Note',
      body: 'Bakery and café equipment investment is typically significant and long-term. Our team can assist with understanding the right capacity spec for your output volume — so your planetary mixer, oven, and display showcase are matched to your actual production and sales scale, not just a catalogue guess.',
    },
    cta: 'Enquire About Bakery & Café Equipment',
    meta: 'Commercial bakery and café equipment — planetary mixers, ovens, display showcases, tea and coffee machines from Star Metal Store, Pondicherry. Wholesale pricing for businesses.',
  },
]

// Footer link labels (content.md › Product Categories (footer links)) match the form options.
export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
