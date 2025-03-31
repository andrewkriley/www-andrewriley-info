---
title: NVIDIA GPU access inside a Proxmox LXC
description: Getting your NVIDIA GPU working in Proxmox and shared within an LXC.
date: 2025-04-01T00:18:51+11:00
image: nvidia.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - nvidia
    - proxmox
    - gpu
categories:
    - technology
---

## TLDR; 
So you want to get your NVIDIA GPU working inside a LXC container on your proxmox host. <br>
I followed these guides from Digital Space port;<br>
https://www.youtube.com/watch?v=lNGNRIJ708k<br>
https://digitalspaceport.com/proxmox-lxc-gpu-passthru-setup-guide/ 

- install some foundational packages
- install NVIDIA drivers on the Proxmox host
- review the cgroup2 ID's for the GPU
- create the LXC container and update the <lxcid>.conf file in /etc/pve/lxc
- copy the NVIDIA driver to the container and install (with --no-kernel-modules)
- test you can run "nvtop" of "nvidia-smi" from the LXC container
- install the NVIDIA container toolkit
- enable no-cgroups in NVIDIA container toolkit 
- install Docker
- configure the NVIDIA-ctk runtime for Docker
- Reboot and check everything works. 
- *optional* you might need to use the "nvidia-persistenced" platform.  <br>https://gist.github.com/ngoc-minh-do/fcf0a01564ece8be3990d774386b5d0c#enable-persistence-mode


Here's my steps from the above TLDR

## Base Proxmox build prep

1) Follow guide here https://digitalspaceport.com/proxmox-lxc-gpu-passthru-setup-guide/

2) Get NVIDIA drivers https://www.nvidia.com/en-us/drivers

3) Install driver
```bash
wget https://us.download.nvidia.com/XFree86/Linux-x86_64/570.133.07/NVIDIA-Linux-x86_
64-570.133.07.run
```
4) Check 

```bash
ls -al /dev/nvidia*
```

```bash
root@pve01:~# ls -al /dev/nvidia*
crw-rw-rw- 1 root root 195,   0 Mar 24 05:38 /dev/nvidia0
crw-rw-rw- 1 root root 195, 255 Mar 24 05:38 /dev/nvidiactl
crw-rw-rw- 1 root root 508,   0 Mar 24 05:38 /dev/nvidia-uvm
crw-rw-rw- 1 root root 508,   1 Mar 24 05:38 /dev/nvidia-uvm-tools

/dev/nvidia-caps:
total 0
drwxr-xr-x  2 root root     80 Mar 24 05:38 .
drwxr-xr-x 21 root root   4700 Mar 24 05:38 ..
cr--------  1 root root 511, 1 Mar 24 05:38 nvidia-cap1
cr--r--r--  1 root root 511, 2 Mar 24 05:38 nvidia-cap2
root@pve01:~# 
```

> ***UNFINISHED BELOW***<br>

4) Configure a container

Start a container 

Terraform

Append to LXC.conf file
lxc.cgroup2.devices.allow: c 195:* rwm
lxc.cgroup2.devices.allow: c 234:* rwm
lxc.cgroup2.devices.allow: c 509:* rwm
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-modeset dev/nvidia-modeset none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-caps/nvidia-cap1 dev/nvidia-caps/nvidia-cap1 none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-caps/nvidia-cap2 dev/nvidia-caps/nvidia-cap2 none bind,optional,create=file


pct push 105 NVIDIA-Linux-x86_64-550.107.02.run /root/NVIDIA-Linux-x86_64-550.107.02.run

Within container 

./NVIDIA-Linux-x86_64-550.107.02.run --no-kernel-modules



apt install gpg curl
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
apt update
apt install nvidia-container-toolkit



nano /etc/nvidia-container-runtime/config.toml
#no-cgroups = false
to
no-cgroups = true





apt install ca-certificates
apt update
apt install ca-certificates
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/trusted.gpg.d/docker.gpg
chmod a+r /etc/apt/trusted.gpg.d/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/trusted.gpg.d/docker.gpg] https://download.docker.com/linux/debian bookworm stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin



nvidia-ctk runtime configure --runtime=docker

