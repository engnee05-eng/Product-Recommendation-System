@echo off
title Product Recommendation System - Auto Deploy
color 0B

echo.
echo  =====================================================
echo    Product Recommendation System - GitHub Deployer
echo  =====================================================
echo.

REM ── Check Git is installed ──────────────────────────────
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo  [ERROR] Git is not installed or not in PATH.
    echo.
    echo  Please install Git from: https://git-scm.com/download/win
    echo  Then re-run this script.
    echo.
    pause
    exit /b 1
)

REM ── Check npm is available ──────────────────────────────
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo  [ERROR] npm not found. Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo  [OK] Git and npm found.
echo.

REM ── Initialize git repo if first time ───────────────────
if not exist ".git" (
    echo  [STEP 1] Initializing Git repository...
    git init
    git branch -M main
    echo  Done.
    echo.
) else (
    echo  [STEP 1] Git repository already initialized.
    echo.
)

REM ── Set up remote origin if not set ─────────────────────
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo  [STEP 2] No remote origin found.
    echo.
    echo  Go to https://github.com/new and create a new repository named:
    echo    product-recommendation-system
    echo  (Make it PUBLIC, do NOT initialize with README)
    echo.
    set /p REPO_URL="  Paste your GitHub repo URL here (e.g. https://github.com/engnee05-eng/Product-Recommendation-System): "
    echo.
    git remote add origin "%REPO_URL%"
    echo  Remote origin set to: %REPO_URL%
    echo.

    REM Update homepage in package.json hint
    echo  [TIP] Update the homepage in package.json to match your GitHub username.
    echo.
) else (
    echo  [STEP 2] Remote origin already configured.
    git remote get-url origin
    echo.
)

REM ── Stage all source files ───────────────────────────────
echo  [STEP 3] Staging files for commit...
git add .
echo  Done.
echo.

REM ── Commit ───────────────────────────────────────────────
echo  [STEP 4] Creating commit...
set /p COMMIT_MSG="  Enter commit message (or press Enter for default): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Deploy: AI Product Recommendation System

git commit -m "%COMMIT_MSG%"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  [INFO] Nothing new to commit, or commit failed.
    echo  Continuing to deployment...
)
echo.

REM ── Push source code to GitHub (main branch) ─────────────
echo  [STEP 5] Pushing source code to GitHub (main branch)...
git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    color 0E
    echo.
    echo  [WARN] Push failed. This may be because:
    echo    - You need to log into GitHub (run: git config --global credential.helper manager)
    echo    - The repo doesn't exist yet on GitHub
    echo    - Branch conflict (try: git push -u origin main --force)
    echo.
    echo  Continuing to build anyway...
    color 0B
)
echo.

REM ── Build + Deploy to GitHub Pages ───────────────────────
echo  [STEP 6] Building project and deploying to GitHub Pages...
echo  (This may take 30-60 seconds)
echo.
call npm run deploy

if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo  [ERROR] Deployment failed. Check the error above.
    pause
    exit /b 1
)

REM ── Done ─────────────────────────────────────────────────
color 0A
echo.
echo  =====================================================
echo    Deployment Successful!
echo  =====================================================
echo.
echo  Your site will be live in 1-2 minutes at:
echo  https://^<your-github-username^>.github.io/product-recommendation-system/
echo.
echo  IMPORTANT: First time only —
echo    1. Open your GitHub repo in browser
echo    2. Go to Settings ^> Pages
echo    3. Set Source to: Deploy from branch
echo    4. Set Branch to: gh-pages
echo    5. Click Save
echo.
echo  =====================================================
echo.
pause
