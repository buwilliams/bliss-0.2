# Setup Ubuntu Server

## Git User and Repo Setup

- `ssh root@ip_here`
- `adduser git`
- `usermod -aG sudo username`
- `ssh git@ip_here`
- `ssh-keygen -t rsa -C "bliss@blissui.com"`
- add ssh key to github
- `sudo vi /etc/sudoers` and `git ALL=(ALL) NOPASSWD: ALL` to the bottom
- `git clone --bare git@github.com:buwilliams/bliss-0.2.git` on server
- `scp ~/.ssh/id_rsa.pub git@ip_here:`
- `ssh git@ip_here`
- `cat ~/id_rsa.pub >> .ssh/authorized_keys`
- `rm ~/id_rsa.pub`
