
#! /bin/bash

npm run build

git add .
git commit -m '..'
git push


ssh -T hyderion@hyderion.com <<-END

cd software/mm/ui

git pull
npm run build
cp -r build /home/hyderion/nginx-docker/react-build/nb-admi-panel
docker exec nginx-c nginx -s reload

# sudo systemctl restart nginx.service

exit

END

echo "All done"




