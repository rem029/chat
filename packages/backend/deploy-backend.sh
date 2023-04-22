echo "***Creating nginx files if not existing"
sudo cp -n ./nginx/api.chat /etc/nginx/sites-available/api.chat
sudo cp -n ./nginx/chat-backend-upstream.conf /etc/nginx/conf.d/chat-backend-upstream.conf

echo "***Linking nginx files"
cd /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.chat

echo "***Verify and restart nginx"
sudo nginx -t
nginx -s reload
systemctl restart nginx
sudo service nginx restart


echo "***Run certbot"
certbot --nginx -d api.chat.rem029.com --redirect --agree-tos --non-interactive

cd /var/www/chat.rem029.com/packages/backend/dist

# echo "***Update database"
# yarn migrate-latest

echo "***Start server if not started"
yarn build:run:pm2:staging

echo "***Reloading PM2 Application"
pm2 reload chat-app-staging

echo "***PM2 Update"
pm2 update