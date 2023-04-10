#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploying application'
git push -f git@github.com:alebento/quasar-template.git master:gh-pages

cd -
