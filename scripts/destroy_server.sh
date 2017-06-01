#!/usr/bin/env bash

programname=$0

function usage {
cat <<HELP_USAGE
usage: $programname [server_name] [user] [ip_address]
  server_name  give the server a name to reference it by
  user         the user which has access to this server
  id_address   location of our server

HELP_USAGE
}

if [ $# -lt 3 ]; then
  usage
  exit 1
fi

NAME=$1
USER=$2
IP=$3

echo 'Removing Git user...'
ssh $USER@$IP <<EOF
  cd /home/git/work && forever stopall
  rm /etc/sudoers.d/git
  rm -rf /home/git
  deluser git
EOF
