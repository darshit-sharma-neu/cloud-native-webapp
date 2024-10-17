#!/bin/bash

# Install Mysql
echo "Installing mysql-server"
sudo apt-get update
sudo apt-get -y install mysql-server
sudo systemctl start mysql.service

# Create new user
echo "Creating db user"
sudo mysql -u root --skip-password -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_PASSWORD';GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost';FLUSH PRIVILEGES;CREATE DATABASE IF NOT EXISTS $DB_NAME;"
# sudo mysql -u root -p$DB_PASSWORD -e "FLUSH PRIVILEGES;"
# # Grant privileges to the new user
# sudo mysql -u root --skip-password -e "GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost';"

# # Apply the changes (reload privilege tables)
# sudo mysql -u root --skip-password -e "FLUSH PRIVILEGES;"

echo "Database setup completed"