sudo -u postgres createdb -U postgres -p 5433 -O postgres store-db
sudo -u postgres psql -U postgres -p 5433 store-db < ../sql/store-db.sql