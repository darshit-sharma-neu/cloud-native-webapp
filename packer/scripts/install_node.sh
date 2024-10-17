#!/bin/bash

# Install Node
echo "Installing Node v20.17.0"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
echo "Node setup completed"

# install unzip
echo "Installing unzip"
sudo apt-get -y install unzip

# move zip to opt
sudo mv /tmp/webapp.zip /home/
sudo ls -la /home
sudo unzip /home/webapp.zip -d /home/
sudo ls -la /home
sudo chown -R csye6225:csye6225 /home/webapp

# Install dependencies
cd /home/webapp
echo "Installing dependencies"
sudo npm install
echo "Webapp setup completed"