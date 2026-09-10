@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"

echo [1/4] 正在构建 Astro 网站...
call npm run build || goto :error
if not exist "dist\index.html" (
  echo 错误：构建后没有找到 dist\index.html。
  goto :error
)

for /f "delims=" %%i in ('git log -1 --format^=%%an') do set "DEPLOY_NAME=%%i"
for /f "delims=" %%i in ('git log -1 --format^=%%ae') do set "DEPLOY_EMAIL=%%i"
if not defined DEPLOY_NAME set "DEPLOY_NAME=Dendrobium123"
if not defined DEPLOY_EMAIL set "DEPLOY_EMAIL=1025877249@qq.com"

echo [2/4] 正在准备 master 发布分支...
pushd dist || goto :error
git init || goto :dist_error
git add -A || goto :dist_error

echo [3/4] 正在创建静态网站提交...
git -c user.name="%DEPLOY_NAME%" -c user.email="%DEPLOY_EMAIL%" commit -m "deploy: update static site" || goto :dist_error

echo [4/4] 正在推送到 GitHub master 分支...
git push -f https://github.com/Dendrobium123/Dendrobium123.github.io.git HEAD:master || goto :dist_error
popd
echo GitHub Pages 部署完成。
exit /b 0

:dist_error
popd

:error
echo 部署失败，请查看上方第一条 error 或 fatal 信息。
exit /b 1
