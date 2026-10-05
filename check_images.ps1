$content = Get-Content 'frontend/lib/catalogueData.ts' -Raw
$matches = [regex]::Matches($content, "image:\s*'([^']+)'")
Write-Host "Found $($matches.Count) image definitions"
$missing = 0
foreach ($m in $matches) {
    $rel = $m.Groups[1].Value.TrimStart('/')
    $path = Join-Path 'frontend/public' $rel
    if (-not (Test-Path $path)) {
        Write-Host "Missing: $path"
        $missing++
    }
}
Write-Host "Total missing files: $missing"
