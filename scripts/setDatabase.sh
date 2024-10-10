apt update
apt install mysql-server
systemctl start mysql.service

# Create new user
mysql -u root --skip-password -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"

# Grant privileges to the new user
mysql -u root --skip-password -e "GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost';"

# Apply the changes (reload privilege tables)
mysql -u root --skip-password -e "FLUSH PRIVILEGES;"