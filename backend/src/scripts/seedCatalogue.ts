import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Setting } from '../models/Setting';
import { slugify } from '../utils/slugify';
import { ensureImageAssets } from './generateAssets';

interface RawProductData {
  name: string;
  category: string;
  packQuantity: string;
  price: number;
  featured?: boolean;
}

const CATALOGUE_PRODUCTS: RawProductData[] = [
  // Page 1
  { name: '7 CM Valentine Red', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 20, featured: true },
  { name: '7 CM Vivid Green', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 18 },
  { name: '7 CM 50-50', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 17 },
  { name: '12 CM Triton Electric showers', category: 'Sparkles', packQuantity: '1 piece', price: 32 },
  { name: '12 CM Colour Glitzy', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 53 },

  // Page 2
  { name: '12 CM Valentine Red', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 43 },
  { name: '12 CM Vivid Green', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 36 },
  { name: '15 CM Colour Glitzy', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 53 },
  { name: '15 CM Vivid Green', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 50 },
  { name: '15 CM Triton Electric', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 50 },

  // Page 3
  { name: '30 CM Triton Electric', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 44 },
  { name: '30 CM Gold Sparkles (Standard Company)', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 95, featured: true },
  { name: '30 CM Crackling Sparkles (Standard Company)', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 100 },
  { name: '30 CM Colour Glitzy', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 47 },

  // Page 4
  { name: '50 CM Triton Electric', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 220 },
  { name: '4 Colour Torch (Standard Company)', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 250 },
  { name: 'Golden Torch', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 300 },
  { name: 'Disco Flash (Standard Company)', category: 'Fancy', packQuantity: '1 Box – 10 pcs', price: 190, featured: true },
  { name: 'Tug of war (Standard Company)', category: 'Fancy', packQuantity: '1 Box – 1 pcs', price: 300 },

  // Page 5
  { name: 'Money in the Bank (Jai Joy Company)', category: 'Fancy', packQuantity: '1 Box – 3 pcs', price: 240, featured: true },
  { name: 'Money in the Bank (Starvel Company)', category: 'Fancy', packQuantity: '1 Box – 3 pcs', price: 240 },
  { name: 'Helicopter', category: 'Fancy', packQuantity: '1 Box – 5 pcs', price: 100 },
  { name: 'Emu Egg', category: 'Fancy', packQuantity: '1 Box – 3 pcs', price: 200 },
  { name: 'Butterfly', category: 'Fancy', packQuantity: '1 Box – 10 pcs', price: 120 },

  // Page 6
  { name: 'Indian Army', category: 'Fancy', packQuantity: '1 Box – 1 pcs', price: 750 },
  { name: '7 Shot Sa Re Ga Ma Pa Dha Ni', category: 'Fancy', packQuantity: '1 Box – 1 pcs', price: 150 },
  { name: 'Car Race', category: 'Fancy', packQuantity: '1 Box – 2 pcs', price: 600 },
  { name: 'Tiger Roll Caps', category: 'Roll Caps', packQuantity: '1 Box – 10 pcs', price: 120 },
  { name: 'Ring Caps', category: 'Roll Caps', packQuantity: '1 Box – 1 pcs', price: 10 },

  // Page 7
  { name: 'Twinkling Star', category: 'Twinkling', packQuantity: '1 Box – 10 pcs', price: 50 },
  { name: 'Twinkling Star (Standard Company)', category: 'Twinkling', packQuantity: '1 Box – 10 pcs', price: 80 },
  { name: '120 CM Silver Twinkling Deluxe (Standard Company)', category: 'Twinkling', packQuantity: '1 Box – 10 pcs', price: 240 },
  { name: '120 CM Twinkling Star', category: 'Twinkling', packQuantity: '1 Box – 10 pcs', price: 120 },
  { name: 'Flower Pot Big (Standard Company)', category: 'Flower pot', packQuantity: '1 Box – 10 pcs', price: 200, featured: true },

  // Page 8
  { name: 'Flower Pot Small (Standard Company)', category: 'Flower pot', packQuantity: '1 Box – 10 pcs', price: 140 },
  { name: 'Flower Pot Small', category: 'Flower pot', packQuantity: '1 Box – 10 pcs', price: 75 },
  { name: 'Multi Colour Flower Pot Ashoka', category: 'Flower pot', packQuantity: '1 Box – 10 pcs', price: 260 },
  { name: 'TV-Tower (Standard Company)', category: 'Flower pot', packQuantity: '1 Box – 1 pcs', price: 200 },
  { name: 'Flower Pot Giant', category: 'Flower pot', packQuantity: '1 Box – 2 pcs', price: 350 },

  // Page 9
  { name: 'Colour Koti Deluxe (Yes Bro Company)', category: 'Flower pot', packQuantity: '1 Box – 10 pcs', price: 600 },
  { name: 'I Cone Fountain', category: 'Flower pot', packQuantity: '1 Box – 1 pcs', price: 200 },
  { name: 'Flower Pots Deluxe (Standard Company)', category: 'Flower pot', packQuantity: '1 Box – 5 pcs', price: 420 },
  { name: 'Saravanavel’s Pajock Multicolour Small', category: 'Flower pot', packQuantity: '1 Box – 10 pcs', price: 200 },
  { name: 'Tricolour Fountain (Standard Company)', category: 'Flower pot', packQuantity: '1 Box – 5 pcs', price: 650 },

  // Page 10
  { name: 'Orion Fountain', category: 'Flower pot', packQuantity: '1 Box – 1 pcs', price: 120 },
  { name: 'Google Galatta', category: 'Flower pot', packQuantity: '1 Box – 4 pcs', price: 170 },
  { name: 'Colour Flowers Giant (Standard Company)', category: 'Flower pot', packQuantity: '1 Box – 10 pcs', price: 650 },
  { name: 'Blo', category: 'Flower pot', packQuantity: '1 Box – 1 pcs', price: 150 },
  { name: 'Favpot', category: 'Flower pot', packQuantity: '1 Box – 1 pcs', price: 200 },

  // Page 11
  { name: 'Tri Colour Fountain', category: 'Flower pot', packQuantity: '1 Box – 5 pcs', price: 350 },
  { name: 'Bada Peacock', category: 'Flower pot', packQuantity: '1 Box – 1 pcs', price: 450 },
  { name: 'Guitar', category: 'Flower pot', packQuantity: '1 Box – 1 pcs', price: 200 },
  { name: 'Bada Peacock (Bheema Company)', category: 'Flower pot', packQuantity: '1 Box – 1 pcs', price: 550 },
  { name: 'Colour Koti Red (Yes Bro Company)', category: 'Flower pot', packQuantity: '1 Box – 10 pcs', price: 650 },

  // Page 12
  { name: 'Colour Koti (Thrisul Company)', category: 'Colour Koti', packQuantity: '1 Box – 10 pcs', price: 300 },
  { name: 'Colour Koti (Thathya Company)', category: 'Colour Koti', packQuantity: '1 Box – 10 pcs', price: 350 },
  { name: 'Ground Chakkar Ashoka (Thrisul Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 90 },
  { name: 'Lotus', category: 'Chakkar', packQuantity: '1 Box – 3 pcs', price: 120 },
  { name: 'Zamin Chakkar Deluxe (Standard Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 250, featured: true },

  // Page 13
  { name: 'Zamin Chakkar Super Deluxe (Standard Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 320 },
  { name: 'Swastik Wheels (Standard Company)', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 350 },
  { name: '4x4 Wheel', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 300 },
  { name: 'Ground Chakkar Super Big', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 300 },
  { name: 'Ground Chakkar Special (Thrisul Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 85 },

  // Page 14
  { name: 'Spinner Special', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 150 },
  { name: 'Ground Chakkar Deluxe (Thrisul Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 120 },
  { name: 'Spinner Deluxe Magic Flash', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 300 },
  { name: 'Ground Chakkar Big (Thrisul Company)', category: 'Chakkar', packQuantity: '1 Box – 25 pcs', price: 230 },
  { name: 'Whistling Chakkar (Sri Krishna Company)', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 60 },

  // Page 15
  { name: 'Whizz Wheel (Standard Company)', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 230 },
  { name: '12 Rang - Star Colour', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 200 },
  { name: '1" Limca Chotta Fancy (Thrisul Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 90 },
  { name: 'Gold Finch - 2 ½', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 200 },

  // Page 16
  { name: 'Queens Land - 1¾', category: 'Comet', packQuantity: '1 Box – 3 pcs', price: 400 },
  { name: 'Sun (Thrisul Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 170 },
  { name: 'Money Heist – 30 Multicolour Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 550, featured: true },
  { name: 'Time Travel - 60 Multicolour Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 1100 },
  { name: 'Zodiac - 120 Multicolour Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 2200, featured: true },

  // Page 17
  { name: 'Colour Shower 2 ball - J10', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 400 },
  { name: 'Red Sunrise - J10 Double Ball', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 570 },
  { name: 'Night King', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 600 },
  { name: 'Jet Airways', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 370 },
  { name: '7 Stars', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 500 },

  // Page 18
  { name: 'Socker- Double Ball', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 600 },
  { name: 'Gold Finch 2.5 inch', category: 'Comet', packQuantity: '1 Box – 2 pcs', price: 520 },
  { name: '10x10 100 Shots Star Moon', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 4900, featured: true },
  { name: 'Matrix Multicolour - 100 Shots (Standard Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 2250 },
  { name: 'Saffire Multicolour 120 Shots (Standard Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 2700 },

  // Page 19
  { name: 'Howizit Multicolour 30 Shots (Standard Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 1000 },
  { name: 'Elegant Show – 30 Multicolour Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 550 },
  { name: 'Wonder Pop', category: 'Crackers', packQuantity: '1 Box – 10 pcs', price: 60 },
  { name: 'Redfort Magic Crackers – 100 Wala (Standard Company)', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 120 },
  { name: 'Bijili Crackers Red', category: 'Crackers', packQuantity: '1 Packet – 100 pcs', price: 40, featured: true },

  // Page 20
  { name: 'Turkey Bijili Crackers (Standard Company)', category: 'Crackers', packQuantity: '1 Packet – 100 pcs', price: 45 },
  { name: 'Peafowl – 1K', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 200 },
  { name: 'Redfort – 1000 Shell (Standard Company)', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 550 },
  { name: 'Red Thunder – 2K', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 400 },
  { name: 'Peacock Brust – 5K', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 1000, featured: true },

  // Page 21
  { name: 'Red Fort 5000 Shells (Standard Company)', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 2500, featured: true },
  { name: 'Lord – 10K', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 1800 },
  { name: '5 "Super Hulk', category: 'Crackers', packQuantity: '1 Packet', price: 60 },
  { name: '4 "Super Spider Man', category: 'Crackers', packQuantity: '1 Packet', price: 60 },
  { name: '4 "Ben Ten', category: 'Crackers', packQuantity: '1 Packet', price: 30 },

  // Page 22
  { name: 'King Cobra Giant', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 25 },
  { name: 'Royal Pair – 56 Giant', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 65 },
  { name: 'Colour Burst (Standard Company)', category: 'Holi Colour', packQuantity: '1 Box – 5 pcs', price: 350 },
  { name: 'Classic Bomb', category: 'Bomb', packQuantity: '1 Box – 10 pcs', price: 160 },
  { name: 'Hydrogen Bombs Green (Standard Company)', category: 'Bomb', packQuantity: '1 Box – 10 pcs', price: 100, featured: true },

  // Page 23
  { name: 'Hydro Bomb', category: 'Bomb', packQuantity: '1 Box – 10 pcs', price: 140 },
  { name: 'Indian Dynamite', category: 'Bomb', packQuantity: '1 Box – 10 pcs', price: 220 },
  { name: 'Evil Dead – 1 Kg', category: 'Paper Bomb', packQuantity: '1 Box – 1 pcs', price: 200, featured: true },
  { name: 'Evil Dead – ½ Kg', category: 'Paper Bomb', packQuantity: '1 Box – 1 pcs', price: 100 },

  // Page 24
  { name: 'Roster Ultimate Fight – ¼ Kg', category: 'Paper Bomb', packQuantity: '1 Box – 1 pcs', price: 50 },
  { name: 'Surveyor Rockets (Standard Company)', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 190 },
  { name: 'Rainbow Rocket (Standard Company)', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 140 },
  { name: 'Whistling Rocket', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 240, featured: true },

  // Page 25
  { name: 'Lunik Express', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 200 },
  { name: 'Bomb Rockets (Standard Company)', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 200 },
  { name: '10 Colour Rocket', category: 'Rocket', packQuantity: '1 Box – 6 pcs', price: 530 },
  { name: 'Parachute Rocket', category: 'Rocket', packQuantity: '1 Box – 6 pcs', price: 550, featured: true },

  // Page 26
  { name: 'Jai Hind', category: 'Gift Box', packQuantity: '1 Box – 18 s', price: 350 },
  { name: 'Crazy', category: 'Gift Box', packQuantity: '1 Box – 25 s', price: 550 },
  { name: 'Dream', category: 'Gift Box', packQuantity: '1 Box – 36 s', price: 850 },
  { name: 'Rangeela', category: 'Gift Box', packQuantity: '1 Box – 45 s', price: 1200 },
  { name: 'Peacock', category: 'Gift Box', packQuantity: '1 Box – 55 s', price: 1600, featured: true },

  // Page 27
  { name: 'Jumbo', category: 'Gift Box', packQuantity: '1 Box – 70 s', price: 1800, featured: true },
];

const CATEGORY_DEFINITIONS = [
  { name: 'Sparkles', description: 'Traditional and electric sparklers in various colors and sizes for festive lighting.', displayOrder: 1 },
  { name: 'Fancy', description: 'Novelty aerial and ground novelty items with unique sound and visual effects.', displayOrder: 2 },
  { name: 'Roll Caps', description: 'Classic toy cap rolls and ring caps for festive fun.', displayOrder: 3 },
  { name: 'Twinkling', description: 'Gentle twinkling stars and silver sparkles that illuminate the night.', displayOrder: 4 },
  { name: 'Flower pot', description: 'Iconic fountains and floral sprays of vibrant colors and sparks.', displayOrder: 5 },
  { name: 'Colour Koti', description: 'Specialized color fountains with brilliant multi-shade flame projections.', displayOrder: 6 },
  { name: 'Chakkar', description: 'Ground spinning wheels with rapid rotation and glittering circles.', displayOrder: 7 },
  { name: 'Comet', description: 'Multi-shot aerial repeating repeaters, aerial fireworks, and sky shot cakes.', displayOrder: 8 },
  { name: 'Crackers', description: 'Loud traditional sound crackers, bijilis, and string shells.', displayOrder: 9 },
  { name: 'Bomb', description: 'Classic hydro and hydrogen green sound shells for thunderous bursts.', displayOrder: 10 },
  { name: 'Paper Bomb', description: 'Heavyweight paper shells with powerful echo sound effects.', displayOrder: 11 },
  { name: 'Rocket', description: 'Skyward climbing rockets with parachute, whistles, and color bursts.', displayOrder: 12 },
  { name: 'Gift Box', description: 'Family assortment boxes containing an assorted mix of safe celebration fireworks.', displayOrder: 13 },
  { name: 'Holi Colour', description: 'Special festive burst colors and non-toxic powders.', displayOrder: 14 },
];

export async function seedAllData(): Promise<number> {
  console.log('[Seed] Generating SVG image assets...');
  ensureImageAssets();

  console.log('[Seed] Seeding categories...');
  const categoryMap = new Map<string, mongoose.Types.ObjectId>();

  for (const catDef of CATEGORY_DEFINITIONS) {
    const slug = slugify(catDef.name);
    const catImage = `/uploads/categories/${slug}.svg`;

    const category = await Category.findOneAndUpdate(
      { slug },
      {
        name: catDef.name,
        slug,
        description: catDef.description,
        image: catImage,
        displayOrder: catDef.displayOrder,
        isActive: true,
      },
      { upsert: true, new: true }
    );

    categoryMap.set(catDef.name.toLowerCase(), category._id as mongoose.Types.ObjectId);
  }

  console.log(`[Seed] Seeded ${CATEGORY_DEFINITIONS.length} categories.`);

  console.log('[Seed] Seeding products from 27-page catalogue...');
  let productCount = 0;

  for (const raw of CATALOGUE_PRODUCTS) {
    const categoryId = categoryMap.get(raw.category.toLowerCase());
    if (!categoryId) {
      console.warn(`[Seed] Category not found for product: ${raw.name} (${raw.category})`);
      continue;
    }

    let slug = slugify(raw.name);
    const categorySlug = slugify(raw.category);
    const productImage = `/uploads/categories/${categorySlug}.svg`;

    // Check if another product already exists with this slug
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct && (existingProduct.name !== raw.name || existingProduct.packQuantity !== raw.packQuantity)) {
      slug = slugify(`${raw.name}-${raw.packQuantity}-${raw.price}`);
    }

    await Product.findOneAndUpdate(
      { name: raw.name, packQuantity: raw.packQuantity },
      {
        name: raw.name,
        slug,
        categoryId,
        image: productImage,
        images: [productImage],
        packQuantity: raw.packQuantity,
        price: raw.price,
        description: `Authentic ${raw.name} (${raw.packQuantity}) by trusted Sivakasi pyrotechnic makers. Premium quality celebration fireworks.`,
        isActive: true,
        stockStatus: 'IN_STOCK',
        isFeatured: !!raw.featured,
      },
      { upsert: true, new: true }
    );
    productCount++;
  }

  console.log(`[Seed] Successfully seeded ${productCount} catalogue products.`);

  console.log('[Seed] Seeding Admin User...');
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@crackers.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const admin = new User({
      name: 'Store Administrator',
      email: adminEmail,
      password: adminPassword,
      role: 'ADMIN',
      isActive: true,
    });
    await admin.save();
    console.log(`[Seed] Default Admin User created: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log(`[Seed] Admin User already exists: ${adminEmail}`);
  }

  console.log('[Seed] Seeding Store Settings...');
  await Setting.findOneAndUpdate(
    {},
    {
      storeName: 'Sparkle Crackers Sivakasi',
      phone: '+91 98765 43210',
      whatsappNumber: '919876543210',
      email: 'orders@sparklecrackers.com',
      address: 'Main Bazaar Road, Near Town Clock Tower',
      city: 'Sivakasi',
      state: 'Tamil Nadu',
      pincode: '626123',
      pickupEnabled: true,
      deliveryEnabled: true,
      minimumOrderAmount: 500,
      freeDeliveryThreshold: 3000,
      deliveryFee: 150,
      bannerNotice: '🎆 DIWALI 2026 CATALOGUE OPEN! Orders are verified and paid offline via Cash/UPI. 🎆',
      legalDisclaimer:
        'In compliance with Supreme Court orders and local safety regulations, all crackers sold are certified green pyrotechnic formulations. Delivery is arranged through authorized licensed transport agents. Minimum purchaser age is 18 years.',
    },
    { upsert: true, new: true }
  );
  console.log('[Seed] Store settings verified.');

  return productCount;
}

export async function seedCatalogueIfNeeded(): Promise<void> {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log(`[Seed] Database already has ${count} products. Skipping auto-seed.`);
      return;
    }
    console.log('[Seed] No products found in database. Auto-seeding 27-page catalogue...');
    const seededCount = await seedAllData();
    console.log(`[Seed] Auto-seeding finished: ${seededCount} products ready.`);
  } catch (err) {
    console.error('[Seed] Auto-seeding error:', err);
  }
}

export async function runSeed() {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();
    await seedAllData();
    console.log('[Seed] Seeding completed successfully!');
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

if (require.main === module) {
  runSeed();
}

