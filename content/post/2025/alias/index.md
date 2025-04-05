---
title: Handy Docker alias command examople
description: Shortcut your typing and speed up your deployments.
date: 2025-04-05T00:18:50+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - linux
categories:
    - technology
---


## Add the following to your ~/.bashrc

***NOTE*** ```.bashrc``` is located in the root of your homw directory. 

```bash
#AR alias
alias dcp='docker compose --profile'
alias dps='docker ps'
alias dc='docker compose'
```

OR create this dandy little bash script to auto append a group of alias commands.


```bash
#!/bin/bash

# Define the lines to append
lines_to_append="#AR alias
alias dcp='docker compose --profile'
alias dps='docker ps'
alias dc=docker compose'"

# Check if the lines already exist in the .bashrc file to avoid duplicates
if ! grep -Fxq "$lines_to_append" ~/.bashrc; then
  # Append the lines to the .bashrc file
  echo "$lines_to_append" >> ~/.bashrc
  echo "Successfully appended the following lines to ~/.bashrc:"
  echo "$lines_to_append"
else
  echo "The specified lines already exist in ~/.bashrc. No changes were made."
fi

echo "Remember to source your .bashrc file or open a new terminal for the changes to take effect:"
echo "  source ~/.bashrc"
```