---
title: Scripts to help do things on Proxmox
description: Make managing your Homelab a breeze
date: 2025-04-01T00:18:54+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - proxmox
categories:
    - technology
---

## Make managing your Homelab a breeze

We are a community-driven initiative that simplifies the setup of Proxmox Virtual Environment (VE).

With 300+ scripts to help you manage your Proxmox VE environment. Whether you're a seasoned user or a newcomer, we've got you covered

https://community-scripts.github.io/ProxmoxVE/

## Post install scripts
Helper scripts<br>
https://community-scripts.github.io/ProxmoxVE/scripts?id=all-templates

```bash
bash -c "$(wget -qLO - https://github.com/community-scripts/ProxmoxVE/raw/main/misc/post-pve-install.sh)"
bash -c "$(wget -qLO - https://github.com/community-scripts/ProxmoxVE/raw/main/misc/kernel-clean.sh)"
```