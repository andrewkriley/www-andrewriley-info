---
title: "homeaiops: Building a Production-Grade Homelab Platform"
description: An overview of the homeaiops project — its goals, architecture, three-domain structure, and where things stand today.
date: 2026-03-02T08:17:22+11:00
tags:
    - homelab
    - proxmox
    - ansible
    - gitops
categories:
    - technology
---

I've been building out a homelab for a while, but it's always had the same problem: things work until they don't, and there's no repeatable way to recover or explain what's running. I wanted to fix that properly — not just tidy things up, but treat the whole thing like a real platform.

The result is **homeaiops**: a GitOps-driven homelab that has two explicit goals.

1. **A learning platform.** Infrastructure, networking, config management, CI/CD, Kubernetes — all of it running on real hardware, managed the way you'd manage it in a production environment.
2. **A reliable foundation.** Family services (media, home automation) and personal development workloads that need actual uptime, not "it works when I remember to fix it."

The repo lives on [GitLab](https://gitlab.com/home_lab_ops/homeaiops) and everything — every VM, every config, every playbook — is version-controlled and deployed through pipelines.

## Structure: Three Domains

The repo is split into three top-level domains, each with its own scope and toolchain.

```
homeaiops/
├── hosting/      # Proxmox, VMs, LXCs, images, host config
├── applications/ # Services, containers, Home Assistant
└── network/      # VLANs, DNS, firewall rules
```

This separation matters. Terraform touches `hosting/`. Ansible touches `hosting/`. Docker Compose lives under `applications/`. Nothing bleeds between domains without a good reason.

## The Stack

| Layer | Tool |
|---|---|
| Hypervisor | Proxmox VE |
| VM provisioning | Terraform / OpenTofu |
| Base images | Packer |
| Config management | Ansible |
| Orchestration | K3s |
| Containers | Docker / Docker Compose |
| Home automation | Home Assistant |
| CI/CD | GitLab CI/CD |
| Scripting | Python |

## Hosting: The Compute Layer

The physical layer is a three-node Proxmox cluster. Every workload runs as a VM or LXC — nothing lives directly on the hypervisor.

### VM groups

Hosts follow a naming convention that describes their role and tier:

| Group | Hosts | Purpose |
|---|---|---|
| `prx-prod-x` | 3 nodes | Proxmox hypervisors |
| `pbs-prod-x` | 1 node | Proxmox Backup Server |
| `dkr-core-0x` | 3 nodes | Core services (DNS, internal tooling) |
| `dkr-prod-0x` | 3 nodes | Production Docker workloads |
| `dkr-dmz-0x` | — | DMZ workloads (Traefik reverse proxy) |
| `dkr-gpu-0x` | 1 node | GPU workloads |
| `k3s-prod-0x` | 3 nodes | K3s cluster (1 init + 2 masters) |

VMs are provisioned with Terraform using the Telmate Proxmox provider. Each workload group has its own Terraform workspace under `hosting/terraform/vm/`, with a `.env.example` template for credentials and a GitLab CI/CD pipeline for automated deploys.

Base images are built with Packer from an Ubuntu 24.04 server template. The template is minimal — just enough to cloud-init into a usable state.

### Ansible

Config management is handled with Ansible. The playbooks live under `hosting/ansible/playbooks/` and are applied against named inventory groups.

Current playbooks cover:
- User provisioning (`serveradmin` user with SSH key)
- NTP / timezone configuration (Australia/Sydney, `au.pool.ntp.org`)
- fail2ban (SSH, 5 retries, 1h ban)
- Disabling the systemd stub DNS listener (so Technitium can bind on port 53)
- Keepalived for Docker Swarm HA virtual IPs
- GitLab Runner deployment
- K3s cluster installation

Group vars are split cleanly: `group_vars/all/main.yml` for non-secret values, `group_vars/all/vault.yml` for anything sensitive (Ansible Vault encrypted). Group-specific overrides exist for `k3s-prod-0x` and `prx-prod-x`.

One issue I hit early: Ansible 2.16 changed how it loads `group_vars`. The old layout with a flat `group_vars/all.yml` file stopped working — it needs to be `group_vars/all/main.yml` inside a directory. Easy fix, but worth knowing if you're upgrading.

## Network

The network runs on a **UniFi Cloud Gateway Fiber (UCG-Fiber)** as the gateway, firewall, and controller. The site is named `54NR`.

### VLAN segmentation

| Network | VLAN | Purpose |
|---|---|---|
| INFRA | native | Management — switches, APs, controller |
| PROD | 10 | Production workloads (Proxmox, K3s, Home Assistant) |
| DMZ | 20 | Internet-facing services (Traefik) |
| HOME | 30 | Trusted personal devices |
| QUARANTINE | 99 | Isolated — manual IP only |
| TRUSTED-IOT | 200 | IoT with local network access |
| UNTRUSTED-CAMERA | 201 | Cameras — DNS/NTP only, no LAN access |
| UNTRUSTED-IOT | 202 | IoT — internet only, no LAN access |
| UNTRUSTED-GUEST | 203 | Guest WiFi — internet only |

All VMs and services live on PROD (VLAN 10). Internet-facing traffic enters through DMZ (VLAN 20) via Traefik. IoT and camera devices are fully segmented and can't reach the LAN.

### WiFi

Four SSIDs, each mapped to a specific network:

- **xGREEN** — WPA2/WPA3, primary trusted SSID, PROD
- **xBLUE** — WPA2/WPA3 with RADIUS/EAP enterprise auth, PROD
- **xRED** — WPA2 only (2.4GHz), IoT devices, UNTRUSTED-IOT
- **xORANGE** — WPA2/WPA3, additional trusted SSID

### VPN

WireGuard is the primary remote access method (replacing a legacy OpenVPN setup). There's also a permanent site-to-site tunnel to a remote site (32MS).

### Known issues

There are a few things I know about that aren't fixed yet:

- **Home Assistant bypasses Traefik** — currently port-forwarded directly on 8123. It needs to route through Traefik with a proper TLS cert.
- **Proxmox UI on a public port** — the web UI is reachable externally. That should go away once VPN access is reliable.
- **SSH port forward to a workstation** — same story. Convenience now, VPN later.
- **Gateway backups disabled** — need to enable scheduled backups on the UCG-Fiber before it becomes a single point of failure.

## Applications

### Home Assistant

Home Assistant runs as a dedicated VM on the PROD VLAN. One thing I've set up that I'm genuinely excited about: the native **MCP Server integration** in HA, which lets Claude Code connect directly to Home Assistant over the LAN.

The architecture is simple — Claude Code connects to the HA MCP endpoint via Streamable HTTP, with no intermediary. You expose entities to the Assist API and Claude can query and control them.

```
Claude Code CLI
     │
     │  HTTP (Streamable HTTP MCP)
     ▼
Home Assistant /api/mcp  (PROD VLAN)
```

I can now ask things like "what lights are on?" or "trigger the good morning automation" directly from a Claude Code session. It uses OAuth for auth so there's no plaintext token involved.

The main outstanding item here is moving HA behind Traefik so the MCP endpoint is HTTPS and the direct port forward can be removed.

### DNS

DNS is served by Technitium, running on the `dkr-core-0x` nodes. The internal search domain is `home.ozrileys.com`. The systemd stub listener has to be disabled on each VM (playbook 9) before Technitium can bind port 53.

## CI/CD

GitLab CI/CD is the deployment mechanism for everything. The pipeline includes:

- **SAST** and **Secret Detection** (GitLab-native, added at repo init)
- **Terraform** pipelines per workload — each VM group has a `terraform plan` / `terraform apply` pipeline with manual approval gates
- Secrets are stored as GitLab CI/CD variables (never in `.env` files in CI context)

## What's Next

The `todo.md` is short but real:

- Complete Ansible Vault setup and encrypt existing secrets
- Tidy and stress-test existing Ansible playbooks
- Add a Splunk instance for centralised logging
- Deploy the Splunk Universal Forwarder via Ansible to all managed hosts

The Vault work is blocking — a few playbooks reference `vault_*` variables that aren't encrypted yet. That's the immediate priority.

## Wrapping Up

The repo structure is in place, the VMs are provisioned, Ansible is managing config, CI/CD is running, and the network is properly segmented. It's not finished — a homelab never is — but it's at a point where changes are tracked, repeatable, and documented.

The goal was always for it to be something I could hand to a future-me (or anyone else) and have it make sense. So far, that's working.
