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

