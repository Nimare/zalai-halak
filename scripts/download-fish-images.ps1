$ErrorActionPreference = "Stop"

$species = @(
    @{ slug = "karikakeszeg"; title = "Blicca bjoerkna" },
    @{ slug = "deverkeszeg"; title = "Abramis brama" },
    @{ slug = "kusz"; title = "Alburnus alburnus" },
    @{ slug = "fekete-torpeharcsa"; title = "Ameiurus melas" },
    @{ slug = "balin"; title = "Aspius aspius" },
    @{ slug = "ezustkarasz"; title = "Carassius gibelio" },
    @{ slug = "nyurgaponty"; title = "Cyprinus carpio" },
    @{ slug = "csuka"; title = "Esox lucius" },
    @{ slug = "vagodurbincs"; title = "Gymnocephalus cernua" },
    @{ slug = "szeles-durbincs"; title = "Gymnocephalus baloni" },
    @{ slug = "selymes-durbincs"; title = "Gymnocephalus schraetser" },
    @{ slug = "naphal"; title = "Lepomis gibbosus" },
    @{ slug = "domolyko"; title = "Squalius cephalus" },
    @{ slug = "reticsik"; title = "Misgurnus fossilis" },
    @{ slug = "folyami-geb"; title = "Neogobius fluviatilis" },
    @{ slug = "csaposuger"; title = "Perca fluviatilis" },
    @{ slug = "amurgeb"; title = "Perccottus glenii" },
    @{ slug = "razbora"; title = "Pseudorasbora parva" },
    @{ slug = "szivarvanyos-okle"; title = "Rhodeus amarus" },
    @{ slug = "bodorka"; title = "Rutilus rutilus" },
    @{ slug = "sullo"; title = "Sander lucioperca" },
    @{ slug = "kosullo"; title = "Sander volgensis" },
    @{ slug = "vorosszarnyu-keszeg"; title = "Scardinius erythrophthalmus" },
    @{ slug = "harcsa"; title = "Silurus glanis" },
    @{ slug = "compo"; title = "Tinca tinca" },
    @{ slug = "lapi-poc"; title = "Umbra krameri" }
)

$headers = @{ "User-Agent" = "Codex-ZalaFishGame/1.0 (educational asset collection)" }
$outputDirectory = Join-Path $PSScriptRoot "..\public\fish"
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

function Get-PlainText([string]$value) {
    if ([string]::IsNullOrWhiteSpace($value)) { return "" }
    $withoutTags = $value -replace "<[^>]+>", " " -replace "\s+", " "
    return [System.Net.WebUtility]::HtmlDecode($withoutTags).Trim()
}

$wikiResponse = Invoke-RestMethod -Method Post -Uri "https://en.wikipedia.org/w/api.php" -Headers $headers -Body @{
    action = "query"
    format = "json"
    formatversion = 2
    redirects = 1
    prop = "pageimages"
    piprop = "name|original"
    titles = ($species.title -join "|")
}

$resolvedTitles = @{}
foreach ($item in $wikiResponse.query.normalized) { $resolvedTitles[$item.from] = $item.to }
foreach ($item in $wikiResponse.query.redirects) { $resolvedTitles[$item.from] = $item.to }
$wikiPages = @{}
foreach ($page in $wikiResponse.query.pages) { $wikiPages[$page.title] = $page }

function Resolve-WikipediaTitle([string]$title) {
    $resolved = $title
    while ($resolvedTitles.ContainsKey($resolved)) { $resolved = $resolvedTitles[$resolved] }
    return $resolved
}

$fileTitles = @()
foreach ($fish in $species) {
    $wikiPage = $wikiPages[(Resolve-WikipediaTitle $fish.title)]
    if (-not $wikiPage) { throw "No Wikipedia page found for $($fish.title)" }
    if ([string]::IsNullOrWhiteSpace($wikiPage.pageimage)) { throw "No lead image found for $($fish.title)" }
    $fish.wikiPage = $wikiPage
    $fish.fileTitle = $wikiPage.pageimage
    $fileTitles += "File:$($wikiPage.pageimage)"
}

$commonsResponse = Invoke-RestMethod -Method Post -Uri "https://commons.wikimedia.org/w/api.php" -Headers $headers -Body @{
    action = "query"
    format = "json"
    formatversion = 2
    prop = "imageinfo"
    iiprop = "url|size|mime|extmetadata"
    iiurlwidth = 1600
    titles = ($fileTitles -join "|")
}
$commonsPages = @{}
foreach ($page in $commonsResponse.query.pages) { $commonsPages[$page.title] = $page }

foreach ($fish in $species) {
    $wikiPage = $fish.wikiPage
    $fileTitle = $fish.fileTitle

    $commonsLookupTitle = ("File:$fileTitle") -replace "_", " "
    $commonsPage = $commonsPages[$commonsLookupTitle]

    if (-not $commonsPage.imageinfo) {
        throw "The lead image for $($fish.title) is not available on Wikimedia Commons: $fileTitle"
    }

    $imageInfo = $commonsPage.imageinfo[0]
    $license = Get-PlainText $imageInfo.extmetadata.LicenseShortName.value
    if ($license -notmatch "CC|Public domain|PD|GFDL") {
        throw "Unexpected non-free license for $($fish.title): $license"
    }

    $extension = switch ($imageInfo.mime) {
        "image/jpeg" { ".jpg" }
        "image/png" { ".png" }
        "image/webp" { ".webp" }
        default { [System.IO.Path]::GetExtension($imageInfo.url).ToLowerInvariant() }
    }

    # Wikimedia's canonical redirect endpoint is more reliable for small,
    # reproducible batches than repeatedly addressing the thumbnail CDN.
    $encodedDownloadTitle = [uri]::EscapeDataString($fileTitle)
    $downloadUrl = "https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodedDownloadTitle}?width=1600"
    $outputFile = Join-Path $outputDirectory ($fish.slug + $extension)
    if (-not (Test-Path $outputFile)) {
        $downloaded = $false
        foreach ($delaySeconds in @(0, 5, 15, 30)) {
            if ($delaySeconds -gt 0) { Start-Sleep -Seconds $delaySeconds }
            try {
                Invoke-WebRequest -Uri $downloadUrl -Headers $headers -OutFile $outputFile
                $downloaded = $true
                break
            }
            catch {
                if ($_.Exception.Response.StatusCode.value__ -ne 429) { throw }
            }
        }
        if (-not $downloaded) { throw "Download remained rate-limited for $($fish.title)" }
        Start-Sleep -Seconds 2
    }

    [ordered]@{
        slug = $fish.slug
        requestedScientificName = $fish.title
        articleTitle = $wikiPage.title
        fileName = [System.IO.Path]::GetFileName($outputFile)
        commonsFileTitle = $commonsPage.title
        sourcePage = $imageInfo.descriptionurl
        originalUrl = $imageInfo.url
        downloadedUrl = $downloadUrl
        author = Get-PlainText $imageInfo.extmetadata.Artist.value
        credit = Get-PlainText $imageInfo.extmetadata.Credit.value
        license = $license
        licenseUrl = $imageInfo.extmetadata.LicenseUrl.value
        width = if ($imageInfo.thumbwidth) { $imageInfo.thumbwidth } else { $imageInfo.width }
        height = if ($imageInfo.thumbheight) { $imageInfo.thumbheight } else { $imageInfo.height }
    } | ConvertTo-Json -Compress -Depth 5
}
