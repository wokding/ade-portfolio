# Script untuk mengkonversi GIF ke MP4 yang lebih efisien
# Cara pakai: .\convert-gif-to-video.ps1

Write-Host "=== GIF to Video Converter ===" -ForegroundColor Cyan

# Download ffmpeg jika belum ada
$ffmpegPath = "$env:TEMP\ffmpeg.exe"
if (-not (Test-Path $ffmpegPath)) {
    Write-Host "Downloading ffmpeg..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" -OutFile "$env:TEMP\ffmpeg.zip"
    Expand-Archive -Path "$env:TEMP\ffmpeg.zip" -DestinationPath "$env:TEMP\ffmpeg-temp" -Force
    $ffmpegExe = Get-ChildItem "$env:TEMP\ffmpeg-temp" -Recurse -Filter "ffmpeg.exe" | Select-Object -First 1
    Copy-Item $ffmpegExe.FullName -Destination $ffmpegPath
    Remove-Item "$env:TEMP\ffmpeg.zip" -Force
    Remove-Item "$env:TEMP\ffmpeg-temp" -Recurse -Force
    Write-Host "ffmpeg downloaded!" -ForegroundColor Green
}

# Konversi doorlock-demo.gif
Write-Host "`nConverting doorlock-demo.gif..." -ForegroundColor Yellow
$inputGif = ".\src\assets\doorlock-demo.gif"
$outputMp4 = ".\public\doorlock-demo.mp4"

if (Test-Path $inputGif) {
    & $ffmpegPath -i $inputGif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -preset slow -crf 22 -an $outputMp4 -y
    
    if (Test-Path $outputMp4) {
        $originalSize = (Get-Item $inputGif).Length / 1MB
        $newSize = (Get-Item $outputMp4).Length / 1MB
        Write-Host "`nSuccess!" -ForegroundColor Green
        Write-Host "Original GIF: $([math]::Round($originalSize, 2)) MB" -ForegroundColor White
        Write-Host "New MP4: $([math]::Round($newSize, 2)) MB" -ForegroundColor White
        Write-Host "Saved: $([math]::Round($originalSize - $newSize, 2)) MB ($([math]::Round(($originalSize - $newSize) / $originalSize * 100, 1))%)" -ForegroundColor Green
    }
} else {
    Write-Host "Error: doorlock-demo.gif not found at $inputGif" -ForegroundColor Red
}

# Konversi apriori-demo.gif jika ada
Write-Host "`nChecking apriori-demo.gif..." -ForegroundColor Yellow
$inputGif2 = ".\src\assets\apriori-demo.gif"
$outputMp42 = ".\public\apriori-demo.mp4"

if (Test-Path $inputGif2) {
    Write-Host "Converting apriori-demo.gif..." -ForegroundColor Yellow
    & $ffmpegPath -i $inputGif2 -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -preset slow -crf 22 -an $outputMp42 -y
    
    if (Test-Path $outputMp42) {
        $originalSize = (Get-Item $inputGif2).Length / 1MB
        $newSize = (Get-Item $outputMp42).Length / 1MB
        Write-Host "`nSuccess!" -ForegroundColor Green
        Write-Host "Original GIF: $([math]::Round($originalSize, 2)) MB" -ForegroundColor White
        Write-Host "New MP4: $([math]::Round($newSize, 2)) MB" -ForegroundColor White
        Write-Host "Saved: $([math]::Round($originalSize - $newSize, 2)) MB ($([math]::Round(($originalSize - $newSize) / $originalSize * 100, 1))%)" -ForegroundColor Green
    }
} else {
    Write-Host "apriori-demo.gif not found (skipping)" -ForegroundColor Gray
}

Write-Host "`n=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Create .env file in root with:" -ForegroundColor White
Write-Host "   VITE_DOORLOCK_VIDEO_URL=/doorlock-demo.mp4" -ForegroundColor Yellow
Write-Host "2. Run: npm run dev" -ForegroundColor White
Write-Host "3. Test the smooth video playback!" -ForegroundColor White
