---
title: GPU's and NFS on Proxmox
description: My summary of the options for using NFS and a GPU on Proxmox
date: 2025-04-01T00:18:52+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - proxmox
    - nfs
    - gpu
categories:
    - technology
---

## Proxmox LXC
- Can't mount NFS inside an unpriviledged containers natively and make available to docker.
- Can mount NFS inside an unpriviledged LXC using a proxmox bind mount and make available to docker. 
- Can mount NFS inside an priviledged LXC using 'mount', requires some apparmor tweaking. (lower security)
- Can share GPU resources from proxmox host to LXC containers using cgroup2 permissions

## Proxmox VM
- Can mount NFS inside a VM and make available to docker
- Limitations on sharing GPU into a VM
    - considerations for PCIe passthrough (IOUMM)
	- can share 1 GPU to multiple VM's (??) / can't share 1 GPU to multiple VM's (??)
  	- could explore serial based display for proxmox and leave GPU available to the VM. PCIe passthrough
	- does this work if there is a single GPU for sharing + for the proxmox host or do you need min 2 GPU's (host + sharing) (??)
- vGPU's that enable sharing to multiple VMs (PICe) need a proxmox and nvidia subscription.

## Baremetal
- Run your Linux OS (desktop mode for easy use for virt-manager)
- Docker has access to the GPU
- Docker can mount NFS shares
- Use virt-manager or similar to manager KVM/QEMU/Libvirtd
- Best of both worlds 
- No web GUI, consider https://www.linux-kvm.org/page/Management_Tools
