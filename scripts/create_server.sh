#!/usr/bin/env bash

echo "BlissUI deployment script, built for Ubuntu 17.10"

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
echo 'Installing system deps...'
ssh -t git@$IP <<EOF
  sudo apt-get udpate
  sudo apt-get install -y build-essential git certbot ufw nodejs npm
  sudo npm install -g yarn
  sudo ufw allow ssh
  sudo ufw allow http/tcp
  sudo ufw allow https/tcp
  echo y | sudo ufw enable
EOF

echo 'Installing letsencrypt creds...'
ssh -t git@$IP <<EOF
  sudo chown -R git:git /etc/letsencrypt
  yarn global add http-server
  sudo $(yarn global bin)/http-server -p 80 /home/git/work/scripts/certbot > /dev/null 2>&1 & echo $! > /home/git/work/scripts/certbot/run.pid
  sudo certbot certonly --webroot -w /home/git/work/scripts/certbot -d blissui.com -d www.blissui.com
  sudo pkill -P $(cat /home/git/work/scripts/certbot/run.pid)
  sudo rm /home/git/work/scripts/certbot/run.pid
EOF

echo 'Installing Firebase creds...'
scp ~/.ssh/blissui-firebase.json git@$IP:.ssh/

# Setup git server
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

echo 'Setting up remote service...'
ssh -t git@$IP <<EOF
  sudo ln -s /home/git/work/scripts/bliss.service /etc/systemd/system/bliss.service
  sudo systemctl daemon-reload
  sudo systemctl enable bliss.service
  sudo systemctl start bliss.service
EOF
