#!/bin/bash

echo 'Stopping express web server...'
sudo forever stopall

echo 'Copying env file...'
cp -f ./scripts/prod.env ./.env

echo 'Creating tls and symlinks for https...'
mkdir tls
ln -s /etc/letsencrypt/live/blissui.com/fullchain.pem ./tls/cert.pem
ln -s /etc/letsencrypt/live/blissui.com/privkey.pem ./tls/key.pem

echo 'Creating symlink for firebase...'
ln -s ~/.ssh/blissui-firebase.json ./blissui-firebase.json

echo 'Updating node deps...'
yarn install

echo 'Building Bliss...'
node_modules/.bin/jake -f jakefile.js build

echo 'Starting express web server...'
sudo forever start -a -p . -l ./logs/forever.log -o ./logs/bliss-out.log -e ./logs/bliss-err.log node_modules/.bin/jake -f jakefile.js server
