#!/bin/bash

# Installing nvm
echo "Installing NVM"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node
echo "Installing Node v20.17.0"
nvm install v20.17.0

# Install Mysql
echo "Installing v20.17.0"
apt update
apt install mysql-server
systemctl start mysql.service

# Create new user
mysql -u root --skip-password -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"

# Grant privileges to the new user
mysql -u root --skip-password -e "GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost';"

# Apply the changes (reload privilege tables)
mysql -u root --skip-password -e "FLUSH PRIVILEGES;"