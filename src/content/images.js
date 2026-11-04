// Visual assets — every file lives in public/images. Most are drawn by scripts/generate-images.mjs;
// product entries with a .jpeg file are real photos from public/images/products/real assets.
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
    'Tea Boilers': ['tea-boiler.jpeg', 'Stainless steel electric tea boiler with a tap, water-level gauge and temperature dial'],
    'Milk Boilers': ['milk-boiler.jpeg', 'Wide stainless steel milk boiler with a tap and side handles'],
    '3-Burner Gas Stoves': ['commercial-three-burner-gas-stove', 'Commercial three-burner gas stove with cast-iron burners'],
    '2-Burner Gas Stoves': ['commercial-two-burner-gas-stove', 'Commercial two-burner gas stove with cast-iron burners'],
    'Copper Boilers': ['copper-tea-boiler.jpeg', 'Traditional copper tea boiler with a chimney and side handles'],
  },
  'restaurant-kitchen': {
    'Commercial Gas Stoves (Big Size)': ['COMMERCIAL GAS STOVES.jpeg', 'Stainless steel three-burner commercial gas range on a stand with an undershelf'],
    'Hindolium Dabara Sets': ['HINDOLIUM DABARA.jpeg', 'Hindolium dabara vessel with ring handles'],
    'Idly Pots — Standard Round': ['IDLY POT.jpeg', 'Round idly pot with a perforated idly plate on top'],
    'Round Idly Pots': ['heavy-gauge-round-idly-steamer', 'Heavy-gauge round idly pot with a tower of idly plates'],
    'Square Idly Pots': ['TRAY IDLY POT.jpeg', 'Square tray-type idly pot with a stack of slide-in idly trays'],
    'Stock Pots': ['STOCK POT.jpeg', 'Stainless steel stock pot with a glass lid and side handles on a wooden table'],
    'Work Tables': ['WORK TABLE.jpeg', 'Stainless steel work table with two undershelves'],
  },
  'catering-equipment': {
    'Big-Size Carriers (Catering Carriers)': ['CATERING CARRIERS.jpeg', 'Two tall multi-tier stainless steel catering carriers in a carrying frame'],
    'Storage Drums': ['STORAGE DRUM.jpeg', 'Two stainless steel storage drums, 15 and 20 litre, with lids'],
    'Dabara Sets (Catering Grade)': ['DABARA SETS.jpeg', 'Stack of large catering-grade dabaras in graded sizes'],
    'Anda (Serving/Transfer Vessels)': ['ANDA.jpeg', 'Large straight-sided metal anda vessel'],
    'Anda Tables / Service Tables': ['MARRIAGE HALL TABLE.jpeg', 'Long steel-topped folding service table on a blue frame'],
    'Cotton Candy Machines': ['COTTON CANDY MACHINE.jpeg', 'Pink cotton candy machine with a stainless steel spinning bowl and a cone of pink candy floss'],
    'Popcorn Machines': ['POP CORN MACHINE.jpeg', 'Red-roofed popcorn machine with a glass cabinet and steel kettle'],
    'Biryani Dabara / Handi': ['BIRYANI DABARA.jpeg', 'Stack of stainless steel biryani handis in graded sizes'],
  },
  'corporate-cafeteria': {
    'Plates (Tiffler / Meal Plates)': ['MEALS PLATE.jpeg', 'Stainless steel compartment meal plate'],
    Tumblers: ['TUMBLERS.jpeg', 'Four stainless steel tumblers in graded sizes'],
    'Cutlery Sets': ['CUTLERY SET.jpeg', 'Stainless steel fork, knife, tablespoon and teaspoon'],
    'Lunch Plates (Full Plate)': ['full-size-steel-lunch-plates', 'Stack of full-size stainless steel lunch plates'],
    'Bain-Marie Units': ['BAIN MARIE.jpeg', 'Six-well stainless steel gas-operated bain-marie counter'],
    'Tables and Chairs': ['TABLE AND CHAIR.jpeg', 'Canteen dining table with four steel-frame chairs'],
  },
  machinery: {
    'Atta Machines (Flour Grinders)': ['ATTA KNEADER.jpeg', 'Commercial atta kneading machine with a motor and stainless steel bowl'],
    'Vegetable-Cutting Machines': ['VEGETABLE CUTTING MACHINE.jpeg', 'Red and white commercial vegetable-cutting machine with a feed chute'],
    'Mixer Grinders (Commercial)': ['MIXER GRINDER.jpeg', 'Heavy-duty commercial mixer grinder with a tall steel jar, beside bowls of ground spices'],
    'Tilting Grinders (Wet Grinders)': ['TILTING GRINDER.jpeg', 'Stainless steel commercial tilting wet grinder on a steel stand'],
    'Coriander/Masala Grinder': ['commercial-masala-spice-pulveriser', 'Commercial masala pulveriser with ground chilli powder'],
  },
  'hawkins-cookers': {
    'Hawkins Pressure Cookers': ['hawkins-bigboy-cookers1.jpeg', 'Hawkins BigBoy pressure cookers in 14, 18 and 22 litre sizes'],
    'Hawkins Cookers (1.5–12 Litre)': ['HAWKINS COOKER.jpeg', 'Hawkins pressure cooker size chart showing models from 1.5 to 12 litres'],
    'Hawkins Cookware': ['HAWKINS COOKWARE.jpeg', 'Hawkins Futura hard-anodised cookware: saucepan, tawa and deep-fry pan with lids'],
    'Spare Parts (Genuine)': ['HAWKINS SPARE.jpeg', 'Genuine Hawkins gaskets and spare parts in packaging, with the hologram to check for'],
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
  // Real photos vary in shape and may have product detail near the edges, so they are fitted, never cropped.
  return file.endsWith('.jpeg')
    ? { src: encodeURI(`${base}/products/real assets/${file}`), alt, fit: 'bg-white object-contain' }
    : { src: `${base}/products/${file}.webp`, alt, fit: 'object-cover' }
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
