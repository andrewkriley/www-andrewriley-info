---
title: Creating a loadbalancer in Traefik
description: Loadbalancing across three servers with a weight and sticky sessions
date: 2025-04-01T00:19:52+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - traefik
categories:
    - technology
---

```yaml
http:
  routers:
    pve-rtr:
      rule: "Host(`pve.{{env "DOMAINNAME_1"}}`)" 
      entryPoints:
        - websecure-external
        - websecure-internal
      middlewares:
        - chain-oauth
      service: pve-svc
      tls:
        certResolver: dns-cloudflare
        options: tls-opts@file
  services:
    pve-svc:
      loadBalancer:
        passHostHeader: true
        serversTransport: "pve-st"
        servers:
          - url: "https://10.54.7.11:8006" # https://IP-ADDRESS:PORT
            weight: 100
          - url: "https://10.54.7.12:8006" # Add another backend server
            weight: 10
          - url: "https://10.54.7.13:8006" # Add another backend server
            weight: 5
        healthCheck:
          path: "/" # or a specific health check path like /health
          interval: "15s"
          timeout: "3s"
        sticky:
          cookie: "PVE_SESSION" # Replace with your desired cookie name
  serversTransports:
    pve-st:
      insecureSkipVerify: true
```