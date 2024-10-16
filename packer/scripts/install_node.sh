#!/bin/bash

# Installing nvm
echo "Installing NVM"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node
echo "Installing Node v20.17.0"
nvm install v20.17.0

echo "Node setup completed"

# install unzip
echo "Installing unzip"
sudo apt-get -y install unzip

# move zip to opt
sudo unzip /home/ubuntu/webapp.zip -d /home/ubuntu/
sudo mv /home/ubuntu/webapp /opt/
sudo chown -R ubuntu:ubuntu /opt/webapp

cd /opt/webapp
echo "Installing dependencies"
npm install
echo "Webapp setup completed"