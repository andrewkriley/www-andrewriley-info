---
title: Get that nice Git branch displayed in your terminal
description: Add the following to get the active Git branch displayed in your terminal.
date: 2025-08-29T00:18:50+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - linux
    - bash
    - git
categories:
    - technology
---

## Get that nice Git branch displayed in your terminal

Add the following to get the active Git branch displayed in your terminal.

```
serveradmin@svr-docker-prod-01:~/homeops/infra/prod/pangolin/docker-compose (main)` 
```

For your `bash` terminal you'll need to edit `~/.bashrc` and add the following to the `EoF`.

```
# Function to show the current Git branch
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
    }

# Custom PS1 prompt with Git branch
export PS1="\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\]\$ "
```

