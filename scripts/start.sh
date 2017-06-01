#!/bin/bash

echo 'Stopping express web server...'
forever stopall

echo 'Updating node deps...'
yarn install

echo 'Building Bliss...'
node_module/.bin/jake build

echo 'Starting express web server...'
forever start -l forever.log -o bliss-out.log -e bliss-err.log node_modules/.bin/jake server
