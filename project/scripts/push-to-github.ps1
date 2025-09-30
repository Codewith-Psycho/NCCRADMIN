<#
PowerShell helper to push this local repo to GitHub under your account (rajopensource01).

Usage (run in PowerShell on your machine):
  cd C:\Users\rajat\Downloads\Neeledger\project
  .\scripts\push-to-github.ps1

What this script does (interactive):
 - Option A: Use GitHub CLI (gh) to create the remote repo and push (recommended).
 - Option B: Add remote using SSH and push.
 - Option C: Add remote using HTTPS and push (you will need a PAT for authentication).

Notes:
 - This script only runs locally; it will not run in this automated environment.
 - Do NOT paste secrets here. If using HTTPS, the script will prompt for credentials if necessary.
 - Make sure you have configured either:
    * GitHub CLI (gh) and authenticated via `gh auth login`, OR
    * SSH key added to your GitHub account, OR
    * A Personal Access Token (PAT) for HTTPS.

#>

param()

$repoName = "NeeLedger"
$owner = "rajopensource01"
$cwd = (Get-Location).ProviderPath
Write-Host "Repository path: $cwd"
Write-Host "Target GitHub repo: $owner/$repoName`n"

Write-Host "Select method to create remote and push:"
Write-Host "1) GitHub CLI (gh) -- recommended"
Write-Host "2) SSH (git@github.com)" 
Write-Host "3) HTTPS (https://github.com) - will require PAT if authentication needed"

$choice = Read-Host "Enter 1, 2, or 3"

switch ($choice) {
  '1' {
    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
      Write-Host "gh CLI not found. Install GitHub CLI: https://cli.github.com/" -ForegroundColor Yellow
      break
    }
    Write-Host "Creating repo via gh..."
    gh repo create $owner/$repoName --public --source=. --remote=origin --confirm
    git branch -M main
    git push -u origin main
    break
  }
  '2' {
    $remote = "git@github.com:$owner/$repoName.git"
    git branch -M main
    git remote add origin $remote
    git push -u origin main
    break
  }
  '3' {
    $remote = "https://github.com/$owner/$repoName.git"
    git branch -M main
    git remote add origin $remote
    Write-Host "Attempting push. If prompted, use username 'rajopensource01' and your PAT as password."
    git push -u origin main
    break
  }
  Default {
    Write-Host "Invalid choice. Exiting." -ForegroundColor Red
  }
}

Write-Host "Done. If push failed due to authentication, follow the troubleshooting notes in README.md or paste the error here and I'll help."