
#! /bin/bash


git add .
git commit -m '..'
git push

npm run build
cp build /Users/ibrahim/Documents/Software/Helpers/nginx-docker/react-build/nb-admin-panel/