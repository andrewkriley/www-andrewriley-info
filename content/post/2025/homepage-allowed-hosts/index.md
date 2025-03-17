---
title: HOMEPAGE_ALLOWED_HOSTS env parameter
description: What to do if you get a "denied access" to your homepage.dev 
date: 2025-03-18T00:00:01+11:00
image: homepage-denied.png
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
tags: 
    - homepage
    - docker
categories:
    - technology
---

So you've landed here because your getting an error like this in your ```homepage.dev``` logs.

```
homepage  | [2025-03-17T19:48:52.418Z] error: Host validation failed for: X.X.X.X:PORT. Hint: Set the HOMEPAGE_ALLOWED_HOSTS environment variable to allow requests from this host / port.
```

Per the documentation at https://gethomepage.dev/installation/#homepage_allowed_hosts a change was introduced in v1.0 that now requires this environment variable to be set.

HOMEPAGE_ALLOWED_HOSTS
As of v1.0 there is one required environment variable to access homepage via a URL other than localhost, HOMEPAGE_ALLOWED_HOSTS. The setting helps prevent certain kinds of attacks when retrieving data from the homepage API proxy.

The value is a comma-separated (no spaces) list of allowed hosts (sometimes with the port) that can host your homepage install. See the docker, kubernetes and source installation pages for more information about where / how to set the variable.

localhost:3000 and 127.0.0.1:3000 are always included, but you can add a domain or IP address to this list to allow that host such as HOMEPAGE_ALLOWED_HOSTS=gethomepage.dev,192.168.1.2:1234, etc.

If you are seeing errors about host validation, check the homepage logs and ensure that the host exactly as output in the logs is in the HOMEPAGE_ALLOWED_HOSTS list.

This can be disabled by setting HOMEPAGE_ALLOWED_HOSTS to * but this is not recommended.





---


