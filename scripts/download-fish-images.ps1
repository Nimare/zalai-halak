# Compatibility entry point for existing Windows instructions.
$ErrorActionPreference = 'Stop'
& node (Join-Path $PSScriptRoot 'download-fish-images.mjs')
exit $LASTEXITCODE
