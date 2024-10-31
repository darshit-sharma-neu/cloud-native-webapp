#!/bin/bash
# Download CloudWatch Agent
echo "Downloading CloudWatch Agent"
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
# Start CloudWatch Agent
echo "Starting CloudWatch Agent"
sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent