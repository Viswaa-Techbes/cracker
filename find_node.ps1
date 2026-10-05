$paths = @(
    "C:\Program Files\nodejs\node.exe",
    "C:\Program Files (x86)\nodejs\node.exe",
    "$env:LOCALAPPDATA\Programs\nodejs\node.exe",
    "$env:APPDATA\npm\node.exe",
    "$env:ProgramFiles\nodejs\node.exe"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        Write-Host "Found Node: $p"
    }
}

# Also search Program Files for node.exe
Get-ChildItem -Path "C:\Program Files" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
Get-ChildItem -Path "C:\Users" -Filter "node.exe" -Recurse -Depth 4 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
