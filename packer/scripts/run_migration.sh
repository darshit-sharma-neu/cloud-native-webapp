#!/bin/bash

echo "Running migration"
sudo chown -R csye6225:csye6225 /home/webapp
/usr/bin/node /home/webapp/scripts/database/createDatabase.js