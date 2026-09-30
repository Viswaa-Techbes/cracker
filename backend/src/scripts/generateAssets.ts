import fs from 'fs';
import path from 'path';

export function ensureImageAssets() {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const catDir = path.join(uploadsDir, 'categories');
  const prodDir = path.join(uploadsDir, 'products');

  [uploadsDir, catDir, prodDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const categoryThemes: Record<string, { bg1: string; bg2: string; icon: string; title: string }> = {
    sparkles: {
      bg1: '#FF6F00',
      bg2: '#FFD54F',
      title: 'Sparkles',
      icon: `<path d="M100,30 L115,75 L160,85 L125,115 L135,160 L95,130 L55,160 L65,115 L30,85 L75,75 Z" fill="#FFE082" />
             <line x1="100" y1="130" x2="100" y2="190" stroke="#FF8F00" stroke-width="6" stroke-linecap="round" />`,
    },
    fancy: {
      bg1: '#7B1FA2',
      bg2: '#E040FB',
      title: 'Fancy',
      icon: `<circle cx="100" cy="90" r="45" fill="#FF4081" />
             <polygon points="100,20 120,60 170,70 130,105 145,155 100,125 55,155 70,105 30,70 80,60" fill="#FFD700" opacity="0.8" />`,
    },
    'roll-caps': {
      bg1: '#C2185B',
      bg2: '#FF80AB',
      title: 'Roll Caps',
      icon: `<circle cx="100" cy="100" r="50" fill="none" stroke="#E91E63" stroke-width="14" stroke-dasharray="10 8" />
             <circle cx="100" cy="100" r="25" fill="#FF4081" />`,
    },
    twinkling: {
      bg1: '#303F9F',
      bg2: '#7C4DFF',
      title: 'Twinkling',
      icon: `<path d="M100,30 Q100,100 170,100 Q100,100 100,170 Q100,100 30,100 Q100,100 100,30 Z" fill="#FFF59D" />
             <circle cx="60" cy="60" r="8" fill="#FFF9C4" />
             <circle cx="140" cy="140" r="10" fill="#FFF9C4" />`,
    },
    'flower-pot': {
      bg1: '#E64A19',
      bg2: '#FFAB40',
      title: 'Flower Pot',
      icon: `<polygon points="70,170 130,170 145,100 55,100" fill="#D84315" />
             <path d="M55,100 Q100,20 145,100" fill="#FFD54F" />
             <path d="M100,90 Q90,30 100,15 Q110,30 100,90" fill="#FFF" />
             <circle cx="70" cy="50" r="4" fill="#FFEB3B" />
             <circle cx="130" cy="50" r="4" fill="#FFEB3B" />`,
    },
    'colour-koti': {
      bg1: '#00796B',
      bg2: '#00E676',
      title: 'Colour Koti',
      icon: `<polygon points="75,180 125,180 115,80 85,80" fill="#00897B" />
             <path d="M100,80 L130,20 L100,35 L70,20 Z" fill="#76FF03" />`,
    },
    chakkar: {
      bg1: '#F57C00',
      bg2: '#FFEB3B',
      title: 'Chakkar',
      icon: `<circle cx="100" cy="100" r="60" fill="none" stroke="#E65100" stroke-width="12" stroke-dasharray="24 12" />
             <circle cx="100" cy="100" r="35" fill="none" stroke="#FF9800" stroke-width="10" stroke-dasharray="16 8" />
             <circle cx="100" cy="100" r="15" fill="#D84315" />`,
    },
    comet: {
      bg1: '#1A237E',
      bg2: '#536DFE',
      title: 'Comet Shots',
      icon: `<rect x="70" y="80" width="60" height="90" rx="6" fill="#283593" />
             <circle cx="100" cy="65" r="14" fill="#FFD600" />
             <line x1="100" y1="50" x2="100" y2="15" stroke="#FF5722" stroke-width="8" stroke-linecap="round" />
             <circle cx="80" cy="25" r="5" fill="#FF9E80" />
             <circle cx="120" cy="25" r="5" fill="#FF9E80" />`,
    },
    crackers: {
      bg1: '#C62828',
      bg2: '#FF5252',
      title: 'Crackers',
      icon: `<rect x="60" y="70" width="20" height="80" rx="4" fill="#B71C1C" transform="rotate(-15 70 110)" />
             <rect x="85" y="65" width="20" height="80" rx="4" fill="#D32F2F" />
             <rect x="110" y="70" width="20" height="80" rx="4" fill="#B71C1C" transform="rotate(15 120 110)" />
             <path d="M95,65 Q100,35 110,30" stroke="#FFD54F" stroke-width="4" fill="none" />
             <circle cx="112" cy="28" r="6" fill="#FFEB3B" />`,
    },
    'holi-colour': {
      bg1: '#00838F',
      bg2: '#00E5FF',
      title: 'Holi Colour',
      icon: `<circle cx="80" cy="90" r="30" fill="#E91E63" opacity="0.8" />
             <circle cx="120" cy="90" r="30" fill="#FFEB3B" opacity="0.8" />
             <circle cx="100" cy="130" r="30" fill="#00E676" opacity="0.8" />`,
    },
    bomb: {
      bg1: '#37474F',
      bg2: '#78909C',
      title: 'Bomb',
      icon: `<circle cx="100" cy="115" r="50" fill="#212121" />
             <rect x="92" y="55" width="16" height="15" fill="#616161" rx="2" />
             <path d="M100,55 Q115,35 130,40" stroke="#FF5722" stroke-width="4" fill="none" />
             <polygon points="130,35 140,40 135,45 142,50 130,48" fill="#FFEB3B" />`,
    },
    'paper-bomb': {
      bg1: '#4E342E',
      bg2: '#A1887F',
      title: 'Paper Bomb',
      icon: `<polygon points="100,45 155,80 155,140 100,175 45,140 45,80" fill="#5D4037" stroke="#FFCC80" stroke-width="4" />
             <line x1="45" y1="80" x2="155" y2="140" stroke="#FFCC80" stroke-width="3" />
             <line x1="155" y1="80" x2="45" y2="140" stroke="#FFCC80" stroke-width="3" />
             <line x1="100" y1="45" x2="100" y2="175" stroke="#FFCC80" stroke-width="3" />`,
    },
    rocket: {
      bg1: '#D81B60',
      bg2: '#FF4081',
      title: 'Rocket',
      icon: `<polygon points="100,20 120,60 80,60" fill="#D50000" />
             <rect x="85" y="60" width="30" height="70" fill="#1565C0" rx="3" />
             <polygon points="75,130 85,110 85,130" fill="#E65100" />
             <polygon points="125,130 115,110 115,130" fill="#E65100" />
             <line x1="100" y1="130" x2="100" y2="185" stroke="#795548" stroke-width="4" />
             <path d="M95,130 L100,150 L105,130 Z" fill="#FFC107" />`,
    },
    'gift-box': {
      bg1: '#B71C1C',
      bg2: '#FFD700',
      title: 'Gift Box',
      icon: `<rect x="50" y="80" width="100" height="90" fill="#C62828" rx="6" />
             <rect x="44" y="65" width="112" height="20" fill="#D32F2F" rx="4" />
             <rect x="93" y="65" width="14" height="105" fill="#FFD700" />
             <path d="M85,50 C80,35 65,40 75,55 C85,65 95,65 95,65 C95,65 95,55 85,50 Z" fill="#FFD700" />
             <path d="M115,50 C120,35 135,40 125,55 C115,65 105,65 105,65 C105,65 105,55 115,50 Z" fill="#FFD700" />`,
    },
  };

  // Generate category SVGs
  Object.entries(categoryThemes).forEach(([slug, theme]) => {
    const filePath = path.join(catDir, `${slug}.svg`);
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <defs>
    <radialGradient id="grad-${slug}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${theme.bg2}" />
      <stop offset="100%" stop-color="${theme.bg1}" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="200" height="200" rx="24" fill="url(#grad-${slug})" />
  <g filter="url(#shadow)">
    ${theme.icon}
  </g>
  <text x="100" y="185" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" letter-spacing="1">${theme.title.toUpperCase()}</text>
</svg>`;
    fs.writeFileSync(filePath, svgContent, 'utf-8');
  });

  // Default category SVG
  fs.writeFileSync(
    path.join(catDir, 'default.svg'),
    fs.readFileSync(path.join(catDir, 'sparkles.svg'))
  );
}
