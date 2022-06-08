#!/bin/bash

export CUR_DATE=$(date +%Y-%m-%d-%H-%M)
echo "[tokenplay FE] Deploy to new dir $CUR_DATE"

sudo tar -xf ~/.next.tgz -C /tmp
sudo mv /tmp/.next ~/tokenplay-dappverse-FE/$CUR_DATE
cd ~/tokenplay-dappverse-FE/
git pull origin dev
yarn install
echo "[tokenplay FE] -- Remove current folder"
sudo rm -rf ~/tokenplay-dappverse-FE/.next

echo "[tokenplay FE] -- Point current to $CUR_DATE"
sudo ln -s ~/tokenplay-dappverse-FE/$CUR_DATE ~/tokenplay-dappverse-FE/.next

sudo pm2 restart 8
echo "[tokenplay FE] DONE."