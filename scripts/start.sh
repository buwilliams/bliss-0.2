#!/bin/bash

echo 'Stopping express web server...'
sudo systemctl stop bliss

echo 'Copying env file...'
cp -f ./scripts/prod.env ./.env

echo 'Creating tls and symlinks for https...'
sudo mkdir -p tls
sudo ln -sfT /etc/letsencrypt/live/blissui.com/fullchain.pem ./tls/cert.pem
sudo ln -sfT /etc/letsencrypt/live/blissui.com/privkey.pem ./tls/key.pem

echo 'Creating symlink for firebase...'
sudo ln -sfT ~/.ssh/blissui-firebase.json ./blissui-firebase.json

echo 'Updating node deps...'
sudo yarn install

echo 'Building Bliss...'
sudo node_modules/.bin/jake -f jakefile.js build

echo 'Starting express web server...'
sudo systemctl start bliss
