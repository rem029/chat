#NGINX SETUP

## 1. Copy files

`store` and `api.store` files goes to
```
/etc/nginx/sites-available/
```

`store-backend-upstream.conf` file goes to
```
/etc/nginx/conf.d
```

## 2. Create link to sites-enabled

```
cd /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/store
sudo ln -s /etc/nginx/sites-available/api.store
ls -l
```

## 3. Test

```
sudo nginx -t
```

No errors or warnings? Proceed to step 3. If yes, fix it please.

## 4. Reload Nginx
```
nginx -s reload
systemctl restart nginx
```

## 5. Redirect Hostname to server.

## 6. Run Certbot on server

```
certbot --nginx -d chat.rem029.com --redirect --agree-tos --non-interactive
certbot --nginx -d api.chat.rem029.com --redirect --agree-tos --non-interactive
```


## References
https://dev.to/zeeshanhshaheen/how-to-deploy-react-js-and-nodejs-app-on-a-single-digitalocean-droplet-using-nginx-1pcl