#!/bin/bash

echo 'Stopping express web server...'
sudo systemctl stop bliss

echo 'Updating systemctl'
#echo Located at /etc/systemd/system/bliss.service
sudo systemctl daemon-reload

echo 'Copying env file...'
cp -f ./scripts/prod.env ./.env

echo 'Creating tls and symlinks for https...'
mkdir -p tls
ln -sfT /etc/letsencrypt/live/blissui.com/fullchain.pem ./tls/cert.pem
ln -sfT /etc/letsencrypt/live/blissui.com/privkey.pem ./tls/key.pem

echo 'Creating symlink for firebase...'
ln -sfT ~/.ssh/blissui-firebase.json ./blissui-firebase.json

echo 'Updating node deps...'
yarn install

echo 'Building Bliss...'
sudo chown -R git:git ./build
node_modules/.bin/jake -f jakefile.js build

echo 'Starting express web server...'
sudo systemctl start bliss
