@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

echo [1/4] 正在检查并构建 Astro Pure 博客...
call npm run build || goto :error

echo [2/4] 正在暂存更改...
git add -A || goto :error

set "msg=%~1"
if "%msg%"=="" set "msg=update: blog content"

echo [3/4] 正在创建提交...
git diff --cached --quiet || git commit -m "%msg%" || goto :error

echo [4/4] 正在推送当前分支...
git push || goto :error
echo 完成。
exit /b 0

:error
echo 操作失败，请查看上方信息。
exit /b 1
