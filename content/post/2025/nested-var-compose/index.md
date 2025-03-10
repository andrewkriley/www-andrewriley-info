---
title: Nested Environment Variables with Docker Compose Files
description: Provides a way to set nested environment variables at a global and local scope. It will expose variables to both the container and the docker-compose file.
date: 2025-03-10T01:33:50+11:00
image: nested.png
tags: 
    - docker
categories:
    - technology
---

https://github.com/andrewkriley/nested-var-compose

The intent of this project is demonstrate how nested variables can be used and inspire you to use something similar in your own projects.

This project has the following structure

.env # a global environment variables file that sets environment variables that will be available to all containers and docker-compose files.<br>
docker-compose.yaml # a main docker compose file that uses the include: function to lauch 2 other containers.<br>
container_1 # a directory hosting files for a container that pulls the global and local variables.<br>
container_2 # a second directory hosting files for a container that pulls the global and local variables.<br>
container_3 # a third directory hosting files for a container that pulls the global and local variables.<br>
container_4 # a fourth directory hosting files for a container that pulls the global and local variables.

Each 'container_N' directory has the following structure

.env # a local (to the container) environment variables file that sets environment variables that will be available to all containers and docker-compose files.<br>
docker-compose.yaml # a docker-compose.yaml file used to launch the image.

![](1and2.png)
![](3and4.png)