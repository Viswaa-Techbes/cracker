$baseUrl = "http://localhost:3000"

# 1. Test Products Page
Write-Host "--- Testing GET /products ---"
$res = Invoke-WebRequest -Uri "$baseUrl/products" -UseBasicParsing
Write-Host "Status Code: $($res.StatusCode)"

# 2. Test sample product images across categories
$sampleImages = @(
    "7-cm-valentine-red.png",
    "7-cm-vivid-green.png",
    "7-cm-50-50.png",
    "disco-flash-standard-company.png",
    "tiger-roll-caps.png",
    "flower-pot-big-standard-company.png",
    "colour-koti-thrisul-company.png",
    "ground-chakkar-ashoka-thrisul-company.png",
    "money-heist-30-multicolour-shot.png",
    "bijili-crackers-red.png",
    "colour-burst-standard-company.png",
    "original-pop-pop.png",
    "classic-bomb.png",
    "evil-dead-1-kg.png",
    "surveyor-rockets-standard-company.png",
    "jai-hind.png",
    "jumbo.png"
)

Write-Host "--- Testing Product Images HTTP Responses ---"
$allOk = $true
foreach ($img in $sampleImages) {
    $imgUrl = "$baseUrl/images/products/$img"
    try {
        $imgRes = Invoke-WebRequest -Uri $imgUrl -Method Head -UseBasicParsing
        Write-Host "$img -> $($imgRes.StatusCode) ($($imgRes.Headers['Content-Type']))"
    } catch {
        Write-Host "$img -> FAILED: $_"
        $allOk = $false
    }
}

if ($allOk) {
    Write-Host "ALL SAMPLE PRODUCT IMAGES SERVED WITH HTTP 200 OK!"
} else {
    Write-Host "SOME PRODUCT IMAGES FAILED!"
}
