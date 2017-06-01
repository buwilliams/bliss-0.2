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

# TODO: copy ssh key too remote server
echo Setting up SSH...
ssh-copy-id -i ~/.ssh/id_rsa $USER@$IP

# setup git server

echo 'Enter new password for new Git user.'
echo -n Password:
read -s password
echo

echo 'Creating Git user...'
ssh $USER@$IP <<EOF
  adduser --gecos "" --quiet --disabled-password --shell /bin/bash git
EOF

ssh $USER@$IP "echo git:$password | chpasswd"

ssh $USER@$IP <<EOF
  usermod -aG sudo git
  echo "git ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/git
EOF

ssh-copy-id -i ~/.ssh/id_rsa git@$IP

# install server dependencies (git, node, npm, yarn)
echo 'Installing build-essential and git...'
ssh -t git@$IP <<EOF
  sudo apt-get udpate
  sudo apt-get install -y build-essential git
EOF

echo 'Installing nodejs...'
ssh -t git@$IP <<EOF
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
EOF

echo 'Installing yarn, jake, and forever...'
ssh -t git@$IP <<EOF
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt-get update
  sudo apt-get install yarn
  sudo yarn global add jake
  sudo yarn global add forever
EOF

# setup git server
echo 'Setting up Git server...'
ssh -t git@$IP <<EOF
  mkdir bliss-0.2.git
  cd bliss-0.2.git
  git init --bare
EOF

echo 'Copying post-receive hook for git...'
scp ./scripts/post-receive git@$IP:bliss-0.2.git/hooks
ssh -t git@$IP "sudo chmod +x bliss-0.2.git/hooks/post-receive"

echo 'Adding local git origin...'
git remote add $NAME git@$IP:bliss-0.2.git
git push $NAME master
