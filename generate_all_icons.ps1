$svgs = @{
  'roll-caps' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="cap-red" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FF5252" />
      <stop offset="100%" stop-color="#B71C1C" />
    </radialGradient>
  </defs>
  <!-- Cylindrical roll rolls -->
  <g transform="rotate(-15 100 100)">
    <rect x="50" y="60" width="70" height="60" rx="10" fill="url(#cap-red)" stroke="#880E4F" stroke-width="2"/>
    <ellipse cx="85" cy="60" rx="35" ry="12" fill="#FF8A80" stroke="#880E4F" stroke-width="2"/>
    <ellipse cx="85" cy="60" rx="20" ry="7" fill="#C2185B"/>
    <ellipse cx="85" cy="60" rx="6" ry="2" fill="#3E2723"/>
    <!-- Unraveling paper tape -->
    <path d="M120,95 Q145,100 160,125 Q170,140 180,135" fill="none" stroke="#FF5252" stroke-width="8" stroke-linecap="round"/>
    <circle cx="135" cy="104" r="3" fill="#FFE082"/>
    <circle cx="152" cy="118" r="3" fill="#FFE082"/>
    <circle cx="166" cy="133" r="3" fill="#FFE082"/>
  </g>
  <!-- Second stacked roll -->
  <rect x="75" y="105" width="60" height="50" rx="8" fill="url(#cap-red)" stroke="#880E4F" stroke-width="2"/>
  <ellipse cx="105" cy="105" rx="30" ry="10" fill="#FF8A80" stroke="#880E4F" stroke-width="2"/>
  <ellipse cx="105" cy="105" rx="15" ry="5" fill="#C2185B"/>
</svg>
'@

  'twinkling' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="twinkle-body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3F51B5" />
      <stop offset="50%" stop-color="#7986CB" />
      <stop offset="100%" stop-color="#303F9F" />
    </linearGradient>
  </defs>
  <!-- Central Sparkler Wand -->
  <line x1="100" y1="40" x2="100" y2="185" stroke="#B0BEC5" stroke-width="5" stroke-linecap="round"/>
  <rect x="94" y="45" width="12" height="95" rx="3" fill="url(#twinkle-body)"/>
  <!-- Silver / Golden Twinkling Spark Array -->
  <polygon points="100,10 108,35 130,38 112,50 118,75 100,58 82,75 88,50 70,38 92,35" fill="#FFF9C4" stroke="#FFF" stroke-width="1.5"/>
  <circle cx="100" cy="42" r="10" fill="#FFFFFF"/>
  <circle cx="65" cy="30" r="5" fill="#FFF59D"/>
  <circle cx="135" cy="30" r="5" fill="#FFF59D"/>
  <circle cx="45" cy="60" r="4" fill="#FFE082"/>
  <circle cx="155" cy="60" r="4" fill="#FFE082"/>
  <line x1="100" y1="15" x2="100" y2="0" stroke="#FFF" stroke-width="2"/>
  <line x1="125" y1="20" x2="140" y2="10" stroke="#FFF59D" stroke-width="2"/>
  <line x1="75" y1="20" x2="60" y2="10" stroke="#FFF59D" stroke-width="2"/>
</svg>
'@

  'flower-pot' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="pot-body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D84315" />
      <stop offset="50%" stop-color="#FF7043" />
      <stop offset="100%" stop-color="#BF360C" />
    </linearGradient>
    <radialGradient id="fountain-sparks" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#FFFDE7" />
      <stop offset="40%" stop-color="#FFEB3B" />
      <stop offset="70%" stop-color="#FF9800" />
      <stop offset="100%" stop-color="#E65100" stop-opacity="0" />
    </radialGradient>
  </defs>
  <!-- Gushing Fountain Shower of Sparks -->
  <path d="M100,105 Q60,30 25,60 Q70,10 100,15 Q130,10 175,60 Q140,30 100,105 Z" fill="url(#fountain-sparks)"/>
  <circle cx="100" cy="50" r="16" fill="#FFF" opacity="0.9"/>
  <circle cx="70" cy="40" r="6" fill="#FFF9C4"/>
  <circle cx="130" cy="40" r="6" fill="#FFF9C4"/>
  <circle cx="45" cy="55" r="4" fill="#FFD54F"/>
  <circle cx="155" cy="55" r="4" fill="#FFD54F"/>
  <!-- The Flower Pot Cone Base -->
  <polygon points="65,180 135,180 115,105 85,105" fill="url(#pot-body)" stroke="#795548" stroke-width="1.5"/>
  <ellipse cx="100" cy="105" rx="15" ry="4" fill="#FFD54F" stroke="#E65100" stroke-width="1"/>
  <ellipse cx="100" cy="180" rx="35" ry="8" fill="#BF360C"/>
  <!-- Decorative Band -->
  <polygon points="73,150 127,150 124,138 76,138" fill="#FFD700"/>
  <circle cx="100" cy="144" r="4" fill="#D84315"/>
</svg>
'@

  'colour-koti' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="koti-stripes" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00C853" />
      <stop offset="33%" stop-color="#FFD600" />
      <stop offset="66%" stop-color="#FF3D00" />
      <stop offset="100%" stop-color="#D500F9" />
    </linearGradient>
  </defs>
  <!-- Tall Colorful Fountain Plume -->
  <path d="M100,90 C80,30 50,20 40,35 C70,10 130,10 160,35 C150,20 120,30 100,90 Z" fill="#76FF03" opacity="0.8"/>
  <path d="M100,90 C90,40 70,25 65,40 C85,20 115,20 135,40 C130,25 110,40 100,90 Z" fill="#FF1744" opacity="0.9"/>
  <!-- Cylindrical Koti Tower -->
  <rect x="80" y="90" width="40" height="90" rx="6" fill="url(#koti-stripes)" stroke="#37474F" stroke-width="2"/>
  <ellipse cx="100" cy="90" rx="20" ry="5" fill="#FFEB3B"/>
  <ellipse cx="100" cy="180" rx="20" ry="5" fill="#4A148C"/>
  <!-- Colorful sparkling stars -->
  <circle cx="45" cy="30" r="5" fill="#00E676"/>
  <circle cx="155" cy="30" r="5" fill="#FF5252"/>
  <circle cx="100" cy="20" r="6" fill="#FFD600"/>
</svg>
'@

  'chakkar' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="chakkar-fire" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9C4" />
      <stop offset="30%" stop-color="#FFB300" />
      <stop offset="60%" stop-color="#F4511E" />
      <stop offset="100%" stop-color="#B71C1C" />
    </radialGradient>
  </defs>
  <!-- Swirling Wheel of Sparks -->
  <circle cx="100" cy="100" r="75" fill="none" stroke="#FF9800" stroke-width="10" stroke-dasharray="24 16" transform="rotate(25 100 100)"/>
  <circle cx="100" cy="100" r="60" fill="url(#chakkar-fire)" stroke="#FFD54F" stroke-width="3"/>
  <circle cx="100" cy="100" r="42" fill="#E65100" stroke="#FFECB3" stroke-width="4" stroke-dasharray="14 10" transform="rotate(-35 100 100)"/>
  <circle cx="100" cy="100" r="22" fill="#BF360C" stroke="#FFF" stroke-width="2"/>
  <circle cx="100" cy="100" r="8" fill="#FFF59D"/>
  <!-- Center Pin -->
  <circle cx="100" cy="100" r="4" fill="#212121"/>
  <!-- Dynamic Flame jets radiating -->
  <path d="M100,25 Q120,40 100,55 Z" fill="#FFEB3B"/>
  <path d="M175,100 Q160,120 145,100 Z" fill="#FFEB3B"/>
  <path d="M100,175 Q80,160 100,145 Z" fill="#FFEB3B"/>
  <path d="M25,100 Q40,80 55,100 Z" fill="#FFEB3B"/>
</svg>
'@

  'comet' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="box-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1A237E" />
      <stop offset="50%" stop-color="#283593" />
      <stop offset="100%" stop-color="#0D47A1" />
    </linearGradient>
  </defs>
  <!-- Skyward Comet Trail -->
  <line x1="100" y1="100" x2="100" y2="15" stroke="#FF5722" stroke-width="8" stroke-linecap="round"/>
  <line x1="90" y1="95" x2="60" y2="25" stroke="#FF9800" stroke-width="5" stroke-linecap="round"/>
  <line x1="110" y1="95" x2="140" y2="25" stroke="#FFD54F" stroke-width="5" stroke-linecap="round"/>
  <!-- Comet Bursts in Sky -->
  <circle cx="100" cy="15" r="14" fill="#FFEB3B"/>
  <polygon points="100,5 103,12 110,15 103,18 100,25 97,18 90,15 97,12" fill="#FFF"/>
  <circle cx="60" cy="25" r="8" fill="#FF7043"/>
  <circle cx="140" cy="25" r="8" fill="#42A5F5"/>
  <!-- Multi-shot Cake Box Base -->
  <rect x="65" y="95" width="70" height="85" rx="8" fill="url(#box-grad)" stroke="#3949AB" stroke-width="2"/>
  <!-- Internal Shot Tubes visible at top -->
  <rect x="72" y="98" width="16" height="12" rx="3" fill="#FFD700"/>
  <rect x="92" y="98" width="16" height="12" rx="3" fill="#FFD700"/>
  <rect x="112" y="98" width="16" height="12" rx="3" fill="#FFD700"/>
  <!-- Label on box -->
  <rect x="72" y="125" width="56" height="35" rx="4" fill="#D32F2F"/>
  <text x="100" y="145" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="900">SHOTS</text>
</svg>
'@

  'crackers' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="red-stick" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C62828" />
      <stop offset="50%" stop-color="#E53935" />
      <stop offset="100%" stop-color="#B71C1C" />
    </linearGradient>
  </defs>
  <!-- Rolled up Red String Crackers (Laris / Bijili) -->
  <g transform="translate(10, 10)">
    <!-- Central roll coils -->
    <ellipse cx="90" cy="90" rx="65" ry="40" fill="none" stroke="#D32F2F" stroke-width="20" stroke-dasharray="14 6"/>
    <ellipse cx="90" cy="90" rx="45" ry="26" fill="none" stroke="#B71C1C" stroke-width="16" stroke-dasharray="12 5"/>
    <ellipse cx="90" cy="90" rx="25" ry="14" fill="#FF5252"/>
    <!-- Yellow fuse string connecting the crackers -->
    <path d="M40,90 Q90,40 140,80 T170,120" fill="none" stroke="#FFD54F" stroke-width="4"/>
    <circle cx="170" cy="120" r="6" fill="#FF9800"/>
    <polygon points="170,114 172,118 176,120 172,122 170,126 168,122 164,120 168,118" fill="#FFF"/>
  </g>
</svg>
'@

  'holi-colour' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Piles of festive colored powders -->
  <!-- Cyan Mound -->
  <path d="M45,150 Q75,85 105,150 Z" fill="#00E5FF"/>
  <!-- Pink / Magenta Mound -->
  <path d="M95,150 Q125,75 155,150 Z" fill="#E91E63"/>
  <!-- Yellow Mound in Front -->
  <path d="M70,165 Q100,105 130,165 Z" fill="#FFEA00"/>
  <!-- Green Splatter -->
  <path d="M120,165 Q145,120 170,165 Z" fill="#00E676"/>
  <!-- Powder mist in air -->
  <circle cx="100" cy="65" r="22" fill="#E040FB" opacity="0.6"/>
  <circle cx="65" cy="75" r="16" fill="#00B0FF" opacity="0.6"/>
  <circle cx="135" cy="75" r="18" fill="#FFD600" opacity="0.6"/>
</svg>
'@

  'hand-throw' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="pop-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00BCD4" />
      <stop offset="100%" stop-color="#00838F" />
    </linearGradient>
  </defs>
  <!-- Snap Pop Paper Drops -->
  <!-- Red Pop Pop -->
  <circle cx="70" cy="115" r="26" fill="#F44336" stroke="#B71C1C" stroke-width="2"/>
  <path d="M70,89 Q62,65 72,55 Q78,65 70,89 Z" fill="#FFCDD2" stroke="#E57373" stroke-width="1.5"/>
  <!-- Blue Pop Pop -->
  <circle cx="125" cy="125" r="24" fill="url(#pop-blue)" stroke="#006064" stroke-width="2"/>
  <path d="M125,101 Q118,78 128,70 Q134,80 125,101 Z" fill="#B2EBF2" stroke="#4DD0E1" stroke-width="1.5"/>
  <!-- Yellow Pop Pop -->
  <circle cx="100" cy="150" r="22" fill="#FFEB3B" stroke="#F57F17" stroke-width="2"/>
  <!-- Friction Impact Spark at top -->
  <polygon points="100,20 105,35 120,38 107,48 111,62 99,52 87,61 92,47 79,37 94,34" fill="#FF5722"/>
  <circle cx="100" cy="40" r="7" fill="#FFEB3B"/>
</svg>
'@

  'bomb' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bomb-body" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#4CAF50" />
      <stop offset="50%" stop-color="#2E7D32" />
      <stop offset="100%" stop-color="#1B5E20" />
    </radialGradient>
  </defs>
  <!-- Burning Wick / Fuse -->
  <path d="M100,60 Q115,30 135,35" fill="none" stroke="#795548" stroke-width="5" stroke-linecap="round"/>
  <!-- Sparking Flame at Wick tip -->
  <polygon points="135,32 142,37 150,33 145,41 152,47 143,48 141,56 137,49 130,51 133,43" fill="#FFEB3B"/>
  <circle cx="138" cy="42" r="5" fill="#FF5722"/>
  <!-- Cap Collar -->
  <rect x="90" y="58" width="20" height="12" rx="3" fill="#616161"/>
  <!-- Green Hydro / Hydrogen Bomb Sphere -->
  <circle cx="100" cy="120" r="58" fill="url(#bomb-body)" stroke="#1B5E20" stroke-width="2"/>
  <rect x="68" y="112" width="64" height="22" rx="4" fill="#D32F2F"/>
  <text x="100" y="128" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="900">HYDRO</text>
</svg>
'@

  'paper-bomb' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="kraft-paper" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8D6E63" />
      <stop offset="50%" stop-color="#6D4C41" />
      <stop offset="100%" stop-color="#4E342E" />
    </linearGradient>
  </defs>
  <!-- Triangular Tied Kraft Paper Bomb Shell -->
  <polygon points="100,45 165,160 35,160" fill="url(#kraft-paper)" stroke="#3E2723" stroke-width="3"/>
  <!-- Yellow / Jute String Bindings -->
  <line x1="100" y1="45" x2="100" y2="160" stroke="#FFD54F" stroke-width="4"/>
  <line x1="68" y1="102" x2="165" y2="160" stroke="#FFD54F" stroke-width="3.5"/>
  <line x1="132" y1="102" x2="35" y2="160" stroke="#FFD54F" stroke-width="3.5"/>
  <!-- Red Rooster / Evil Dead Badge on front -->
  <polygon points="100,90 125,135 75,135" fill="#D32F2F"/>
  <text x="100" y="125" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="900">1 KG</text>
  <!-- Fuse sticking out from top apex -->
  <path d="M100,45 Q105,25 120,20" fill="none" stroke="#FF9800" stroke-width="4"/>
  <circle cx="120" cy="20" r="5" fill="#FFEB3B"/>
</svg>
'@

  'rocket' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="rocket-body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E53935" />
      <stop offset="50%" stop-color="#FF5252" />
      <stop offset="100%" stop-color="#C62828" />
    </linearGradient>
  </defs>
  <!-- Long Bamboo Guide Stick -->
  <line x1="100" y1="80" x2="100" y2="195" stroke="#8D6E63" stroke-width="5" stroke-linecap="round"/>
  <!-- Rocket Conical Nosecone -->
  <polygon points="100,15 118,55 82,55" fill="#FFD600" stroke="#F57F17" stroke-width="2"/>
  <!-- Rocket Body Tube -->
  <rect x="85" y="55" width="30" height="70" rx="3" fill="url(#rocket-body)" stroke="#B71C1C" stroke-width="2"/>
  <text x="100" y="95" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="900" transform="rotate(-90 100 95)">LUNIK</text>
  <!-- Stabilizing Fins -->
  <polygon points="85,115 70,128 85,128" fill="#1565C0"/>
  <polygon points="115,115 130,128 115,128" fill="#1565C0"/>
  <!-- Bottom Exhaust Wick -->
  <line x1="100" y1="125" x2="100" y2="140" stroke="#FF9800" stroke-width="3"/>
  <circle cx="100" cy="140" r="3" fill="#FFEB3B"/>
</svg>
'@

  'gift-box' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="box-red" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D32F2F" />
      <stop offset="50%" stop-color="#C62828" />
      <stop offset="100%" stop-color="#880E4F" />
    </linearGradient>
    <linearGradient id="gold-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF59D" />
      <stop offset="50%" stop-color="#FFD700" />
      <stop offset="100%" stop-color="#FFA000" />
    </linearGradient>
  </defs>
  <!-- Luxury Assortment Gift Box -->
  <rect x="40" y="70" width="120" height="100" rx="10" fill="url(#box-red)" stroke="#B71C1C" stroke-width="2"/>
  <!-- Box Lid -->
  <rect x="34" y="58" width="132" height="22" rx="6" fill="#E53935" stroke="#C62828" stroke-width="2"/>
  <!-- Gold Ribbon Vertical -->
  <rect x="91" y="58" width="18" height="112" fill="url(#gold-ribbon)"/>
  <!-- Gold Ribbon Horizontal -->
  <rect x="40" y="110" width="120" height="16" fill="url(#gold-ribbon)"/>
  <!-- Gift Ribbon Bow at Top -->
  <path d="M100,58 C85,35 65,42 75,55 C85,65 100,58 100,58 Z" fill="url(#gold-ribbon)"/>
  <path d="M100,58 C115,35 135,42 125,55 C115,65 100,58 100,58 Z" fill="url(#gold-ribbon)"/>
  <circle cx="100" cy="58" r="7" fill="#FFF9C4"/>
  <!-- Star Fireworks on Lid -->
  <polygon points="60,78 62,83 67,84 63,88 64,93 60,90 56,93 57,88 53,84 58,83" fill="#FFD700"/>
  <polygon points="140,78 142,83 147,84 143,88 144,93 140,90 136,93 137,88 133,84 138,83" fill="#FFD700"/>
</svg>
'@
}

New-Item -ItemType Directory -Force -Path "c:\cracker\frontend\public\images\products" | Out-Null
New-Item -ItemType Directory -Force -Path "c:\cracker\frontend\public\images\categories" | Out-Null
New-Item -ItemType Directory -Force -Path "c:\cracker\backend\uploads\categories" | Out-Null

foreach ($key in $svgs.Keys) {
  $content = $svgs[$key]
  [System.IO.File]::WriteAllText("c:\cracker\frontend\public\images\products\$($key).svg", $content)
  [System.IO.File]::WriteAllText("c:\cracker\frontend\public\images\categories\$($key).svg", $content)
  [System.IO.File]::WriteAllText("c:\cracker\backend\uploads\categories\$($key).svg", $content)
}

# Also ensure sparkles & fancy in categories folder
Copy-Item -Force "c:\cracker\frontend\public\images\products\sparkles.svg" "c:\cracker\frontend\public\images\categories\sparkles.svg"
Copy-Item -Force "c:\cracker\frontend\public\images\products\fancy.svg" "c:\cracker\frontend\public\images\categories\fancy.svg"
Copy-Item -Force "c:\cracker\frontend\public\images\products\sparkles.svg" "c:\cracker\backend\uploads\categories\sparkles.svg"
Copy-Item -Force "c:\cracker\frontend\public\images\products\fancy.svg" "c:\cracker\backend\uploads\categories\fancy.svg"
Copy-Item -Force "c:\cracker\frontend\public\images\products\sparkles.svg" "c:\cracker\backend\uploads\categories\default.svg"

Write-Output "Generated all 15 SVG categories successfully!"
