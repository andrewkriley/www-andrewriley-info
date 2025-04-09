---
title: Spread your AI Model load over multiple GPU's    
description: Enabling Ollama to use the GPU and VRAM power of multiple GPU's
date: 2025-04-09T00:18:53+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - nvidia
    - gpu
categories:
    - technology
---

## TLDR; your using Ollama in Docker and want to spread your model load over multiple GPU's

Pop the following into your ```docker-compose``` file.

```yaml
        environment:
            - OLLAMA_KEEP_ALIVE=30
            - OLLAMA_SCHED_SPREAD=1  ## add to spread model load over multiple GPUs
```

Full config example. 


```yaml
name: ollama
services:
    ollama:
        environment:
            - OLLAMA_KEEP_ALIVE=30
            - OLLAMA_SCHED_SPREAD=1
        deploy:
            resources:
                reservations:
                    devices:
                        - driver: nvidia
                          count: all
                          capabilities:
                              - gpu
        volumes:
            - ollama:/root/.ollama
        ports:
            - 11434:11434
        container_name: ollama
        image: ollama/ollama
        restart: always
volumes:
    ollama:
        external: true
        name: ollama
```