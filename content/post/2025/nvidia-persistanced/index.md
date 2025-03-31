---
title: NVIDIA drivers don't load after a reboot (LXC)
description: Enabling Nvidia persistence mode keeps the NVIDIA character device files open.
date: 2025-04-01T00:18:53+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - nvidia
    - gpu
categories:
    - technology
---

## NVIDIA persistanced

Source: https://gist.github.com/ngoc-minh-do/fcf0a01564ece8be3990d774386b5d0c#enable-persistence-mode

Enable persistence mode
Nvidia device nodes (/dev/nvidia*) are not loaded at boot. Additionally, when they are no longer in use, the NVIDIA kernel driver deactivates the device state.

Enabling Nvidia persistence mode keeps the NVIDIA character device files open, preventing the kernel driver from deactivating the device state when no other process is using the device.

Create /etc/systemd/system/nvidia-persistenced.service

```bash
sudo nano /etc/systemd/system/nvidia-persistenced.service
```

```
[Unit]
Description=NVIDIA Persistence Daemon

[Service]
Type=forking
ExecStart=/usr/bin/nvidia-persistenced --verbose
ExecStartPost=/usr/bin/nvidia-smi
ExecStopPost=/bin/rm -rf /var/run/nvidia-persistenced

[Install]
WantedBy=multi-user.target
```
Activate

```bash
systemctl enable --now nvidia-persistenced
```
Confirm
```bash
systemctl status nvidia-persistenced
ls -lah /dev/nvidia*
```
