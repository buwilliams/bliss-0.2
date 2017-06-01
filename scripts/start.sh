#!/bin/bash

echo 'Stopping express web server...'
sudo forever stopall

echo 'Copying env file...'
cp -f ./scripts/prod.env ./.env

echo 'Updating node deps...'
yarn install

echo 'Building Bliss...'
node_modules/.bin/jake -f jakefile.js build

echo 'Starting express web server...'
sudo forever start -a -p . -l ./logs/forever.log -o ./logs/bliss-out.log -e ./logs/bliss-err.log node_modules/.bin/jake -f jakefile.js server
