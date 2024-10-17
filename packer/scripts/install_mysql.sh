#!/bin/bash

# Install Mysql
echo "Installing mysql-server"
sudo apt-get update
sudo apt-get -y install mysql-server
sudo systemctl start mysql.service

# Create new user
echo "Creating db user"
# Create new user
mysql -u root --skip-password -e "
    CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
    GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost';
    FLUSH PRIVILEGES;
"

echo "Database setup completed"

