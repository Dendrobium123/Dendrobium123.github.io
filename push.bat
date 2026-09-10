@echo off
setlocal EnableExtensions
cd /d "%~dp0" || goto :error

set "REMOTE_URL=https://github.com/Dendrobium123/Dendrobium123.github.io.git"
set "GIT_NAME=dendrobiumdcgk"
set "GIT_EMAIL=1025877249@qq.com"
set "ASTRO_TELEMETRY_DISABLED=1"
set "COMMIT_MSG=%~1"
if not defined COMMIT_MSG set "COMMIT_MSG=update: blog"

for /f "delims=" %%i in ('git branch --show-current') do set "CURRENT_BRANCH=%%i"
if /i not "%CURRENT_BRANCH%"=="main" (
  echo ERROR: Current branch must be main. Current: %CURRENT_BRANCH%
  goto :error
)

echo [1/6] Building Astro site...
call npm run build || goto :error
if not exist "dist\index.html" (
  echo ERROR: dist\index.html was not generated.
  goto :error
)

if /i "%PUSH_DRY_RUN%"=="1" (
  echo DRY RUN: Build completed. Git commit and push were skipped.
  exit /b 0
)

echo [2/6] Committing source files to main...
git add -A || goto :error
git diff --cached --quiet
if errorlevel 1 (
  git -c user.name="%GIT_NAME%" -c user.email="%GIT_EMAIL%" commit -m "%COMMIT_MSG%" || goto :error
) else (
  echo No source changes to commit.
)

echo [3/6] Pushing source files to origin/main...
git push -u origin HEAD:main || goto :error

echo [4/6] Preparing generated site...
pushd dist || goto :error
git init || goto :dist_error
git add -A || goto :dist_error

echo [5/6] Creating deployment commit...
git diff --cached --quiet
if errorlevel 1 (
  git -c user.name="%GIT_NAME%" -c user.email="%GIT_EMAIL%" commit -m "deploy: update static site" || goto :dist_error
) else (
  echo No generated changes to commit.
)

git rev-parse --verify HEAD >nul 2>&1 || goto :dist_error

echo [6/6] Publishing generated site to origin/master...
git push -f "%REMOTE_URL%" HEAD:master || goto :dist_error
popd

echo.
echo SUCCESS: Source pushed to main and site published to master.
pause
exit /b 0

:dist_error
popd

:error
echo.
echo FAILED: Check the first ERROR or fatal message above.
pause
exit /b 1
