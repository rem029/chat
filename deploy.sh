echo "***Creating nginx files if not existing"
sudo cp -n /var/www/chat.rem029.com/nginx/store /etc/nginx/sites-available/store
sudo cp -n /var/www/chat.rem029.com/nginx/api.store /etc/nginx/sites-available/api.store
sudo cp -n /var/www/chat.rem029.com/nginx/store-backend-upstream.conf /etc/nginx/conf.d/store-backend-upstream.conf

echo "***Linking nginx files"
cd /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.store
sudo ln -s /etc/nginx/sites-available/store
cd /var/www/chat.rem029.com/

echo "***Verify and restart nginx"
sudo nginx -t
nginx -s reload
systemctl restart nginx
sudo service nginx restart


echo "***Run certbot"
certbot --nginx -d chat.rem029.com --redirect --agree-tos --non-interactive
certbot --nginx -d api.chat.rem029.com --redirect --agree-tos --non-interactive

echo "***Update packages"
yarn run bootstrap

echo "***Update database"
yarn migrate-latest

# echo "***Start cron job"
# yarn cron-add-issue

echo "***Start server if not started"
yarn start:pm2:staging

echo "***Reloading PM2 Application"
pm2 reload store-app-staging
pm2 reload store-add-issue-every-12hr

echo "***PM2 Update"
pm2 update