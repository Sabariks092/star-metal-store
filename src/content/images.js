// Visual assets — every file lives in public/images and is drawn by scripts/generate-images.mjs.
// Keys mirror content: category slugs and product names from categories.js.

const base = '/images'

export const categoryImages = {
  'chinese-restaurant': { file: 'chinese-restaurant-kitchen-equipment', alt: 'Momo steamer, carbon-steel wok and noodle stockpots for a Chinese restaurant kitchen' },
  'tea-shop': { file: 'tea-shop-milk-bar-equipment', alt: 'Copper boiler, stainless tea boiler and milk boiler for a tea kadai counter' },
  'restaurant-kitchen': { file: 'restaurant-kitchen-equipment', alt: 'High-pressure gas range, Hindolium dabara sets and an idly pot' },
  'catering-equipment': { file: 'catering-service-equipment', alt: 'Brass anda, stainless storage drums and insulated catering carriers' },
  'corporate-cafeteria': { file: 'corporate-cafeteria-canteen-equipment', alt: 'Bain-marie counter, steel tumblers and compartment meal plates' },
  machinery: { file: 'food-processing-machinery', alt: 'Tilting wet grinder, atta flour mill and vegetable-cutting machine' },
  'hawkins-cookers': { file: 'pressure-cookers-cookware-spares', alt: 'Pressure cookers, hard-anodised cookware and cooker spare parts' },
  'bakery-cafe': { file: 'bakery-cafe-equipment', alt: 'Planetary mixer, two-deck baking oven and espresso machine' },
}

export const categoryThumb = (slug) => `${base}/categories/${categoryImages[slug].file}.webp`
export const categoryBanner = (slug) => `${base}/banners/${categoryImages[slug].file}-banner.webp`

// [file, alt] per product, keyed by the product name in categories.js
export const productImages = {
  'chinese-restaurant': {
    'Chinese Woks (Kadai)': ['heavy-gauge-chinese-wok-kadai', 'Heavy-gauge carbon-steel Chinese wok with a wooden-grip handle'],
    'Noodle Kadai / Noodle Station Vessels': ['noodle-station-stockpot-strainer', 'Stainless steel noodle stockpots with a long-handled noodle strainer'],
    Choppers: ['commercial-meat-vegetable-choppers', 'Two commercial stainless steel choppers on a wooden prep board'],
    'Momo Steamers': ['multi-tier-stainless-momo-steamer', 'Three-tier stainless steel momo steamer with a domed lid'],
    'Deep Freezers': ['commercial-chest-deep-freezer', 'White commercial chest deep freezer with digital temperature panel'],
    'Mini Cookers': ['compact-stainless-mini-cookers', 'Two compact stainless steel mini cookers'],
    'Chopping Boards': ['colour-coded-commercial-chopping-boards', 'Stack of colour-coded commercial chopping boards and a wooden board'],
  },
  'tea-shop': {
    'Tea Boilers': ['stainless-steel-tea-boiler-brass-tap', 'Stainless steel tea boiler with a brass tap'],
    'Milk Boilers': ['heavy-gauge-milk-boiler', 'Wide heavy-gauge stainless steel milk boiler with tap and side handles'],
    '3-Burner Gas Stoves': ['commercial-three-burner-gas-stove', 'Commercial three-burner gas stove with cast-iron burners'],
    '2-Burner Gas Stoves': ['commercial-two-burner-gas-stove', 'Commercial two-burner gas stove with cast-iron burners'],
    'Copper Boilers': ['traditional-copper-tea-boiler', 'Traditional hammered copper boiler with brass tap'],
  },
  'restaurant-kitchen': {
    'Commercial Gas Stoves (Big Size)': ['high-pressure-commercial-gas-range', 'High-pressure commercial gas range with a large stockpot on the burner'],
    'Hindolium Dabara Sets': ['hindolium-dabara-tumbler-sets', 'Hindolium dabara and tumbler sets'],
    'Idly Pots — Standard Round': ['standard-round-idly-pot-with-plates', 'Round stainless steel idly pot beside a stack of idly plates'],
    'Round Idly Pots': ['heavy-gauge-round-idly-steamer', 'Heavy-gauge round idly pot with a tower of idly plates'],
    'Square Idly Pots': ['square-idly-pot-and-tray', 'Square stainless steel idly pot with a square idly tray'],
  },
  'catering-equipment': {
    'Big-Size Carriers (Catering Carriers)': ['insulated-catering-food-carriers', 'Large insulated stainless steel catering carriers with clamp lids'],
    'Storage Drums': ['stainless-steel-storage-drums', 'Two stainless steel storage drums with lids'],
    'Dabara Sets (Catering Grade)': ['catering-grade-steel-dabara-sets', 'Nested stacks of catering-grade steel dabaras and tumblers'],
    'Anda (Serving/Transfer Vessels)': ['brass-anda-serving-vessel', 'Large hammered brass anda with a smaller steel anda'],
    'Anda Tables / Service Tables': ['stainless-steel-anda-service-table', 'Stainless steel service table with an anda and serving bucket'],
  },
  'corporate-cafeteria': {
    'Plates (Tiffler / Meal Plates)': ['compartment-tiffler-meal-plates', 'Stainless steel compartment tiffler meal plates'],
    Tumblers: ['stainless-steel-tumblers-bulk', 'Rows of stainless steel tumblers and a nested stack'],
    'Cutlery Sets': ['commercial-stainless-cutlery-set', 'Stainless steel spoons and forks in a cutlery holder'],
    'Lunch Plates (Full Plate)': ['full-size-steel-lunch-plates', 'Stack of full-size stainless steel lunch plates'],
    'Bain-Marie Units': ['four-pan-bain-marie-counter', 'Four-pan stainless steel bain-marie counter with sneeze guard'],
    'Tables and Chairs': ['canteen-steel-table-and-stools', 'Stainless steel canteen table with two stools'],
  },
  machinery: {
    'Atta Machines (Flour Grinders)': ['commercial-atta-flour-mill', 'Commercial atta flour mill with hopper, motor and flour sack'],
    'Vegetable-Cutting Machines': ['commercial-vegetable-cutting-machine', 'Commercial vegetable-cutting machine with sliced vegetables'],
    'Mixer Grinders (Commercial)': ['heavy-duty-commercial-mixer-grinder', 'Heavy-duty commercial mixer grinder with three steel jars'],
    'Tilting Grinders (Wet Grinders)': ['tilting-wet-grinder-idly-dosa-batter', 'Tilting wet grinder with granite rollers and batter'],
    'Coriander/Masala Grinder': ['commercial-masala-spice-pulveriser', 'Commercial masala pulveriser with ground chilli powder'],
  },
  'hawkins-cookers': {
    'Hawkins Pressure Cookers': ['aluminium-pressure-cookers-range', 'Aluminium pressure cookers in three sizes'],
    'Hawkins Cookware': ['hard-anodised-cookware-set', 'Hard-anodised kadai with glass lid, frying pan and tawa'],
    'Spare Parts (Genuine)': ['pressure-cooker-spare-parts-gaskets-weights', 'Pressure cooker gaskets, whistle weights, handles and safety valves'],
  },
  'bakery-cafe': {
    'Planetary Mixers': ['commercial-planetary-mixer', 'Commercial planetary mixer with stainless steel bowl'],
    'Blenders (Commercial)': ['commercial-high-speed-blenders', 'Two commercial high-speed blenders with smoothies'],
    'Display Showcases': ['curved-glass-bakery-display-showcase', 'Curved-glass bakery display showcase with cakes and pastries'],
    'Tea/Coffee Dispensing Units': ['tea-coffee-dispensing-unit', 'Stainless steel tea and coffee dispensing unit'],
    'Tea Makers (Machine)': ['commercial-tea-making-machine', 'Commercial tea-making machine with glass carafe on a hotplate'],
    'Coffee Makers (Espresso & Filter Machines)': ['espresso-machine-and-filter-coffee-maker', 'Two-group espresso machine and a South Indian filter coffee maker'],
    'Warmers (Food & Beverage Warmers)': ['countertop-snack-food-warmer', 'Countertop food warmer with samosas, puffs and vadas'],
    'Ovens (Baking/Cooking Ovens)': ['two-deck-commercial-baking-oven', 'Two-deck commercial baking oven with bread loaves'],
    'Microwave Ovens (Commercial)': ['commercial-microwave-oven', 'Stainless steel commercial microwave oven'],
    'OTG (Oven/Toaster/Grill)': ['commercial-otg-oven-toaster-grill', 'OTG oven with glowing elements and a tray of cookies'],
  },
}

export const productImage = (slug, name) => {
  const [file, alt] = productImages[slug][name]
  return { src: `${base}/products/${file}.webp`, alt }
}

// Page-level scenes. alt '' marks a purely decorative background.
export const scenes = {
  homeHero: { file: 'hero/wholesale-commercial-kitchen-equipment-pondicherry', w: 1920, h: 1080, alt: '' },
  aboutHero: { file: 'hero/heritage-brass-copper-steel-vessels', w: 1920, h: 1080, alt: '' },
  contactHero: { file: 'hero/bulk-order-enquiry-counter', w: 1920, h: 1080, alt: '' },
  kitchenLine: {
    file: 'lifestyle/commercial-kitchen-cooking-line',
    w: 1600,
    h: 1000,
    alt: 'A commercial kitchen line with a high-pressure gas range, stockpots and stainless steel shelving',
  },
  teaKadai: {
    file: 'lifestyle/tea-kadai-counter-setup',
    w: 1600,
    h: 1000,
    alt: 'A tea kadai counter with a tea boiler, copper boiler and glasses of tea',
  },
  storeShelves: {
    file: 'lifestyle/wholesale-store-shelves-stocked-vessels',
    w: 1600,
    h: 1000,
    alt: 'Store shelves stocked with stainless steel, brass and copper vessels',
  },
  kiloPricing: {
    file: 'banners/kilogram-wholesale-pricing-scale',
    w: 1600,
    h: 1000,
    alt: 'A stainless steel pot weighed on a platform scale — kilogram-based wholesale pricing',
  },
}

export const sceneSrc = (key) => `${base}/${scenes[key].file}.webp`
