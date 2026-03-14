# save_progress.ps1 — Governance: Smart Commit & Push
# Usage: .\scripts\save_progress.ps1 "feat: add login page"
# Usage: .\scripts\save_progress.ps1  (auto-generate commit message from staged files)

param(
    [string]$Message = ""
)

Set-Location $PSScriptRoot\..

# Check if there's anything to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "✅ Nothing to commit. Working tree is clean." -ForegroundColor Green
    exit 0
}

git add .

# Auto-generate commit message if not provided
if (-not $Message) {
    $changed = git diff --cached --name-only | Select-Object -First 5
    $summary = $changed -join ", "
    $Message = "chore: update $summary"
}

git commit -m $Message
git push origin master

Write-Host ""
Write-Host "🚀 Pushed to GitHub: https://github.com/vythanhtra/dorjex-ai-tutor-app" -ForegroundColor Cyan
Write-Host "📝 Commit: $Message" -ForegroundColor Yellow
