#!/bin/bash

#rsync -r git@45.79.203.183:work/build/. ./src/workspaces
rsync -r --exclude=node_modules git@45.79.203.183:work/build/5d06f306c22c07a5 ./src/workspaces
