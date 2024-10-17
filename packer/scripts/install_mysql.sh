#!/bin/bash

# Install Mysql
echo "Installing mysql-server"
sudo apt-get update
sudo apt-get -y install mysql-server
sudo systemctl start mysql.service

# Create new user
echo "Creating db user"
# Create new user
# sudo mysql -u root --skip-password -e "
#     drop user '$DB_USER'@localhost;
#     flush privileges;
#     create user '$DB_USER'@'localhost' identified by '$DB_PASS';
# "
sudo mysql -u root --skip-password -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"

# Grant privileges to the new user
sudo mysql -u root --skip-password -e "GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost';"

# Apply the changes (reload privilege tables)
sudo mysql -u root --skip-password -e "FLUSH PRIVILEGES;"
echo "Database setup completed"

