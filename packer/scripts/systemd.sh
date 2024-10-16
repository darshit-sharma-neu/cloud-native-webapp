#!/bin/bash

echo "List contents of webapp"
sudo ls -la /opt/webapp

echo "Set Permissions for webapp"
sudo chown -R ubuntu:ubuntu /opt/webapp

echo "List contents of webapp"
sudo ls -la /opt/webapp

echo "Systemd setup"
sudo cp /opt/webapp/webapp.service /etc/systemd/system/
sudo chown ubuntu:ubuntu /etc/systemd/system/webapp.service

echo "Starting webapp service"
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
sudo systemctl start webapp.service