#!/bin/bash

rsync -r --exclude=node_modules git@45.79.203.183:work/build/* ./src/workspaces
