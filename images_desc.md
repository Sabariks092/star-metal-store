# Star Metal Store — Image Generation Brief

Every image used on the website (except the logo), with the exact filename, size, where it appears, and a detailed prompt for generating it.

**Total: 69 images** — 46 product shots, 8 category cards, 8 category banners, 3 page heroes, 3 lifestyle scenes, 1 pricing banner.

---

## How to use this file

1. Generate each image using its **Prompt**. Append the matching **Style block** (below) to every prompt for a consistent look across the site.
2. Save it with the **exact filename** shown (any format is fine — PNG/JPG/WebP). Keep the folder structure:
   ```
   public/images/products/      46 files
   public/images/categories/     8 files
   public/images/banners/        9 files
   public/images/hero/           3 files
   public/images/lifestyle/      3 files
   ```
3. Generate at the listed aspect ratio, at or above the listed size. They will be converted to optimised `.webp` at the final size afterwards.
4. Avoid in every image: text, watermarks, brand logos or brand names on products, people's faces, hands, cartoon/illustration/3D-render look.

> Tip: if your tool doesn't support an aspect ratio directly, generate larger and crop. For heroes and banners the products must stay on the **right side** — the left side is covered by headline text.

---

## Style blocks

**STYLE A — Product shots (all 46 in `products/`)**
> Professional commercial product photograph for a wholesale kitchen-equipment catalogue. Shot on a seamless warm off-white studio backdrop (cream, approx. #F4F1EA) that fades slightly darker toward the bottom. Soft large key light from the upper left, gentle fill from the right, realistic soft contact shadow on the floor. Camera at a slightly elevated three-quarter angle. Product centred, filling about 75% of the frame, with clear space above. Photorealistic materials: brushed stainless steel with crisp highlights, real reflections, accurate metal texture. Sharp focus throughout, 85mm lens look, high detail, neutral colour grading. No text, no logos, no people. Square 1:1.

**STYLE B — Category cards (`categories/`) and category banners (`banners/`)**
> Moody premium product photograph on a dark charcoal studio backdrop with a subtle colour tint (given per image), a single soft spotlight from above creating a pool of light on a dark floor, rich realistic reflections on metal, slight floor reflection, shallow vignette. Photorealistic, high-end catalogue look. No text, no logos, no people.

**STYLE C — Lifestyle scenes (`lifestyle/`)**
> Realistic documentary-style photograph of a working South Indian commercial setting in Puducherry / Tamil Nadu. Natural, believable lighting, authentic used-but-clean equipment, warm and inviting tone, shallow depth of field on the background. Photorealistic, editorial quality. No readable text, no brand logos, no faces (people may appear only as out-of-focus figures or not at all).

---

## 1. Page heroes — `public/images/hero/`

Full-width background behind the page headline. **Keep the left 50% dark and fairly empty**; place all products in the right half. A dark gradient is laid over the left side by the website.

### 1.1 `wholesale-commercial-kitchen-equipment-pondicherry`
- **Size:** 1920 × 1080 (16:9)
- **Used on:** Home page hero
- **Prompt:** Wide dark atmospheric photograph of a wholesale metal-goods and hotel-equipment store at night, charcoal background. In the right half of the frame, a grouped display of commercial kitchen stock on a dark floor: a tall stainless steel storage drum with lid, a tall stainless steel tea boiler with a brass tap, a hammered copper tea boiler with a brass tap, a large hammered brass anda (round-bellied serving pot), a round idly pot with a stack of idly plates, and a cluster of stainless steel tumblers in front. Behind them, out-of-focus steel racks stacked with steel pots, brass vessels and towers of tumblers fading into darkness. One warm spotlight from above right. Left half of the image is deep charcoal and nearly empty. Style B lighting, no tint (neutral charcoal).

### 1.2 `heritage-brass-copper-steel-vessels`
- **Size:** 1920 × 1080 (16:9)
- **Used on:** About page hero
- **Prompt:** Warm, heritage-feel dark photograph celebrating three generations of the metal trade. In the right half: a large hammered brass anda, a hammered copper tea boiler with brass tap, a smaller hammered copper anda, a brass dabara-and-tumbler set (South Indian filter-coffee set), a nested stack of brass dabaras, and a nested tower of brass tumblers, arranged on a dark wooden floor. Warm amber spotlight, rich golden reflections on brass and copper. Background deep brown-charcoal fading to black; left half almost empty and dark. Style B with a warm brown/amber tint.

### 1.3 `bulk-order-enquiry-counter`
- **Size:** 1920 × 1080 (16:9)
- **Used on:** Contact page hero
- **Prompt:** Dark photograph of a wholesale order-dispatch area. In the right half: a stainless steel platform weighing scale with a large stainless steel stockpot on its platform and a digital display on a pole (display shows only green glowing digits, no words), two large insulated stainless steel catering carriers with clamp lids and top handles on the left of the scale, two stainless steel storage drums on the right, and small stacks of steel tumblers and dabara sets in front. Cool spotlight. Left half dark and empty. Style B with a slate-blue tint.

---

## 2. Lifestyle scenes — `public/images/lifestyle/`

### 2.1 `commercial-kitchen-cooking-line`
- **Size:** 1600 × 1000 (16:10) — displayed cropped to a wide strip (16:7), so keep key subjects in the vertical middle
- **Used on:** Home → "Who We Serve"
- **Prompt:** Realistic photograph of a clean, busy South Indian restaurant kitchen line. White subway-tiled wall; a long stainless steel wall shelf holding rows of steel stockpots and one brass pot, with steel ladles hanging beneath. In the centre, a black heavy-duty high-pressure commercial gas range on tall legs with a large stainless steel stockpot steaming on the burner. To the right, a stainless steel work table with a lidded idly pot and a wooden chopping board with a cleaver. Stainless storage drums on the dark tiled floor at left. Soft daylight from the side, light steam in the air. Style C.

### 2.2 `tea-kadai-counter-setup`
- **Size:** 1600 × 1000 (16:10)
- **Used on:** Home → "Forty Years Is Not a Number"
- **Prompt:** Realistic photograph of a classic Tamil Nadu tea kadai (tea stall) counter. Teal-painted wall behind, a string of small hanging brass bells or lamps along the top. On a counter with a stainless steel top and dark reddish-brown wooden front: a hammered copper tea boiler with brass tap on the left, a tall stainless steel tea boiler with brass tap and steam rising in the centre, and on the right a row of small glass tumblers filled with milky tea with light froth, plus a steel dabara-tumbler set. Warm morning light. Style C.

### 2.3 `wholesale-store-shelves-stocked-vessels`
- **Size:** 1600 × 1000 (16:10)
- **Used on:** About → "More Than a Metal Store"
- **Prompt:** Realistic photograph inside a traditional Pondicherry wholesale metal store. Tall wooden shelving against a cream wall. Top shelf: a row of stainless steel, brass and hammered copper pots and lidded vessels in mixed sizes. Middle shelf: nested stacks of steel and brass dabaras, towers of nested tumblers, stacks of steel plates. On the floor in front: a large brass anda, stainless storage drums, a copper tea boiler, insulated catering carriers and a copper anda. Abundant, orderly, well-stocked, warm overhead lighting. Style C.

---

## 3. Pricing banner — `public/images/banners/`

### 3.1 `kilogram-wholesale-pricing-scale`
- **Size:** 1600 × 1000 (16:10)
- **Used on:** About → "How We Do Business" (sits in a dark section)
- **Prompt:** Dark, moody photograph illustrating kilogram-based wholesale pricing. Centre: a stainless steel platform weighing scale with a large stainless steel stockpot (with side handles) on the platform; a digital readout on a pole glowing with green digits (numbers only, e.g. 12.450). Left: a hammered brass anda on the floor. Right: a group of stainless steel tumblers and a nested tumbler tower. Warm golden spotlight on the scale. Style B with a brass/gold tint.

---

## 4. Category cards — `public/images/categories/`

**Size: 1200 × 900 (4:3).** Shown at the top of each category card on the Home page. The top-left and top-right corners get a small icon and number overlaid, so keep the corners plain. Three products per image: one larger in the centre-back, two smaller in front left and right. Use **Style B** with the tint listed.

| # | Filename | Tint | Prompt |
|---|---|---|---|
| 4.1 | `chinese-restaurant-kitchen-equipment` | deep rust red | Centre: a three-tier stainless steel momo steamer with domed lid and gentle steam. Front left: a black carbon-steel Chinese wok with a long wooden-grip handle. Front right: a stainless steel noodle stockpot with a long-handled noodle strainer and a smaller pot of cooked noodles. |
| 4.2 | `tea-shop-milk-bar-equipment` | warm copper orange | Centre: a tall stainless steel tea boiler with brass tap, steam rising. Front left: a hammered copper tea boiler with brass tap. Front right: a wide stainless steel milk boiler with lid, side handles and tap. |
| 4.3 | `restaurant-kitchen-equipment` | cool aluminium grey | Centre: a black high-pressure commercial gas range on tall legs with a steaming stockpot on one burner. Front left: aluminium (Hindolium) dabara-and-tumbler sets. Front right: a round stainless idly pot beside a stack of idly plates filled with idlies. |
| 4.4 | `catering-service-equipment` | antique brass gold | Centre: two stainless steel storage drums with lids. Front left: a large hammered brass anda. Front right: two insulated stainless steel catering carriers with clamp lids and carry handles. |
| 4.5 | `corporate-cafeteria-canteen-equipment` | slate steel blue | Centre: a stainless steel four-pan bain-marie counter with glass sneeze guard, pans holding sambar, rice, green poriyal and dal, light steam. Front left: rows of steel tumblers. Front right: a stack of steel compartment (tiffler) meal plates. |
| 4.6 | `food-processing-machinery` | gunmetal grey | Centre: a tilting wet grinder with a stainless drum tilted forward, granite rollers and white batter visible. Front left: a commercial atta flour mill with a steel hopper and a flour sack. Front right: a stainless vegetable-cutting machine with freshly sliced carrots and cucumbers. |
| 4.7 | `pressure-cookers-cookware-spares` | deep bottle green | Centre: three aluminium pressure cookers in graded sizes with black handles and whistle weights (no brand marks). Front left: a hard-anodised black kadai with glass lid, a frying pan and a tawa. Front right: neatly arranged black rubber gaskets, whistle weights and cooker handles. |
| 4.8 | `bakery-cafe-equipment` | warm crust brown | Centre: a stainless two-deck commercial baking oven with glowing windows showing bread loaves. Front left: a cream-coloured commercial planetary mixer with stainless bowl. Front right: a two-group stainless espresso machine and a South Indian steel filter-coffee maker. |

---

## 5. Category page banners — `public/images/banners/`

**Size: 1920 × 900 (≈ 2.13:1).** Full-width background behind each category page title. **Same products and tint as the matching category card (section 4)**, but in a wide composition: **all products in the right 45% of the frame**, left 55% dark and empty for the headline. Use **Style B**.

| # | Filename | Products & tint |
|---|---|---|
| 5.1 | `chinese-restaurant-kitchen-equipment-banner` | Same as 4.1 — momo steamer, wok, noodle stockpot. Rust red tint. |
| 5.2 | `tea-shop-milk-bar-equipment-banner` | Same as 4.2 — steel tea boiler, copper boiler, milk boiler. Copper orange tint. |
| 5.3 | `restaurant-kitchen-equipment-banner` | Same as 4.3 — gas range with stockpot, Hindolium dabara sets, idly pot. Aluminium grey tint. |
| 5.4 | `catering-service-equipment-banner` | Same as 4.4 — storage drums, brass anda, catering carriers. Brass gold tint. |
| 5.5 | `corporate-cafeteria-canteen-equipment-banner` | Same as 4.5 — bain-marie counter, tumblers, tiffler plates. Slate blue tint. |
| 5.6 | `food-processing-machinery-banner` | Same as 4.6 — tilting grinder, atta mill, vegetable cutter. Gunmetal tint. |
| 5.7 | `pressure-cookers-cookware-spares-banner` | Same as 4.7 — pressure cookers, anodised cookware, spare parts. Bottle green tint. |
| 5.8 | `bakery-cafe-equipment-banner` | Same as 4.8 — deck oven, planetary mixer, espresso machine. Crust brown tint. |

---

## 6. Product images — `public/images/products/`

**All: 800 × 800 (1:1), Style A.** Shown as square thumbnails next to each product on the category pages, so the product must be clearly recognisable even at small size.

### 6.1 Chinese Restaurant Equipment

**`heavy-gauge-chinese-wok-kadai`** — Chinese Woks (Kadai)
> A large heavy-gauge carbon-steel Chinese wok, dark seasoned black-brown patina inside with a slightly lighter well in the centre, round bottom, a long hollow steel handle ending in a wooden grip on the right and a small loop helper handle on the left. Viewed from above at three-quarter angle so the inside of the wok is visible.

**`noodle-station-stockpot-strainer`** — Noodle Kadai / Noodle Station Vessels
> A tall straight-sided stainless steel stockpot with rolled rim and two side loop handles, with a long-handled stainless wire-mesh noodle strainer basket resting inside it; in front right, a smaller stainless pot filled with cooked yellow noodles.

**`commercial-meat-vegetable-choppers`** — Choppers
> Two heavy commercial stainless steel choppers (Chinese-style cleavers) with broad rectangular blades, polished bevelled edges, a hanging hole near the blade tip, and riveted dark wooden handles, lying at angles on a thick wooden chopping block.

**`multi-tier-stainless-momo-steamer`** — Momo Steamers
> A three-tier stacked stainless steel momo steamer on a base water pot, each tier with small side handles and perforated base, topped with a domed lid with a small knob; wisps of steam rising from the top.

**`commercial-chest-deep-freezer`** — Deep Freezers
> A white commercial chest deep freezer, three-quarter view, hinged top lid with a recessed handle, a small digital temperature panel on the front right showing glowing green digits, dark ventilated plinth at the bottom, small castor wheels.

**`compact-stainless-mini-cookers`** — Mini Cookers
> Two compact stainless steel mini pressure cookers in slightly different sizes, polished bodies with black bakelite long handles, inner-fitting lids and black whistle weights, side by side.

**`colour-coded-commercial-chopping-boards`** — Chopping Boards
> A neat stack of thick colour-coded commercial polyethylene chopping boards (white, blue, red and green) lying flat, with a large rectangular wooden chopping board leaning upright behind them.

### 6.2 Tea Shop & Milk Bar Setup

**`stainless-steel-tea-boiler-brass-tap`** — Tea Boilers
> A tall cylindrical stainless steel South Indian tea boiler with tapered shoulders, a domed lid with a small brass knob, two side loop handles, decorative rolled rings, and a brass tap near the base; light steam from the top.

**`heavy-gauge-milk-boiler`** — Milk Boilers
> A wide, squat, heavy-gauge stainless steel milk boiler with a flat lid and centre knob, two sturdy side handles, rolled reinforcing rings, and a brass tap near the base.

**`commercial-three-burner-gas-stove`** — 3-Burner Gas Stoves
> A low, wide commercial three-burner gas stove with a black mild-steel angle-iron frame on short legs, three heavy cast-iron burners with brass caps and pan supports in a row, a brass gas manifold pipe along the front with three black control knobs.

**`commercial-two-burner-gas-stove`** — 2-Burner Gas Stoves
> A compact commercial two-burner gas stove with black mild-steel frame on short legs, two heavy cast-iron burners with brass caps and pan supports, a brass gas pipe with two black knobs along the front.

**`traditional-copper-tea-boiler`** — Copper Boilers
> A traditional hammered copper tea/coffee boiler with a rounded bulging body, visible hand-hammered dimple texture, a domed copper lid with brass knob, brass side handles and a brass tap near the base; warm glowing copper tones.

### 6.3 Restaurant Kitchen Equipment

**`high-pressure-commercial-gas-range`** — Commercial Gas Stoves (Big Size)
> A heavy-duty black high-pressure commercial gas range on tall square-tube legs with a lower shelf, two large cast-iron ring burners with heavy pan supports, front control knobs, and a big stainless steel stockpot sitting on the left burner with steam rising.

**`hindolium-dabara-tumbler-sets`** — Hindolium Dabara Sets
> Several matte-silver aluminium-alloy (Hindolium) dabara-and-tumbler sets — the traditional South Indian filter-coffee set of a wide lipped bowl (dabara) with a tall tumbler standing inside — plus a nested stack of dabaras and a single tumbler, arranged in a small group. Soft satin finish, not mirror-polished.

**`standard-round-idly-pot-with-plates`** — Idly Pots — Standard Round
> A round stainless steel commercial idly pot with domed lid and side handles; beside it, a removable stack of round idly plates on a central rod, each plate with four cavities filled with soft white steamed idlies.

**`heavy-gauge-round-idly-steamer`** — Round Idly Pots
> A large heavy-gauge round stainless steel idly pot, open, with a tall tower of six round idly plates rising out of it, each plate full of white idlies; the domed lid resting leaned against the pot on the right.

**`square-idly-pot-and-tray`** — Square Idly Pots
> A square/box-shaped stainless steel idly pot with a flat square lid and black knob and side handle; in front right, a square idly tray with a 3×3 grid of cavities filled with white idlies.

### 6.4 Catering Service Equipment

**`insulated-catering-food-carriers`** — Big-Size Carriers (Catering Carriers)
> Two large insulated double-walled stainless steel catering food carriers (one big, one medium), cylindrical, with clamp-down lids with side latches, arched top carry handle with black grip, and side handles.

**`stainless-steel-storage-drums`** — Storage Drums
> Two heavy-gauge stainless steel storage drums, one tall and one shorter, with multiple rolled reinforcing rings, close-fitting lids with a horizontal bar handle, and side handles.

**`catering-grade-steel-dabara-sets`** — Dabara Sets (Catering Grade)
> Catering-grade polished stainless steel serving ware: a nested stack of six dabaras on the left, a tall nested tower of seven tumblers on the right, and one complete dabara-and-tumbler set in front.

**`brass-anda-serving-vessel`** — Anda (Serving/Transfer Vessels)
> A large traditional South Indian brass anda — a wide round-bellied vessel with a slightly flared mouth and hand-hammered dimpled surface, warm golden tone — with a smaller polished stainless steel anda beside it.

**`stainless-steel-anda-service-table`** — Anda Tables / Service Tables
> A heavy-duty stainless steel catering service table with four legs and a lower undershelf; on top, a hammered brass anda and a stainless steel serving bucket with a wire handle.

### 6.5 Corporate Restaurant & Cafeteria

**`compartment-tiffler-meal-plates`** — Plates (Tiffler / Meal Plates)
> Rectangular stainless steel compartment (tiffler) meal trays with five pressed compartments (two large in front, three small at the back) — one tray in front, a neat stack of identical trays behind.

**`stainless-steel-tumblers-bulk`** — Tumblers
> Two rows of plain polished stainless steel tumblers with rolled rims, plus a tall nested stack of tumblers on the right, conveying bulk quantity.

**`commercial-stainless-cutlery-set`** — Cutlery Sets
> A perforated stainless steel cylindrical cutlery holder filled with standing spoons and forks; a spoon and a fork lying flat in front of it.

**`full-size-steel-lunch-plates`** — Lunch Plates (Full Plate)
> A tall stack of full-size round stainless steel lunch plates (thalis) with raised rims, and one plate standing upright leaning beside the stack showing its polished face and concentric rim.

**`four-pan-bain-marie-counter`** — Bain-Marie Units
> A stainless steel four-pan bain-marie food-warming counter on legs, four inset pans holding orange sambar, white rice, green poriyal (vegetable stir-fry) and yellow dal, a glass sneeze-guard shelf on steel posts above, control knobs on the front panel, light steam.

**`canteen-steel-table-and-stools`** — Tables and Chairs
> A rectangular stainless steel canteen dining table on four legs with two round-top stainless steel stools, one at each side, clean institutional look.

### 6.6 Machinery & Food Processing Equipment

**`commercial-atta-flour-mill`** — Atta Machines (Flour Grinders)
> A commercial atta flour mill (pulveriser): blue painted steel base cabinet, a stainless steel grinding chamber with a large funnel-shaped stainless hopper on top, a side electric motor with cooling fins connected by a belt, and a stainless outlet chute feeding into a cloth flour sack.

**`commercial-vegetable-cutting-machine`** — Vegetable-Cutting Machines
> A stainless steel commercial vegetable-cutting machine with a cylindrical cutting head, feed tube with pusher lever on top, green and red push buttons on the front, and an outlet chute dropping freshly sliced carrot, cucumber and onion rounds into a steel tray.

**`heavy-duty-commercial-mixer-grinder`** — Mixer Grinders (Commercial)
> A heavy-duty commercial mixer grinder with a tall cream-coloured motor base and a large rotary speed knob, a big stainless steel jar with black lid and handle mounted on top, and two smaller stainless jars standing beside it.

**`tilting-wet-grinder-idly-dosa-batter`** — Tilting Grinders (Wet Grinders)
> A commercial tilting wet grinder: blue painted base housing the motor, side frame posts, a large stainless steel drum tilted forward showing two grey granite roller stones inside and smooth white idly/dosa batter, and a black hand wheel on the side for tilting.

**`commercial-masala-spice-pulveriser`** — Coriander/Masala Grinder
> A commercial masala/spice pulveriser: stainless steel base, a round grinding chamber with a bolted circular front door and centre locking handle, a stainless hopper on top, a maroon electric motor behind, and a steel bowl of fresh red chilli powder in front.

### 6.7 Cooker & Cookware (Hawkins)

> Note: do **not** show the Hawkins logo or any brand name — generic products only.

**`aluminium-pressure-cookers-range`** — Hawkins Pressure Cookers
> Three aluminium pressure cookers in graded sizes (large, medium, small), satin aluminium bodies, inner-lid style, black bakelite long handles and black whistle weights, arranged as a range.

**`hard-anodised-cookware-set`** — Hawkins Cookware
> A hard-anodised matte black cookware set: a deep kadai with two black handles and a glass lid, a frying pan with a long black handle in front, and a flat tawa standing upright behind on the right.

**`pressure-cooker-spare-parts-gaskets-weights`** — Spare Parts (Genuine)
> Neatly arranged pressure-cooker spare parts: three black rubber sealing gaskets of different sizes, two black bakelite handles with screw holes, several whistle weights (black and aluminium) and small stainless safety valves, laid out in an orderly catalogue arrangement.

### 6.8 Bakery & Café Equipment

**`commercial-planetary-mixer`** — Planetary Mixers
> A floor/bench commercial planetary mixer with a cream-coloured body, vertical column, overhead mixing head with a dough hook lowered into a large stainless steel bowl, and a small control panel with green and red buttons.

**`commercial-high-speed-blenders`** — Blenders (Commercial)
> Two commercial high-speed blenders with black bases and clear polycarbonate jars with black lids and handles, one filled with pink strawberry smoothie and the other with green smoothie.

**`curved-glass-bakery-display-showcase`** — Display Showcases
> A bakery display showcase counter with a curved front glass, warm wooden lower cabinet, internal LED lighting, a glass middle shelf with small cakes and pastries, and croissants and doughnuts on the lower deck.

**`tea-coffee-dispensing-unit`** — Tea/Coffee Dispensing Units
> A stainless steel tea and coffee dispensing machine with a black glossy front panel, a small digital display (digits only), two selection buttons, two dispensing nozzles with small cups below, and a black drip tray with grille.

**`commercial-tea-making-machine`** — Tea Makers (Machine)
> A tall stainless steel commercial tea-making machine with an orange-glowing digital display (digits only), a single dispensing spout over a recessed area holding a steel jug, and beside it a glass carafe of brewed tea on a black hotplate warmer.

**`espresso-machine-and-filter-coffee-maker`** — Coffee Makers (Espresso & Filter Machines)
> A two-group stainless steel commercial espresso machine with two pressure gauges, portafilters with black handles, a steam wand, small white cups on the drip tray and on the cup warmer; beside it, a traditional two-tier South Indian stainless steel filter coffee maker with lid.

**`countertop-snack-food-warmer`** — Warmers (Food & Beverage Warmers)
> A countertop glass-fronted snack food warmer with stainless frame, warm orange interior light, two shelves holding golden samosas on top and vegetable puffs and medu vadas below.

**`two-deck-commercial-baking-oven`** — Ovens (Baking/Cooking Ovens)
> A stainless steel two-deck commercial baking oven on a dark steel stand, each deck with a glass window showing a warm orange glow and loaves of bread baking inside, horizontal door handles, and a black control panel with knobs on the right.

**`commercial-microwave-oven`** — Microwave Ovens (Commercial)
> A heavy-duty stainless steel commercial microwave oven, door with dark mesh window, vertical steel handle, a black keypad panel on the right with a small green digital display (digits only) and a green start button.

**`commercial-otg-oven-toaster-grill`** — OTG (Oven/Toaster/Grill)
> A black commercial OTG (oven-toaster-grill) with a glass door showing glowing red-orange heating elements and a tray of cookies on the wire rack inside, a steel door handle, and three chrome control knobs on the right.

---

## Checklist

| Folder | Files | Size |
|---|---|---|
| `public/images/hero/` | 3 | 1920 × 1080 |
| `public/images/lifestyle/` | 3 | 1600 × 1000 |
| `public/images/banners/` | 8 category banners + 1 pricing banner | 1920 × 900 / 1600 × 1000 |
| `public/images/categories/` | 8 | 1200 × 900 |
| `public/images/products/` | 46 | 800 × 800 |
| **Total** | **69** | |

Once the images are in place (any format), they need converting to `.webp` at the sizes above so the website picks them up — the filenames must match exactly.
