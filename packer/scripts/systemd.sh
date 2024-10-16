#!/bin/bash

echo "List contents of webapp"
sudo ls -la /opt/webapp

echo "Set Permissions for webapp"
sudo chown -R csye6225:csye6225 /opt/webapp

echo "List contents of webapp"
sudo ls -la /opt/webapp

echo "Systemd setup"
sudo cp /opt/webapp/webapp.service /etc/systemd/system/
sudo chown csye6225:csye6225 /etc/systemd/system/webapp.service

echo "Starting webapp service"
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
sudo systemctl start webapp.service