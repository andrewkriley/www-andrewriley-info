---
title: NVIDIA GPU access inside a Proxmox LXC
description: Getting your NVIDIA GPU working in Proxmox and shared within an LXC.
date: 2025-03-25T00:18:50+11:00
image: 
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - nvidia
    - proxmox
    - gpu
categories:
    - technology
---

## TLDR; 
So you want to get your NVIDIA GPU working inside a LXC container on your proxmox host. I followed this guide from Digital Space port https://www.youtube.com/watch?v=lNGNRIJ708k ; https://digitalspaceport.com/proxmox-lxc-gpu-passthru-setup-guide/ 
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
- *optional* you might need to use the "nvidia-persistenced" platform.  https://gist.github.com/ngoc-minh-do/fcf0a01564ece8be3990d774386b5d0c#enable-persistence-mode




##