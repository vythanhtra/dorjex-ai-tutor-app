# save_progress.ps1 — Governance: Smart Commit & Push (with Auto Repo Check)
# Usage: .\scripts\save_progress.ps1 "feat: add login page"
# Usage: .\scripts\save_progress.ps1              (auto-generate commit message)
# Usage: .\scripts\save_progress.ps1 "" --private  (create repo as private)

param(
    [string]$Message    = "",
    [switch]$Private    = $false,
    [string]$RepoName   = "",
    [string]$Description = ""
)

Set-Location $PSScriptRoot\..

# ─────────────────────────────────────────────
# STEP 0: Resolve repo name from remote or folder
# ─────────────────────────────────────────────
$remoteUrl = git remote get-url origin 2>$null
if ($remoteUrl -match "github\.com[:/](.+/.+?)(?:\.git)?$") {
    $repoFullName = $Matches[1]   # e.g. "vythanhtra/dorjex-ai-tutor-app"
} else {
    # No remote yet — derive from folder name
    $folderName = Split-Path (Get-Location) -Leaf
    if (-not $RepoName) { $RepoName = $folderName }
    $ghUser = (gh api user --jq '.login' 2>$null)
    if (-not $ghUser) {
        Write-Host "❌ Not logged in to GitHub CLI. Run: gh auth login" -ForegroundColor Red
        exit 1
    }
    $repoFullName = "$ghUser/$RepoName"
}

$repoOwner, $repoSlug = $repoFullName -split "/", 2

Write-Host ""
Write-Host "🔍 Checking GitHub repo: $repoFullName ..." -ForegroundColor DarkCyan

# ─────────────────────────────────────────────
# STEP 1: Check if repo exists on GitHub
# ─────────────────────────────────────────────
$repoCheck = gh api "repos/$repoFullName" 2>&1
$repoExists = $LASTEXITCODE -eq 0

if ($repoExists) {
    Write-Host "✅ Repo exists: https://github.com/$repoFullName" -ForegroundColor Green
} else {
    Write-Host "⚠️  Repo NOT found. Creating: $repoFullName ..." -ForegroundColor Yellow

    $visibility  = if ($Private) { "--private" } else { "--public" }
    $desc        = if ($Description) { $Description } else { "Auto-created by save_progress.ps1" }

    gh repo create $repoSlug $visibility --description $desc --source . --remote origin --push 2>&1

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to create repo. Check `gh auth status`." -ForegroundColor Red
        exit 1
    }

    Write-Host "🎉 Repo created & pushed: https://github.com/$repoFullName" -ForegroundColor Green
    exit 0   # gh repo create --push already committed, done.
}

# ─────────────────────────────────────────────
# STEP 2: Ensure remote origin is set
# ─────────────────────────────────────────────
$existingRemote = git remote get-url origin 2>$null
if (-not $existingRemote) {
    git remote add origin "https://github.com/$repoFullName.git"
    Write-Host "🔗 Remote 'origin' set to https://github.com/$repoFullName.git" -ForegroundColor Cyan
}

# ─────────────────────────────────────────────
# STEP 3: Check if there's anything to commit
# ─────────────────────────────────────────────
$status = git status --porcelain
if (-not $status) {
    Write-Host "✅ Nothing to commit. Working tree is clean." -ForegroundColor Green
    exit 0
}

git add .

# ─────────────────────────────────────────────
# STEP 4: Auto-generate commit message if empty
# ─────────────────────────────────────────────
if (-not $Message) {
    $changed = git diff --cached --name-only | Select-Object -First 5
    $summary = $changed -join ", "
    $Message = "chore: update $summary"
}

# ─────────────────────────────────────────────
# STEP 5: Commit & Push
# ─────────────────────────────────────────────
git commit -m $Message

$branch = git rev-parse --abbrev-ref HEAD
git push origin $branch

Write-Host ""
Write-Host "🚀 Pushed to: https://github.com/$repoFullName" -ForegroundColor Cyan
Write-Host "📝 Commit   : $Message" -ForegroundColor Yellow
Write-Host "🌿 Branch   : $branch" -ForegroundColor DarkYellow
