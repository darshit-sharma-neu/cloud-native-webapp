#!/bin/bash

echo "List contents of webapp"
sudo ls -la /home/webapp

echo "Set Permissions for webapp"
sudo chown -R csye6225:csye6225 /home/webapp

echo "List contents of webapp"
sudo ls -la /home/webapp

echo "Systemd setup"
sudo cp /home/webapp/webapp.service /etc/systemd/system/
sudo chown csye6225:csye6225 /etc/systemd/system/webapp.service

echo "Starting webapp service"
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
sudo systemctl start webapp.service