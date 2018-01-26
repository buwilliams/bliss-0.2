# Setup Ubuntu Server

## Git User and Repo Setup

- `ssh root@ip_here`
- `adduser git`
- `usermod -aG sudo username`
- `ssh git@ip_here`
- `ssh-keygen -t rsa -C "bliss@blissui.com"`
- add ssh key to github
- `git clone --bare git@github.com:buwilliams/bliss-0.2.git` on server
- on local machine, add remote `prod` pointing to server
