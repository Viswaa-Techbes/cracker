$cartRes = Invoke-WebRequest -Uri 'http://localhost:3000/cart' -UseBasicParsing
Write-Host "Cart status code: $($cartRes.StatusCode)"

$homeRes = Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing
Write-Host "Home status code: $($homeRes.StatusCode)"

$hasTechbes = $homeRes.Content.Contains('techbes.co.in')
$hasAdminPortal = $homeRes.Content.Contains('Admin Portal')

Write-Host "Contains techbes.co.in: $hasTechbes"
Write-Host "Contains Admin Portal: $hasAdminPortal"
