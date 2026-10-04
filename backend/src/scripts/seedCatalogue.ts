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
  id: number;
  name: string;
  category: string;
  packQuantity: string;
  price: number;
  company?: string;
  featured?: boolean;
}

const CATEGORY_DEFINITIONS = [
  { name: 'Sparkles', description: 'Traditional and electric sparklers in various colors and sizes for festive lighting.', displayOrder: 1 },
  { name: 'Fancy', description: 'Novelty aerial and ground novelty items with unique sound and visual effects.', displayOrder: 2 },
  { name: 'Roll Caps', description: 'Classic toy cap rolls and ring caps for festive fun.', displayOrder: 3 },
  { name: 'Twinkling', description: 'Gentle twinkling stars and silver sparkles that illuminate the night.', displayOrder: 4 },
  { name: 'Flower Pot', description: 'Iconic fountains and floral sprays of vibrant colors and sparks.', displayOrder: 5 },
  { name: 'Colour Koti', description: 'Specialized color fountains with brilliant multi-shade flame projections.', displayOrder: 6 },
  { name: 'Chakkar', description: 'Ground spinning wheels with rapid rotation and glittering circles.', displayOrder: 7 },
  { name: 'Comet', description: 'Multi-shot aerial repeating repeaters, aerial fireworks, and sky shot cakes.', displayOrder: 8 },
  { name: 'Crackers', description: 'Loud traditional sound crackers, bijilis, and string shells.', displayOrder: 9 },
  { name: 'Holi Colour', description: 'Special festive burst colors and non-toxic powders.', displayOrder: 10 },
  { name: 'Hand Throw', description: 'Snappy friction throw pop-pops and magic throwing pops.', displayOrder: 11 },
  { name: 'Bomb', description: 'Classic hydro and hydrogen green sound shells for thunderous bursts.', displayOrder: 12 },
  { name: 'Paper Bomb', description: 'Heavyweight paper shells with powerful echo sound effects.', displayOrder: 13 },
  { name: 'Rocket', description: 'Skyward climbing rockets with parachute, whistles, and color bursts.', displayOrder: 14 },
  { name: 'Gift Box', description: 'Assorted family gift packs containing fireworks collections.', displayOrder: 15 },
];

const CATALOGUE_PRODUCTS: RawProductData[] = [
  // Page 2
  { id: 1, name: '7 CM Valentine Red', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 20, featured: true },
  { id: 2, name: '7 CM Vivid Green', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 18 },
  { id: 3, name: '7 CM 50-50', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 17 },
  { id: 4, name: '12 CM Triton Electric showers', category: 'Sparkles', packQuantity: '1 piece', price: 32 },
  { id: 5, name: '12 CM Colour Glitzy', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 53 },

  // Page 3
  { id: 6, name: '12 CM Valentine Red', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 43 },
  { id: 7, name: '12 CM Vivid Green', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 36 },
  { id: 8, name: '15 CM Colour Glitzy', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 53 },
  { id: 9, name: '15 CM Vivid Green', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 50 },
  { id: 10, name: '15 CM Triton Electric', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 50 },

  // Page 4
  { id: 11, name: '30 CM Triton Electric', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 44 },
  { id: 12, name: '30 CM Gold Sparkles (Standard Company)', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 95, company: 'Standard Company', featured: true },
  { id: 13, name: '30 CM Crackling Sparkles (Standard Company)', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 100, company: 'Standard Company' },
  { id: 14, name: '30 CM Colour Glitzy', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 47 },

  // Page 5
  { id: 15, name: '50 CM Triton Electric', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 220 },
  { id: 16, name: '4 Colour Torch (Standard Company)', category: 'Sparkles', packQuantity: '1 Box – 10 pcs', price: 250, company: 'Standard Company' },
  { id: 17, name: 'Golden Torch', category: 'Sparkles', packQuantity: '1 Box – 5 pcs', price: 300 },

  // Page 6
  { id: 18, name: 'Disco Flash (Standard Company)', category: 'Fancy', packQuantity: '1 Box – 10 pcs', price: 190, company: 'Standard Company', featured: true },
  { id: 19, name: 'Tug of war (Standard Company)', category: 'Fancy', packQuantity: '1 Box – 1 pcs', price: 300, company: 'Standard Company' },
  { id: 20, name: 'Money in the Bank (Jai Joy Company)', category: 'Fancy', packQuantity: '1 Box – 3 pcs', price: 240, company: 'Jai Joy Company', featured: true },
  { id: 21, name: 'Money in the Bank (Starvel Company)', category: 'Fancy', packQuantity: '1 Box – 3 pcs', price: 240, company: 'Starvel Company' },
  { id: 22, name: 'Helicopter', category: 'Fancy', packQuantity: '1 Box – 5 pcs', price: 100 },

  // Page 7
  { id: 23, name: 'Emu Egg', category: 'Fancy', packQuantity: '1 Box – 3 pcs', price: 200 },
  { id: 24, name: 'Butterfly', category: 'Fancy', packQuantity: '1 Box – 10 pcs', price: 120 },
  { id: 25, name: 'Indian Army', category: 'Fancy', packQuantity: '1 Box – 1 pcs', price: 750 },
  { id: 26, name: '7 Shot Sa Re Ga Ma Pa Dha Ni', category: 'Fancy', packQuantity: '1 Box – 1 pcs', price: 150 },
  { id: 27, name: 'Car Race', category: 'Fancy', packQuantity: '1 Box – 2 pcs', price: 600 },

  // Page 8
  { id: 28, name: 'Tiger Roll Caps', category: 'Roll Caps', packQuantity: '1 Box – 10 pcs', price: 120 },
  { id: 29, name: 'Ring Caps', category: 'Roll Caps', packQuantity: '1 Box – 1 pcs', price: 10 },
  { id: 30, name: 'Twinkling Star', category: 'Twinkling', packQuantity: '1 Box – 10 pcs', price: 50, featured: true },
  { id: 31, name: 'Twinkling Star (Standard Company)', category: 'Twinkling', packQuantity: '1 Box – 10 pcs', price: 80, company: 'Standard Company' },
  { id: 32, name: '120 CM Silver Twinkling Deluxe (Standard Company)', category: 'Twinkling', packQuantity: '1 Box – 10 pcs', price: 240, company: 'Standard Company' },

  // Page 9
  { id: 33, name: '120 CM Twinkling Star', category: 'Twinkling', packQuantity: '1 Box – 10 pcs', price: 120 },
  { id: 34, name: 'Flower Pot Big (Standard Company)', category: 'Flower Pot', packQuantity: '1 Box – 10 pcs', price: 230, company: 'Standard Company', featured: true },
  { id: 35, name: 'Flower Pot Small (Standard Company)', category: 'Flower Pot', packQuantity: '1 Box – 10 pcs', price: 140, company: 'Standard Company' },
  { id: 36, name: 'Flower Pot Small', category: 'Flower Pot', packQuantity: '1 Box – 10 pcs', price: 75 },
  { id: 37, name: 'Multi Colour Flower Pot Ashoka', category: 'Flower Pot', packQuantity: '1 Box – 10 pcs', price: 260 },

  // Page 10
  { id: 38, name: 'TV-Tower (Standard Company)', category: 'Flower Pot', packQuantity: '1 Box – 1 pcs', price: 200, company: 'Standard Company' },
  { id: 39, name: 'Flower Pot Giant', category: 'Flower Pot', packQuantity: '1 Box – 2 pcs', price: 350 },
  { id: 40, name: 'Colour Koti Deluxe (Yes Bro Company)', category: 'Flower Pot', packQuantity: '1 Box – 10 pcs', price: 600, company: 'Yes Bro Company' },
  { id: 41, name: 'I Cone Fountain', category: 'Flower Pot', packQuantity: '1 Box – 1 pcs', price: 200 },
  { id: 42, name: 'Flower Pots Deluxe (Standard Company)', category: 'Flower Pot', packQuantity: '1 Box – 5 pcs', price: 420, company: 'Standard Company' },

  // Page 11
  { id: 43, name: 'Saravanavel’s Pajock Multicolour Small', category: 'Flower Pot', packQuantity: '1 Box – 10 pcs', price: 200 },
  { id: 44, name: 'Tricolour Fountain (Standard Company)', category: 'Flower Pot', packQuantity: '1 Box – 5 pcs', price: 650, company: 'Standard Company' },
  { id: 45, name: 'Orion Fountain', category: 'Flower Pot', packQuantity: '1 Box – 1 pcs', price: 120 },
  { id: 46, name: 'Google Galatta', category: 'Flower Pot', packQuantity: '1 Box – 4 pcs', price: 170 },
  { id: 47, name: 'Colour Flowers Giant (Standard Company)', category: 'Flower Pot', packQuantity: '1 Box – 10 pcs', price: 650, company: 'Standard Company' },

  // Page 12
  { id: 48, name: 'Blo', category: 'Flower Pot', packQuantity: '1 Box – 1 pcs', price: 150 },
  { id: 49, name: 'Favpot', category: 'Flower Pot', packQuantity: '1 Box – 1 pcs', price: 200 },
  { id: 50, name: 'Tri Colour Fountain', category: 'Flower Pot', packQuantity: '1 Box – 5 pcs', price: 350 },
  { id: 51, name: 'Bada Peacock', category: 'Flower Pot', packQuantity: '1 Box – 1 pcs', price: 450 },
  { id: 52, name: 'Guitar', category: 'Flower Pot', packQuantity: '1 Box – 1 pcs', price: 200 },

  // Page 13
  { id: 53, name: 'Bada Peacock (Bheema Company)', category: 'Flower Pot', packQuantity: '1 Box – 1 pcs', price: 550, company: 'Bheema Company' },
  { id: 54, name: 'Colour Koti Red (Yes Bro Company)', category: 'Flower Pot', packQuantity: '1 Box – 10 pcs', price: 650, company: 'Yes Bro Company' },
  { id: 55, name: 'Colour Koti (Thrisul Company)', category: 'Colour Koti', packQuantity: '1 Box – 10 pcs', price: 300, company: 'Thrisul Company' },
  { id: 56, name: 'Colour Koti (Thathya Company)', category: 'Colour Koti', packQuantity: '1 Box – 10 pcs', price: 350, company: 'Thathya Company' },
  { id: 57, name: 'Ground Chakkar Ashoka (Thrisul Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 90, company: 'Thrisul Company' },

  // Page 14
  { id: 58, name: 'Lotus', category: 'Chakkar', packQuantity: '1 Box – 3 pcs', price: 120 },
  { id: 59, name: 'Zamin Chakkar Deluxe (Standard Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 250, company: 'Standard Company', featured: true },
  { id: 60, name: 'Zamin Chakkar Super Deluxe (Standard Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 320, company: 'Standard Company' },
  { id: 61, name: 'Swastik Wheels (Standard Company)', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 350, company: 'Standard Company' },
  { id: 62, name: '4x4 Wheel', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 300 },

  // Page 15
  { id: 63, name: 'Ground Chakkar Super Big', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 300 },
  { id: 64, name: 'Ground Chakkar Special (Thrisul Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 85, company: 'Thrisul Company' },
  { id: 65, name: 'Spinner Special', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 150 },
  { id: 66, name: 'Ground Chakkar Deluxe (Thrisul Company)', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 120, company: 'Thrisul Company' },
  { id: 67, name: 'Spinner Deluxe Magic Flash', category: 'Chakkar', packQuantity: '1 Box – 10 pcs', price: 300 },

  // Page 16
  { id: 68, name: 'Ground Chakkar Big (Thrisul Company)', category: 'Chakkar', packQuantity: '1 Box – 25 pcs', price: 230, company: 'Thrisul Company' },
  { id: 69, name: 'Whistling Chakkar (Sri Krishna Company)', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 60, company: 'Sri Krishna Company' },
  { id: 70, name: 'Whizz Wheel (Standard Company)', category: 'Chakkar', packQuantity: '1 Box – 5 pcs', price: 230, company: 'Standard Company' },
  { id: 71, name: '12 Rang - Star Colour', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 200 },
  { id: 72, name: '1" Limca Chotta Fancy (Thrisul Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 90, company: 'Thrisul Company' },

  // Page 17
  { id: 73, name: 'Gold Finch - 2 ½', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 350 },
  { id: 74, name: 'Queens Land - 1¾', category: 'Comet', packQuantity: '1 Box – 3 pcs', price: 450 },
  { id: 75, name: 'Sun (Thrisul Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 170, company: 'Thrisul Company' },
  { id: 76, name: 'Money Heist – 30 Multicolour Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 550, featured: true },

  // Page 18
  { id: 77, name: 'Time Travel - 60 Multicolour Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 1100 },
  { id: 78, name: 'Zodiac - 120 Multicolour Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 2200, featured: true },
  { id: 79, name: 'Colour Shower 2 ball - J10', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 400 },
  { id: 80, name: 'Red Sunrise - J10 Double Ball', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 570 },
  { id: 81, name: 'Night King', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 600 },

  // Page 19
  { id: 82, name: 'Jet Airways', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 450 },
  { id: 83, name: '7 Stars', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 600 },
  { id: 84, name: 'Socker- Double Ball', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 680 },
  { id: 85, name: 'Gold Finch 2.5 inch', category: 'Comet', packQuantity: '1 Box – 2 pcs', price: 520 },
  { id: 86, name: '10x10 100 Shots Star Moon', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 4900, featured: true },

  // Page 20
  { id: 87, name: 'Matrix Multicolour - 100 Shots (Standard Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 3100, company: 'Standard Company', featured: true },
  { id: 88, name: 'Saffire Multicolour 120 Shots (Standard Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 3750, company: 'Standard Company' },
  { id: 89, name: 'Howizit Multicolour 30 Shots (Standard Company)', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 1200, company: 'Standard Company' },
  { id: 90, name: 'Elegant Show – 30 Multicolour Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 550 },
  { id: 91, name: 'Liquor Series Black and White Tin', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 500 },

  // Page 21
  { id: 92, name: 'Universe 240 Shot', category: 'Comet', packQuantity: '1 Box – 1 pcs', price: 3600 },
  { id: 93, name: 'Wonder Pop', category: 'Crackers', packQuantity: '1 Box – 10 pcs', price: 60 },
  { id: 94, name: 'Redfort Magic Crackers – 100 Wala (Standard Company)', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 120, company: 'Standard Company' },
  { id: 95, name: 'Bijili Crackers Red', category: 'Crackers', packQuantity: '1 Packet – 100 pcs', price: 40, featured: true },
  { id: 96, name: 'Turkey Bijili Crackers (Standard Company)', category: 'Crackers', packQuantity: '1 Packet – 100 pcs', price: 45, company: 'Standard Company' },

  // Page 22
  { id: 97, name: 'Peafowl – 1K', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 200 },
  { id: 98, name: 'Redfort – 1000 Shell (Standard Company)', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 550, company: 'Standard Company' },
  { id: 99, name: 'Red Thunder – 2K', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 400 },
  { id: 100, name: 'Peacock Brust – 5K', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 1000, featured: true },
  { id: 101, name: 'Red Fort 5000 Shells (Standard Company)', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 2500, company: 'Standard Company', featured: true },

  // Page 23
  { id: 102, name: 'Lord – 10K', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 1800 },
  { id: 103, name: '1K Full Count', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 450 },
  { id: 104, name: '2K Full Count', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 800 },
  { id: 105, name: '5K Full Count', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 1400 },

  // Page 24
  { id: 106, name: '10K Redfort (Standard Company)', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 4900, company: 'Standard Company' },
  { id: 107, name: '100 Deluxe', category: 'Crackers', packQuantity: '1 Box – 1 packet', price: 190 },
  { id: 108, name: '2 Round', category: 'Crackers', packQuantity: '1 Box – 1 packet', price: 45 },
  { id: 109, name: '5 "Super Hulk', category: 'Crackers', packQuantity: '1 Packet', price: 65 },
  { id: 110, name: '4 "Super Spider Man', category: 'Crackers', packQuantity: '1 Packet', price: 60 },

  // Page 25
  { id: 111, name: '4 "Ben Ten', category: 'Crackers', packQuantity: '1 Packet', price: 30 },
  { id: 112, name: 'King Cobra Giant', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 25 },
  { id: 113, name: 'Royal Pair – 56 Giant', category: 'Crackers', packQuantity: '1 Box – 1 pcs', price: 65 },
  { id: 114, name: 'Colour Burst (Standard Company)', category: 'Holi Colour', packQuantity: '1 Box – 5 pcs', price: 350, company: 'Standard Company' },
  { id: 115, name: 'Colouring Smoke', category: 'Holi Colour', packQuantity: '1 Box – 3 pcs', price: 160 },

  // Page 26
  { id: 116, name: 'Original Pop Pop', category: 'Hand Throw', packQuantity: '1 Box – 1 packet', price: 10, featured: true },
  { id: 117, name: 'Original Wonder Throw', category: 'Hand Throw', packQuantity: '1 Box – 10 pcs', price: 100 },
  { id: 118, name: 'Classic Bomb', category: 'Bomb', packQuantity: '1 Box – 10 pcs', price: 160 },
  { id: 119, name: 'Hydrogen Bombs Green (Standard Company)', category: 'Bomb', packQuantity: '1 Box – 10 pcs', price: 100, company: 'Standard Company', featured: true },
  { id: 120, name: 'Hydro Bomb', category: 'Bomb', packQuantity: '1 Box – 10 pcs', price: 140 },

  // Page 27
  { id: 121, name: 'Indian Dynamite', category: 'Bomb', packQuantity: '1 Box – 10 pcs', price: 220 },
  { id: 122, name: 'Cylinder Bomb With Smoke', category: 'Bomb', packQuantity: '1 Box – 2 pcs', price: 300 },
  { id: 123, name: 'Evil Dead – 1 Kg', category: 'Paper Bomb', packQuantity: '1 Box – 1 pcs', price: 250, featured: true },
  { id: 124, name: 'Evil Dead – ½ Kg', category: 'Paper Bomb', packQuantity: '1 Box – 1 pcs', price: 130 },

  // Page 28
  { id: 125, name: 'Roster Ultimate Fight – ¼ Kg', category: 'Paper Bomb', packQuantity: '1 Box – 1 pcs', price: 70 },
  { id: 126, name: 'Surveyor Rockets (Standard Company)', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 190, company: 'Standard Company', featured: true },
  { id: 127, name: 'Rainbow Rocket (Standard Company)', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 140, company: 'Standard Company' },

  // Page 29
  { id: 128, name: 'Whistling Rocket', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 240, featured: true },
  { id: 129, name: 'Lunik Express', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 200 },
  { id: 130, name: 'Bomb Rockets (Standard Company)', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 200, company: 'Standard Company' },

  // Page 30
  { id: 131, name: '10 Colour Rocket', category: 'Rocket', packQuantity: '1 Box – 6 pcs', price: 530 },
  { id: 132, name: 'Parachute Rocket', category: 'Rocket', packQuantity: '1 Box – 6 pcs', price: 550, featured: true },
  { id: 133, name: 'Whistle Rocket Champions', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 220 },
  { id: 134, name: '2 Sound Rocket', category: 'Rocket', packQuantity: '1 Box – 10 pcs', price: 320 },

  // Page 31
  { id: 135, name: 'Jai Hind', category: 'Gift Box', packQuantity: '1 Box – 18 s', price: 350, featured: true },
  { id: 136, name: 'Crazy', category: 'Gift Box', packQuantity: '1 Box – 25 s', price: 550 },
  { id: 137, name: 'Dream', category: 'Gift Box', packQuantity: '1 Box – 36 s', price: 850 },
  { id: 138, name: 'Rangeela', category: 'Gift Box', packQuantity: '1 Box – 45 s', price: 1200, featured: true },

  // Page 32
  { id: 139, name: 'Peacock', category: 'Gift Box', packQuantity: '1 Box – 55 s', price: 1600 },
  { id: 140, name: 'Jumbo', category: 'Gift Box', packQuantity: '1 Box – 70 s', price: 1800, featured: true },
];

export async function seedAllData(): Promise<number> {
  console.log('[Seed] Ensuring SVG image assets...');
  ensureImageAssets();

  console.log('[Seed] Seeding 15 categories...');
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

  console.log('[Seed] Seeding all 140 catalogue products...');
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
        description: `Authentic ${raw.name} (${raw.packQuantity}) by Sri Sai Traders Sivakasi. Guaranteed festive sound and dazzling effects. Wholesale and retail orders.`,
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
    console.log(`[Seed] Created admin account: ${adminEmail}`);
  }

  console.log('[Seed] Ensuring default store settings...');
  await Setting.findOneAndUpdate(
    { key: 'STORE_SETTINGS' },
    {
      key: 'STORE_SETTINGS',
      minOrderAmount: 500,
      freeDeliveryThreshold: 5000,
      deliveryFee: 150,
      announcementText: '🎆 Sri Sai Traders: All Types of Wholesale & Retail Crackers • WhatsApp Order Enquiry Active!',
      isStoreOpen: true,
    },
    { upsert: true }
  );

  return productCount;
}

if (require.main === module) {
  connectDB()
    .then(async () => {
      await seedAllData();
      await disconnectDB();
      console.log('[Seed] Finished seeding successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed] Failed:', err);
      process.exit(1);
    });
}
