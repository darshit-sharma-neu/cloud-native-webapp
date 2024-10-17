#!/bin/bash

echo "Running migration"
chown -R csye6225:csye6225 /home/webapp
sudo /usr/bin/node /home/webapp/scripts/database/createDatabase.js