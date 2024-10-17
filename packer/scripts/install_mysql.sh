#!/bin/bash

# Install Mysql
echo "Installing mysql-server"
sudo apt-get update
sudo apt-get -y install mysql-server
sudo systemctl start mysql.service

# Create new user
echo "Creating db user"
# Create new user
sudo mysql -u root --skip-password -e "
    drop user '$DB_USER'@localhost;
    flush privileges;
    create user '$DB_USER'@'localhost' identified by '$DB_PASS'
"

echo "Database setup completed"

