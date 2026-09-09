@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
call npm run build || exit /b 1
cd dist
git init
git add -A
git commit -m "deploy: update static site"
git push -f https://github.com/Dendrobium123/Dendrobium123.github.io.git HEAD:master
cd ..
echo GitHub Pages 部署完成。
