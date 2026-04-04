---
title: Coral USB "Key is stored in legacy trusted.gpg keyring"
description: Fix your trusted keyring for the Coral USB device
date: 2025-04-04T13:18:50.000Z
tags:
  - coral
  - google
categories:
  - technology
---

## Key is stored in legacy trusted.gpg keyring

If you get this keyring error when running ```apt update```


***W: https://packages.cloud.google.com/apt/dists/coral-edgetpu-stable/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.***

Then try this to resolve.

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
