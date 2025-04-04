---
title: Coral USB "Key is stored in legacy trusted.gpg keyring"
description: Fix your trusted keyring for the Coral USB device
date: 2025-04-05T00:18:50+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - coral
    - google
categories:
    - technology
---

## Key is stored in legacy trusted.gpg keyring

If you get this keyring error see below for a fix

```
root@pve01:/etc/apt/sources.list.d# apt update
Hit:1 http://deb.debian.org/debian bookworm InRelease
Hit:2 http://security.debian.org/debian-security bookworm-security InRelease
Hit:3 http://deb.debian.org/debian bookworm-updates InRelease                                          
Hit:4 http://download.proxmox.com/debian/pve bookworm InRelease                                        
Hit:5 https://packages.cloud.google.com/apt coral-edgetpu-stable InRelease  
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
40 packages can be upgraded. Run 'apt list --upgradable' to see them.
W: https://packages.cloud.google.com/apt/dists/coral-edgetpu-stable/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
```

## root user (e.g on Proxmox)
```bash
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /etc/apt/keyrings/coral.gpg

chmod a+r /etc/apt/keyrings/coral.gpg

echo "deb [signed-by=/etc/apt/keyrings/coral.gpg] https://packages.cloud.google.com/apt coral-edgetpu-stable main" | tee /etc/apt/sources.list.d/coral-edgetpu.list > /dev/null
```

## non-root user

```bash
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/coral.gpg

sudo chmod a+r /etc/apt/keyrings/coral.gpg

echo "deb [signed-by=/etc/apt/keyrings/coral.gpg] https://packages.cloud.google.com/apt coral-edgetpu-stable main" | sudo tee /etc/apt/sources.list.d/coral-edgetpu.list > /dev/null
```