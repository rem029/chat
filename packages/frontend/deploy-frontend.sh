# echo "***Creating nginx files if not existing"
# sudo cp -n ./nginx/chat /etc/nginx/sites-available/chat

# echo "***Linking nginx files"
# cd /etc/nginx/sites-enabled/
# sudo ln -s /etc/nginx/sites-available/chat

# echo "***Verify and restart nginx"
# sudo nginx -t
# nginx -s reload
# systemctl restart nginx
# sudo service nginx restart


# echo "***Run certbot"
# certbot --nginx -d chat.rem029.com --redirect --agree-tos --non-interactive