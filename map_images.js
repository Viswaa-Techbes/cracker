const fs = require('fs');
const path = require('path');

// Page definitions matching PDF:
const pages = [
  { p: 1, count: 5 }, // 1-5
  { p: 2, count: 4 }, // 6-9
  { p: 3, count: 4 }, // 10-13
  { p: 4, count: 4 }, // 14-17
  { p: 5, count: 5 }, // 18-22
  { p: 6, count: 5 }, // 23-27
  { p: 7, count: 5 }, // 28-32
  { p: 8, count: 5 }, // 33-37
  { p: 9, count: 5 }, // 38-42
  { p: 10, count: 5 }, // 43-47
  { p: 11, count: 5 }, // 48-52
  { p: 12, count: 5 }, // 53-57
  { p: 13, count: 5 }, // 58-62
  { p: 14, count: 5 }, // 63-67
  { p: 15, count: 5 }, // 68-72
  { p: 16, count: 4 }, // 73-76
  { p: 17, count: 5 }, // 77-81
  { p: 18, count: 5 }, // 82-86
  { p: 19, count: 5 }, // 87-91
  { p: 20, count: 5 }, // 92-96
  { p: 21, count: 5 }, // 97-101
  { p: 22, count: 4 }, // 102-105
  { p: 23, count: 5, images: [1, 3, 4, 5, 6] }, // 106-110 (107 uses box img 3)
  { p: 24, count: 5 }, // 111-115
  { p: 25, count: 5 }, // 116-120
  { p: 26, count: 4 }, // 121-124
  { p: 27, count: 3 }, // 125-127
  { p: 28, count: 3 }, // 128-130
  { p: 29, count: 4 }, // 131-134
  { p: 30, count: 4 }, // 135-138
  { p: 31, count: 2 }, // 139-140
];

const productImages = [];
for (const pg of pages) {
  if (pg.images) {
    for (let i = 0; i < pg.images.length; i++) {
      const imgFile = 'img_p' + pg.p + '_' + pg.images[i] + '.png';
      productImages.push(imgFile);
    }
  } else {
    for (let i = 1; i <= pg.count; i++) {
      const imgFile = 'img_p' + pg.p + '_' + i + '.png';
      productImages.push(imgFile);
    }
  }
}

// Read catalogueData.ts to extract products
const catFile = path.join('c:', 'cracker', 'frontend', 'lib', 'catalogueData.ts');
let catContent = fs.readFileSync(catFile, 'utf8');

// Ensure destination directories exist
const destDir = path.join('c:', 'cracker', 'frontend', 'public', 'images', 'products');
const backendDestDir = path.join('c:', 'cracker', 'backend', 'uploads', 'products');
fs.mkdirSync(destDir, { recursive: true });
fs.mkdirSync(backendDestDir, { recursive: true });

// Match products like: { id: 1, name: '7 CM Valentine Red', ... }
const lines = catContent.split('\n');
const newLines = [];
let currentId = null;

for (let line of lines) {
  const m = line.match(/id:\s*(\d+),/);
  if (m) {
    currentId = parseInt(m[1], 10);
    const sourceImg = productImages[currentId - 1];
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    if (nameMatch && sourceImg) {
      const name = nameMatch[1];
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const srcPath = path.join('c:', 'cracker', 'extracted_images', sourceImg);
      const destPath = path.join(destDir, slug + '.png');
      const backendDestPath = path.join(backendDestDir, slug + '.png');
      
      fs.copyFileSync(srcPath, destPath);
      fs.copyFileSync(srcPath, backendDestPath);
    }
  }
  
  if (currentId && line.includes("image: '/images/products/")) {
    const nameLine = lines.find((l) => l.includes(`id: ${currentId},`));
    const nameMatch = nameLine ? nameLine.match(/name:\s*'([^']+)'/) : null;
    if (nameMatch) {
      const name = nameMatch[1];
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      line = line.replace(/image:\s*'[^']+'/, `image: '/images/products/${slug}.png'`);
    }
  }
  
  newLines.push(line);
}

fs.writeFileSync(catFile, newLines.join('\n'), 'utf8');
console.log('Successfully mapped and updated all 140 products with real images in catalogueData.ts!');
