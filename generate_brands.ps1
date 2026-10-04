$brands = @{
  'standard' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
  <circle cx="28" cy="30" r="20" fill="none" stroke="#0288D1" stroke-width="3"/>
  <circle cx="28" cy="30" r="14" fill="#E1F5FE"/>
  <path d="M28,15 L32,26 L43,26 L34,33 L37,44 L28,37 L19,44 L22,33 L13,26 L24,26 Z" fill="#0288D1"/>
  <text x="56" y="36" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#01579B" letter-spacing="1">STANDARD</text>
  <text x="56" y="46" font-family="Arial, sans-serif" font-weight="700" font-size="7" fill="#0288D1" letter-spacing="1.5">FIREWORKS</text>
</svg>
'@

  'sony' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
  <text x="70" y="38" text-anchor="middle" font-family="'Times New Roman', serif" font-weight="900" font-size="28" fill="#D32F2F" letter-spacing="2">SONY</text>
  <text x="70" y="49" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="6.5" fill="#E53935" letter-spacing="2">FIREWORKS SIVAKASI</text>
</svg>
'@

  'ajanta' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
  <polygon points="26,12 32,24 45,26 35,35 38,48 26,41 14,48 17,35 7,26 20,24" fill="#1565C0"/>
  <text x="54" y="34" font-family="'Brush Script MT', cursive, sans-serif" font-size="22" font-weight="bold" fill="#0D47A1">Ajanta</text>
  <text x="55" y="46" font-family="Arial, sans-serif" font-weight="700" font-size="7" fill="#1976D2" letter-spacing="1">SPARKLERS</text>
</svg>
'@

  'vadivel' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
  <circle cx="28" cy="30" r="18" fill="#FBC02D" stroke="#D32F2F" stroke-width="2.5"/>
  <path d="M28,16 Q35,26 28,34 Q22,26 28,16 Z" fill="#D32F2F"/>
  <text x="54" y="34" font-family="Arial, sans-serif" font-weight="900" font-size="13" fill="#D32F2F" letter-spacing="0.5">VADIVEL</text>
  <text x="54" y="45" font-family="Arial, sans-serif" font-weight="700" font-size="7" fill="#C2185B" letter-spacing="1">PYROTECH</text>
</svg>
'@

  'days365' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
  <rect x="10" y="10" width="120" height="40" rx="8" fill="#FFF9C4" stroke="#F57F17" stroke-width="1.5"/>
  <text x="70" y="27" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#E65100">365 DAYS</text>
  <text x="70" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="10" fill="#BF360C">365 WAYS</text>
</svg>
'@
}

New-Item -ItemType Directory -Force -Path "c:\cracker\frontend\public\images\brands" | Out-Null

foreach ($key in $brands.Keys) {
  $content = $brands[$key]
  [System.IO.File]::WriteAllText("c:\cracker\frontend\public\images\brands\.svg", $content)
}

Write-Output "Brands generated!"
