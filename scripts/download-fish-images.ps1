$ErrorActionPreference = 'Stop'
$dataset = Get-Content -LiteralPath (Join-Path $PSScriptRoot '../data/fishes.json') -Raw | ConvertFrom-Json
$publicDirectory = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public'))
$fishDirectory = Join-Path $publicDirectory 'fish'
$headers = @{ 'User-Agent' = 'ZalaiHalak/2.0 (educational fish identification game)' }

# Reproduce reviewed images instead of selecting new Wikipedia lead images.
foreach ($fish in $dataset.fishes) {
    $destination = [IO.Path]::GetFullPath((Join-Path $publicDirectory $fish.image.TrimStart('/')))
    if (-not $destination.StartsWith($fishDirectory + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Invalid asset path: $($fish.id)"
    }
    if (Test-Path -LiteralPath $destination) { continue }
    $downloadUrl = $fish.imageDownloadUrl
    if (-not $downloadUrl) {
        if ($fish.imageSource -notmatch '^https://commons.wikimedia.org/wiki/File:(.+)$') {
            throw "No reviewed download URL for $($fish.id)"
        }
        $title = [Uri]::UnescapeDataString($Matches[1])
        $downloadUrl = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + [Uri]::EscapeDataString($title) + '?width=1600'
    }
    $temporaryFile = $destination + '.download'
    $downloaded = $false
    foreach ($delaySeconds in @(0, 5, 15, 30)) {
        if ($delaySeconds) { Start-Sleep -Seconds $delaySeconds }
        try {
            Invoke-WebRequest -Uri $downloadUrl -Headers $headers -OutFile $temporaryFile
            $bytes = [IO.File]::ReadAllBytes($temporaryFile)
            $isJpeg = $bytes.Length -gt 3 -and $bytes[0] -eq 255 -and $bytes[1] -eq 216 -and $bytes[2] -eq 255
            $isPng = $bytes.Length -gt 8 -and $bytes[0] -eq 137 -and $bytes[1] -eq 80 -and $bytes[2] -eq 78 -and $bytes[3] -eq 71
            if (-not ($isJpeg -or $isPng)) { throw "Not a supported image: $($fish.id)" }
            Move-Item -LiteralPath $temporaryFile -Destination $destination
            $downloaded = $true
            break
        }
        catch {
            if ($_.Exception.Response.StatusCode.value__ -ne 429) { throw }
        }
    }
    if (-not $downloaded) { throw "Download remained rate-limited: $($fish.id)" }
    Write-Output "Letöltve: $($fish.nameHu)"
}
