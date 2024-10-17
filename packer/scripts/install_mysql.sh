#!/bin/bash

# Install Mysql
echo "Installing mysql-server"
sudo apt-get update
sudo apt-get -y install mysql-server
sudo systemctl start mysql.service

# Create new user
echo "Creating db user"
# Create new user
mysql -uroot -proot -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"

# Grant privileges to the new user
mysql -uroot -proot -e "GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost';"

# Apply the changes (reload privilege tables)
mysql -uroot -proot -e "FLUSH PRIVILEGES;"

echo "Database setup completed"

