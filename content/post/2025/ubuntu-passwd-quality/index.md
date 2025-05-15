---
title: Setting good password complexity controls
description: Making strong Ubuntu password policies
date: 2025-05-15T00:01:52+11:00
#image: belongil.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - ubuntu
categories:
    - technology
---

## Making strong Ubuntu password policies requires setting good password complexity controls

Inspired by https://www.server-world.info/en/note?os=Ubuntu_22.04&p=pam&f=1

## Install 
```
apt -y install libpam-pwquality
```

## Edit  /etc/login.defs
```
PASS_MAX_DAYS	60
PASS_MIN_DAYS	1
PASS_WARN_AGE	7
```

## Edit /etc/pam.d/common-password
```
password	requisite			pam_pwquality.so retry=3 remember=5
```

## Edit /etc/security/pwquality.conf
```
difok = 5
minlen = 8
dcredit = -1
ucredit = -1
lcredit = -1
ocredit = -1
minclass = 2
maxrepeat = 2
maxclassrepeat = 4
gecoscheck = 1
usercheck = 1
usersubstr = 1
enforcing = 1
enforce_for_root
badwords = cisco123
```

