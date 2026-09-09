#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
npm run build
cd dist
git init
git add -A
git commit -m "deploy: update static site"
git push -f https://github.com/Dendrobium123/Dendrobium123.github.io.git HEAD:master
