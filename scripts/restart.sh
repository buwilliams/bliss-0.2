#!/bin/bash

echo 'Stopping express web server...'
#sudo forever stopall
sudo systemctl stop bliss

echo 'Starting express web server...'
#sudo forever start -a -p . -l ./logs/forever.log -o ./logs/bliss-out.log -e ./logs/bliss-err.log node_modules/.bin/jake -f jakefile.js server
sudo systemctl start bliss
