#!/bin/bash

export CUR_DATE=$(date +%Y-%m-%d-%H-%M)
echo "[catback FE] Deploy to new dir $CUR_DATE"

sudo tar -xf ~/.next.tgz -C /tmp
sudo mv /tmp/.next ~/tokenplay-dappverse-FE/$CUR_DATE
echo "[catback FE] -- Remove current folder"
sudo rm -rf ~/tokenplay-dappverse-FE/.next

echo "[catback FE] -- Point current to $CUR_DATE"
sudo ln -s ~/tokenplay-dappverse-FE/$CUR_DATE ~/tokenplay-dappverse-FE/.next

pm2 restart 8
echo "[catback FE] DONE."