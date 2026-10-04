export interface CatalogueProduct {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  packQuantity: string;
  price: number;
  company?: string;
  image: string;
  featured?: boolean;
  description?: string;
}

export interface CatalogueCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
}

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  { id: 1, name: 'Sparkles', slug: 'sparkles', description: 'Traditional and electric sparklers in various colors and sizes for festive lighting.', iconName: 'sparkles', color: '#FF6F00' },
  { id: 2, name: 'Fancy', slug: 'fancy', description: 'Novelty aerial and ground novelty items with unique sound and visual effects.', iconName: 'fancy', color: '#7B1FA2' },
  { id: 3, name: 'Roll Caps', slug: 'roll-caps', description: 'Classic toy cap rolls and ring caps for festive fun.', iconName: 'roll-caps', color: '#C2185B' },
  { id: 4, name: 'Twinkling', slug: 'twinkling', description: 'Gentle twinkling stars and silver sparkles that illuminate the night.', iconName: 'twinkling', color: '#303F9F' },
  { id: 5, name: 'Flower Pot', slug: 'flower-pot', description: 'Iconic fountains and floral sprays of vibrant colors and sparks.', iconName: 'flower-pot', color: '#E64A19' },
  { id: 6, name: 'Colour Koti', slug: 'colour-koti', description: 'Specialized color fountains with brilliant multi-shade flame projections.', iconName: 'colour-koti', color: '#00796B' },
  { id: 7, name: 'Chakkar', slug: 'chakkar', description: 'Ground spinning wheels with rapid rotation and glittering circles.', iconName: 'chakkar', color: '#F57C00' },
  { id: 8, name: 'Comet', slug: 'comet', description: 'Multi-shot aerial repeating repeaters, aerial fireworks, and sky shot cakes.', iconName: 'comet', color: '#1A237E' },
  { id: 9, name: 'Crackers', slug: 'crackers', description: 'Loud traditional sound crackers, bijilis, and string shells.', iconName: 'crackers', color: '#C62828' },
  { id: 10, name: 'Holi Colour', slug: 'holi-colour', description: 'Special festive burst colors and non-toxic powders.', iconName: 'holi-colour', color: '#00838F' },
  { id: 11, name: 'Hand Throw', slug: 'hand-throw', description: 'Snappy friction throw pop-pops and magic throwing pops.', iconName: 'hand-throw', color: '#E91E63' },
  { id: 12, name: 'Bomb', slug: 'bomb', description: 'Classic hydro and hydrogen green sound shells for thunderous bursts.', iconName: 'bomb', color: '#37474F' },
  { id: 13, name: 'Paper Bomb', slug: 'paper-bomb', description: 'Heavyweight paper shells with powerful echo sound effects.', iconName: 'paper-bomb', color: '#4E342E' },
  { id: 14, name: 'Rocket', slug: 'rocket', description: 'Skyward climbing rockets with parachute, whistles, and color bursts.', iconName: 'rocket', color: '#D81B60' },
  { id: 15, name: 'Gift Box', slug: 'gift-box', description: 'Assorted family gift packs containing fireworks collections.', iconName: 'gift-box', color: '#B71C1C' },
];

export const ALL_140_PRODUCTS: CatalogueProduct[] = [
  // Page 2
  { id: 1, name: '7 CM Valentine Red', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 20, image: '/images/products/sparkles.svg', featured: true },
  { id: 2, name: '7 CM Vivid Green', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 18, image: '/images/products/sparkles.svg' },
  { id: 3, name: '7 CM 50-50', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 17, image: '/images/products/sparkles.svg' },
  { id: 4, name: '12 CM Triton Electric showers', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 piece', price: 32, image: '/images/products/sparkles.svg' },
  { id: 5, name: '12 CM Colour Glitzy', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 53, image: '/images/products/sparkles.svg' },

  // Page 3
  { id: 6, name: '12 CM Valentine Red', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 43, image: '/images/products/sparkles.svg' },
  { id: 7, name: '12 CM Vivid Green', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 36, image: '/images/products/sparkles.svg' },
  { id: 8, name: '15 CM Colour Glitzy', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 53, image: '/images/products/sparkles.svg' },
  { id: 9, name: '15 CM Vivid Green', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 50, image: '/images/products/sparkles.svg' },
  { id: 10, name: '15 CM Triton Electric', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 50, image: '/images/products/sparkles.svg' },

  // Page 4
  { id: 11, name: '30 CM Triton Electric', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 5 pcs', price: 44, image: '/images/products/sparkles.svg' },
  { id: 12, name: '30 CM Gold Sparkles (Standard Company)', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 5 pcs', price: 95, company: 'Standard Company', image: '/images/products/sparkles.svg', featured: true },
  { id: 13, name: '30 CM Crackling Sparkles (Standard Company)', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 5 pcs', price: 100, company: 'Standard Company', image: '/images/products/sparkles.svg' },
  { id: 14, name: '30 CM Colour Glitzy', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 5 pcs', price: 47, image: '/images/products/sparkles.svg' },

  // Page 5
  { id: 15, name: '50 CM Triton Electric', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 5 pcs', price: 220, image: '/images/products/sparkles.svg' },
  { id: 16, name: '4 Colour Torch (Standard Company)', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 10 pcs', price: 250, company: 'Standard Company', image: '/images/products/sparkles.svg' },
  { id: 17, name: 'Golden Torch', category: 'Sparkles', categorySlug: 'sparkles', packQuantity: '1 Box – 5 pcs', price: 300, image: '/images/products/sparkles.svg' },

  // Page 6
  { id: 18, name: 'Disco Flash (Standard Company)', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 10 pcs', price: 190, company: 'Standard Company', image: '/images/products/fancy.svg', featured: true },
  { id: 19, name: 'Tug of war (Standard Company)', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 1 pcs', price: 300, company: 'Standard Company', image: '/images/products/fancy.svg' },
  { id: 20, name: 'Money in the Bank (Jai Joy Company)', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 3 pcs', price: 240, company: 'Jai Joy Company', image: '/images/products/fancy.svg', featured: true },
  { id: 21, name: 'Money in the Bank (Starvel Company)', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 3 pcs', price: 240, company: 'Starvel Company', image: '/images/products/fancy.svg' },
  { id: 22, name: 'Helicopter', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 5 pcs', price: 100, image: '/images/products/fancy.svg' },

  // Page 7
  { id: 23, name: 'Emu Egg', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 3 pcs', price: 200, image: '/images/products/fancy.svg' },
  { id: 24, name: 'Butterfly', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 10 pcs', price: 120, image: '/images/products/fancy.svg' },
  { id: 25, name: 'Indian Army', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 1 pcs', price: 750, image: '/images/products/fancy.svg' },
  { id: 26, name: '7 Shot Sa Re Ga Ma Pa Dha Ni', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 1 pcs', price: 150, image: '/images/products/fancy.svg' },
  { id: 27, name: 'Car Race', category: 'Fancy', categorySlug: 'fancy', packQuantity: '1 Box – 2 pcs', price: 600, image: '/images/products/fancy.svg' },

  // Page 8
  { id: 28, name: 'Tiger Roll Caps', category: 'Roll Caps', categorySlug: 'roll-caps', packQuantity: '1 Box – 10 pcs', price: 120, image: '/images/products/roll-caps.svg' },
  { id: 29, name: 'Ring Caps', category: 'Roll Caps', categorySlug: 'roll-caps', packQuantity: '1 Box – 1 pcs', price: 10, image: '/images/products/roll-caps.svg' },
  { id: 30, name: 'Twinkling Star', category: 'Twinkling', categorySlug: 'twinkling', packQuantity: '1 Box – 10 pcs', price: 50, image: '/images/products/twinkling.svg', featured: true },
  { id: 31, name: 'Twinkling Star (Standard Company)', category: 'Twinkling', categorySlug: 'twinkling', packQuantity: '1 Box – 10 pcs', price: 80, company: 'Standard Company', image: '/images/products/twinkling.svg' },
  { id: 32, name: '120 CM Silver Twinkling Deluxe (Standard Company)', category: 'Twinkling', categorySlug: 'twinkling', packQuantity: '1 Box – 10 pcs', price: 240, company: 'Standard Company', image: '/images/products/twinkling.svg' },

  // Page 9
  { id: 33, name: '120 CM Twinkling Star', category: 'Twinkling', categorySlug: 'twinkling', packQuantity: '1 Box – 10 pcs', price: 120, image: '/images/products/twinkling.svg' },
  { id: 34, name: 'Flower Pot Big (Standard Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 10 pcs', price: 230, company: 'Standard Company', image: '/images/products/flower-pot.svg', featured: true },
  { id: 35, name: 'Flower Pot Small (Standard Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 10 pcs', price: 140, company: 'Standard Company', image: '/images/products/flower-pot.svg' },
  { id: 36, name: 'Flower Pot Small', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 10 pcs', price: 75, image: '/images/products/flower-pot.svg' },
  { id: 37, name: 'Multi Colour Flower Pot Ashoka', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 10 pcs', price: 260, image: '/images/products/flower-pot.svg' },

  // Page 10
  { id: 38, name: 'TV-Tower (Standard Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 1 pcs', price: 200, company: 'Standard Company', image: '/images/products/flower-pot.svg' },
  { id: 39, name: 'Flower Pot Giant', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 2 pcs', price: 350, image: '/images/products/flower-pot.svg' },
  { id: 40, name: 'Colour Koti Deluxe (Yes Bro Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 10 pcs', price: 600, company: 'Yes Bro Company', image: '/images/products/flower-pot.svg' },
  { id: 41, name: 'I Cone Fountain', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 1 pcs', price: 200, image: '/images/products/flower-pot.svg' },
  { id: 42, name: 'Flower Pots Deluxe (Standard Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 5 pcs', price: 420, company: 'Standard Company', image: '/images/products/flower-pot.svg' },

  // Page 11
  { id: 43, name: 'Saravanavel’s Pajock Multicolour Small', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 10 pcs', price: 200, image: '/images/products/flower-pot.svg' },
  { id: 44, name: 'Tricolour Fountain (Standard Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 5 pcs', price: 650, company: 'Standard Company', image: '/images/products/flower-pot.svg' },
  { id: 45, name: 'Orion Fountain', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 1 pcs', price: 120, image: '/images/products/flower-pot.svg' },
  { id: 46, name: 'Google Galatta', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 4 pcs', price: 170, image: '/images/products/flower-pot.svg' },
  { id: 47, name: 'Colour Flowers Giant (Standard Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 10 pcs', price: 650, company: 'Standard Company', image: '/images/products/flower-pot.svg' },

  // Page 12
  { id: 48, name: 'Blo', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 1 pcs', price: 150, image: '/images/products/flower-pot.svg' },
  { id: 49, name: 'Favpot', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 1 pcs', price: 200, image: '/images/products/flower-pot.svg' },
  { id: 50, name: 'Tri Colour Fountain', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 5 pcs', price: 350, image: '/images/products/flower-pot.svg' },
  { id: 51, name: 'Bada Peacock', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 1 pcs', price: 450, image: '/images/products/flower-pot.svg' },
  { id: 52, name: 'Guitar', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 1 pcs', price: 200, image: '/images/products/flower-pot.svg' },

  // Page 13
  { id: 53, name: 'Bada Peacock (Bheema Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 1 pcs', price: 550, company: 'Bheema Company', image: '/images/products/flower-pot.svg' },
  { id: 54, name: 'Colour Koti Red (Yes Bro Company)', category: 'Flower Pot', categorySlug: 'flower-pot', packQuantity: '1 Box – 10 pcs', price: 650, company: 'Yes Bro Company', image: '/images/products/flower-pot.svg' },
  { id: 55, name: 'Colour Koti (Thrisul Company)', category: 'Colour Koti', categorySlug: 'colour-koti', packQuantity: '1 Box – 10 pcs', price: 300, company: 'Thrisul Company', image: '/images/products/colour-koti.svg' },
  { id: 56, name: 'Colour Koti (Thathya Company)', category: 'Colour Koti', categorySlug: 'colour-koti', packQuantity: '1 Box – 10 pcs', price: 350, company: 'Thathya Company', image: '/images/products/colour-koti.svg' },
  { id: 57, name: 'Ground Chakkar Ashoka (Thrisul Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 10 pcs', price: 90, company: 'Thrisul Company', image: '/images/products/chakkar.svg' },

  // Page 14
  { id: 58, name: 'Lotus', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 3 pcs', price: 120, image: '/images/products/chakkar.svg' },
  { id: 59, name: 'Zamin Chakkar Deluxe (Standard Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 10 pcs', price: 250, company: 'Standard Company', image: '/images/products/chakkar.svg', featured: true },
  { id: 60, name: 'Zamin Chakkar Super Deluxe (Standard Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 10 pcs', price: 320, company: 'Standard Company', image: '/images/products/chakkar.svg' },
  { id: 61, name: 'Swastik Wheels (Standard Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 5 pcs', price: 350, company: 'Standard Company', image: '/images/products/chakkar.svg' },
  { id: 62, name: '4x4 Wheel', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 5 pcs', price: 300, image: '/images/products/chakkar.svg' },

  // Page 15
  { id: 63, name: 'Ground Chakkar Super Big', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 5 pcs', price: 300, image: '/images/products/chakkar.svg' },
  { id: 64, name: 'Ground Chakkar Special (Thrisul Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 10 pcs', price: 85, company: 'Thrisul Company', image: '/images/products/chakkar.svg' },
  { id: 65, name: 'Spinner Special', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 10 pcs', price: 150, image: '/images/products/chakkar.svg' },
  { id: 66, name: 'Ground Chakkar Deluxe (Thrisul Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 10 pcs', price: 120, company: 'Thrisul Company', image: '/images/products/chakkar.svg' },
  { id: 67, name: 'Spinner Deluxe Magic Flash', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 10 pcs', price: 300, image: '/images/products/chakkar.svg' },

  // Page 16
  { id: 68, name: 'Ground Chakkar Big (Thrisul Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 25 pcs', price: 230, company: 'Thrisul Company', image: '/images/products/chakkar.svg' },
  { id: 69, name: 'Whistling Chakkar (Sri Krishna Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 5 pcs', price: 60, company: 'Sri Krishna Company', image: '/images/products/chakkar.svg' },
  { id: 70, name: 'Whizz Wheel (Standard Company)', category: 'Chakkar', categorySlug: 'chakkar', packQuantity: '1 Box – 5 pcs', price: 230, company: 'Standard Company', image: '/images/products/chakkar.svg' },
  { id: 71, name: '12 Rang - Star Colour', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 200, image: '/images/products/comet.svg' },
  { id: 72, name: '1" Limca Chotta Fancy (Thrisul Company)', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 90, company: 'Thrisul Company', image: '/images/products/comet.svg' },

  // Page 17
  { id: 73, name: 'Gold Finch - 2 ½', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 350, image: '/images/products/comet.svg' },
  { id: 74, name: 'Queens Land - 1¾', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 3 pcs', price: 450, image: '/images/products/comet.svg' },
  { id: 75, name: 'Sun (Thrisul Company)', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 170, company: 'Thrisul Company', image: '/images/products/comet.svg' },
  { id: 76, name: 'Money Heist – 30 Multicolour Shot', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 550, image: '/images/products/comet.svg', featured: true },

  // Page 18
  { id: 77, name: 'Time Travel - 60 Multicolour Shot', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 1100, image: '/images/products/comet.svg' },
  { id: 78, name: 'Zodiac - 120 Multicolour Shot', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 2200, image: '/images/products/comet.svg', featured: true },
  { id: 79, name: 'Colour Shower 2 ball - J10', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 400, image: '/images/products/comet.svg' },
  { id: 80, name: 'Red Sunrise - J10 Double Ball', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 570, image: '/images/products/comet.svg' },
  { id: 81, name: 'Night King', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 600, image: '/images/products/comet.svg' },

  // Page 19
  { id: 82, name: 'Jet Airways', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 450, image: '/images/products/comet.svg' },
  { id: 83, name: '7 Stars', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 600, image: '/images/products/comet.svg' },
  { id: 84, name: 'Socker- Double Ball', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 680, image: '/images/products/comet.svg' },
  { id: 85, name: 'Gold Finch 2.5 inch', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 2 pcs', price: 520, image: '/images/products/comet.svg' },
  { id: 86, name: '10x10 100 Shots Star Moon', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 4900, image: '/images/products/comet.svg', featured: true },

  // Page 20
  { id: 87, name: 'Matrix Multicolour - 100 Shots (Standard Company)', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 3100, company: 'Standard Company', image: '/images/products/comet.svg', featured: true },
  { id: 88, name: 'Saffire Multicolour 120 Shots (Standard Company)', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 3750, company: 'Standard Company', image: '/images/products/comet.svg' },
  { id: 89, name: 'Howizit Multicolour 30 Shots (Standard Company)', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 1200, company: 'Standard Company', image: '/images/products/comet.svg' },
  { id: 90, name: 'Elegant Show – 30 Multicolour Shot', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 550, image: '/images/products/comet.svg' },
  { id: 91, name: 'Liquor Series Black and White Tin', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 500, image: '/images/products/comet.svg' },

  // Page 21
  { id: 92, name: 'Universe 240 Shot', category: 'Comet', categorySlug: 'comet', packQuantity: '1 Box – 1 pcs', price: 3600, image: '/images/products/comet.svg' },
  { id: 93, name: 'Wonder Pop', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 10 pcs', price: 60, image: '/images/products/crackers.svg' },
  { id: 94, name: 'Redfort Magic Crackers – 100 Wala (Standard Company)', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 120, company: 'Standard Company', image: '/images/products/crackers.svg' },
  { id: 95, name: 'Bijili Crackers Red', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Packet – 100 pcs', price: 40, image: '/images/products/crackers.svg', featured: true },
  { id: 96, name: 'Turkey Bijili Crackers (Standard Company)', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Packet – 100 pcs', price: 45, company: 'Standard Company', image: '/images/products/crackers.svg' },

  // Page 22
  { id: 97, name: 'Peafowl – 1K', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 200, image: '/images/products/crackers.svg' },
  { id: 98, name: 'Redfort – 1000 Shell (Standard Company)', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 550, company: 'Standard Company', image: '/images/products/crackers.svg' },
  { id: 99, name: 'Red Thunder – 2K', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 400, image: '/images/products/crackers.svg' },
  { id: 100, name: 'Peacock Brust – 5K', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 1000, image: '/images/products/crackers.svg', featured: true },
  { id: 101, name: 'Red Fort 5000 Shells (Standard Company)', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 2500, company: 'Standard Company', image: '/images/products/crackers.svg', featured: true },

  // Page 23
  { id: 102, name: 'Lord – 10K', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 1800, image: '/images/products/crackers.svg' },
  { id: 103, name: '1K Full Count', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 450, image: '/images/products/crackers.svg' },
  { id: 104, name: '2K Full Count', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 800, image: '/images/products/crackers.svg' },
  { id: 105, name: '5K Full Count', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 1400, image: '/images/products/crackers.svg' },

  // Page 24
  { id: 106, name: '10K Redfort (Standard Company)', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 4900, company: 'Standard Company', image: '/images/products/crackers.svg' },
  { id: 107, name: '100 Deluxe', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 packet', price: 190, image: '/images/products/crackers.svg' },
  { id: 108, name: '2 Round', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 packet', price: 45, image: '/images/products/crackers.svg' },
  { id: 109, name: '5 "Super Hulk', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Packet', price: 65, image: '/images/products/crackers.svg' },
  { id: 110, name: '4 "Super Spider Man', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Packet', price: 60, image: '/images/products/crackers.svg' },

  // Page 25
  { id: 111, name: '4 "Ben Ten', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Packet', price: 30, image: '/images/products/crackers.svg' },
  { id: 112, name: 'King Cobra Giant', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 25, image: '/images/products/crackers.svg' },
  { id: 113, name: 'Royal Pair – 56 Giant', category: 'Crackers', categorySlug: 'crackers', packQuantity: '1 Box – 1 pcs', price: 65, image: '/images/products/crackers.svg' },
  { id: 114, name: 'Colour Burst (Standard Company)', category: 'Holi Colour', categorySlug: 'holi-colour', packQuantity: '1 Box – 5 pcs', price: 350, company: 'Standard Company', image: '/images/products/holi-colour.svg' },
  { id: 115, name: 'Colouring Smoke', category: 'Holi Colour', categorySlug: 'holi-colour', packQuantity: '1 Box – 3 pcs', price: 160, image: '/images/products/holi-colour.svg' },

  // Page 26
  { id: 116, name: 'Original Pop Pop', category: 'Hand Throw', categorySlug: 'hand-throw', packQuantity: '1 Box – 1 packet', price: 10, image: '/images/products/hand-throw.svg', featured: true },
  { id: 117, name: 'Original Wonder Throw', category: 'Hand Throw', categorySlug: 'hand-throw', packQuantity: '1 Box – 10 pcs', price: 100, image: '/images/products/hand-throw.svg' },
  { id: 118, name: 'Classic Bomb', category: 'Bomb', categorySlug: 'bomb', packQuantity: '1 Box – 10 pcs', price: 160, image: '/images/products/bomb.svg' },
  { id: 119, name: 'Hydrogen Bombs Green (Standard Company)', category: 'Bomb', categorySlug: 'bomb', packQuantity: '1 Box – 10 pcs', price: 100, company: 'Standard Company', image: '/images/products/bomb.svg', featured: true },
  { id: 120, name: 'Hydro Bomb', category: 'Bomb', categorySlug: 'bomb', packQuantity: '1 Box – 10 pcs', price: 140, image: '/images/products/bomb.svg' },

  // Page 27
  { id: 121, name: 'Indian Dynamite', category: 'Bomb', categorySlug: 'bomb', packQuantity: '1 Box – 10 pcs', price: 220, image: '/images/products/bomb.svg' },
  { id: 122, name: 'Cylinder Bomb With Smoke', category: 'Bomb', categorySlug: 'bomb', packQuantity: '1 Box – 2 pcs', price: 300, image: '/images/products/bomb.svg' },
  { id: 123, name: 'Evil Dead – 1 Kg', category: 'Paper Bomb', categorySlug: 'paper-bomb', packQuantity: '1 Box – 1 pcs', price: 250, image: '/images/products/paper-bomb.svg', featured: true },
  { id: 124, name: 'Evil Dead – ½ Kg', category: 'Paper Bomb', categorySlug: 'paper-bomb', packQuantity: '1 Box – 1 pcs', price: 130, image: '/images/products/paper-bomb.svg' },

  // Page 28
  { id: 125, name: 'Roster Ultimate Fight – ¼ Kg', category: 'Paper Bomb', categorySlug: 'paper-bomb', packQuantity: '1 Box – 1 pcs', price: 70, image: '/images/products/paper-bomb.svg' },
  { id: 126, name: 'Surveyor Rockets (Standard Company)', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 10 pcs', price: 190, company: 'Standard Company', image: '/images/products/rocket.svg', featured: true },
  { id: 127, name: 'Rainbow Rocket (Standard Company)', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 10 pcs', price: 140, company: 'Standard Company', image: '/images/products/rocket.svg' },

  // Page 29
  { id: 128, name: 'Whistling Rocket', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 10 pcs', price: 240, image: '/images/products/rocket.svg', featured: true },
  { id: 129, name: 'Lunik Express', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 10 pcs', price: 200, image: '/images/products/rocket.svg' },
  { id: 130, name: 'Bomb Rockets (Standard Company)', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 10 pcs', price: 200, company: 'Standard Company', image: '/images/products/rocket.svg' },

  // Page 30
  { id: 131, name: '10 Colour Rocket', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 6 pcs', price: 530, image: '/images/products/rocket.svg' },
  { id: 132, name: 'Parachute Rocket', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 6 pcs', price: 550, image: '/images/products/rocket.svg', featured: true },
  { id: 133, name: 'Whistle Rocket Champions', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 10 pcs', price: 220, image: '/images/products/rocket.svg' },
  { id: 134, name: '2 Sound Rocket', category: 'Rocket', categorySlug: 'rocket', packQuantity: '1 Box – 10 pcs', price: 320, image: '/images/products/rocket.svg' },

  // Page 31
  { id: 135, name: 'Jai Hind', category: 'Gift Box', categorySlug: 'gift-box', packQuantity: '1 Box – 18 s', price: 350, image: '/images/products/gift-box.svg', featured: true },
  { id: 136, name: 'Crazy', category: 'Gift Box', categorySlug: 'gift-box', packQuantity: '1 Box – 25 s', price: 550, image: '/images/products/gift-box.svg' },
  { id: 137, name: 'Dream', category: 'Gift Box', categorySlug: 'gift-box', packQuantity: '1 Box – 36 s', price: 850, image: '/images/products/gift-box.svg' },
  { id: 138, name: 'Rangeela', category: 'Gift Box', categorySlug: 'gift-box', packQuantity: '1 Box – 45 s', price: 1200, image: '/images/products/gift-box.svg', featured: true },

  // Page 32
  { id: 139, name: 'Peacock', category: 'Gift Box', categorySlug: 'gift-box', packQuantity: '1 Box – 55 s', price: 1600, image: '/images/products/gift-box.svg' },
  { id: 140, name: 'Jumbo', category: 'Gift Box', categorySlug: 'gift-box', packQuantity: '1 Box – 70 s', price: 1800, image: '/images/products/gift-box.svg', featured: true },
];

export const STORE_CONTACT = {
  name: 'SRI SAI TRADERS',
  subtitle: 'Dealers in All Types of Crackers Wholesale & Retail',
  address: '# 3, 92/4A1, 259/5, kagganur, Tamilnadu - 635103',
  phones: ['+91 7676073612', '04344458897', '+91 9880396977', '+91 7019488132'],
  primaryPhone: '+91 7676073612',
  whatsappNumber: '917676073612',
  whatsappSecondary: '919880396977',
  email: 'thesrisaitraders@gmail.com',
  instagram: '@thesrisaitraders',
  tagline: 'Crackers | Celebrations | Happiness',
  motto: 'Brighter Moments Together',
};
