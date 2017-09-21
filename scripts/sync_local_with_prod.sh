#!/bin/bash

rsync -r --exclude=node_modules --exclude=_deployed git@45.79.203.183:work/build/* ./src/workspaces
