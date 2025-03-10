---
title: Hugo Dockerfile
description: A Dockerfile to create a container image for the Hugo web framework
date: 2025-03-10T13:18:50+11:00
image: hugo-docker.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - hugo
    - docker
categories:
    - technology
---

A basic version of a Hugo docker container

```dockerfile
FROM ubuntu:latest

# Update the package list and install necessary dependencies
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Define Hugo version (you can change this)   
ARG HUGO_VERSION=0.145.0

# Download and install Hugo
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-amd64.deb \
    && dpkg -i hugo_extended_${HUGO_VERSION}_Linux-amd64.deb \
    && rm hugo_extended_${HUGO_VERSION}_Linux-amd64.deb

# Verify Hugo installation
RUN hugo version

# Set the working directory (optional)
WORKDIR /app/

# Expose the Hugo port (optional)
EXPOSE 1313

# Define the default command (optional)
CMD ["hugo", "server", "-D", "-b", "http://0.0.0.0/", "--bind=0.0.0.0", "--port=1313"]

# Or a simple bash shell
#CMD ["/bin/bash"]
```

Can be used with ```docker-compose```

```docker-compose
services:
    my-hugo-server:
        ports:
            - 1313:1313
        volumes:
            - ./my-new-site:/app
        image: my-hugo-server:latest
```

Also a good reference<br>

https://github.com/panubo/docker-hugo
