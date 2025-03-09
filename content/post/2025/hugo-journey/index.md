---
title: A Journey with Hugo
description: Taking the first steps towards a Hugo  
date: 2023-03-09T20:58:50+11:00
weight: 1       # You can add weight to some posts to override the default sorting (date descending)
image: hugo.png
tags: 
    - hugo
    - hosting
    - cloudflare
    - git
categories:
    - technology
---

# TLDR;

Here's the
1) Download Hugo binary for your OS
2) Confirm you can run the hugo binary 
3) Create a new site using hugo
4) Initiate a new git repository inside your newly provisioned hugo site
5) Push your new site to github.com
6) Connect your Github to CloudFlare Pages
7) Deploy your hugo site to CloudFlare Pages

Some questions you might have:
- Did I try using Docker? Yes

Here's the detail

```bash
andreril ~/Downloads/hugo_extended_0.145.0_darwin-universal  $ ./hugo version
hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended darwin/arm64 BuildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio
andreril ~/Downloads/hugo_extended_0.145.0_darwin-universal  $ 
```
3) run the binary to create a new site
```bash
hugo new site my-first-site
```
4) You should see the following output

```bash
Congratulations! Your new Hugo site was created in /Users/andreril/Desktop/dev/my-first-site.

Just a few more steps...

1. Change the current directory to /Users/andreril/Desktop/dev/my-first-site.
2. Create or install a theme:
   - Create a new theme with the command "hugo new theme <THEMENAME>"
   - Or, install a theme from https://themes.gohugo.io/
3. Edit hugo.toml, setting the "theme" property to the theme name.
4. Create new content with the command "hugo new content <SECTIONNAME>/<FILENAME>.<FORMAT>".
5. Start the embedded web server with the command "hugo server --buildDrafts".

See documentation at https://gohugo.io/.
andreril ~/Desktop/dev  $ 
```


Resources used

https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/
https://github.com/CaiJimmy/hugo-theme-stack
https://github.com/CaiJimmy/hugo-theme-stack-starter
https://gohugo.io/installation

https://gohugo.io/installation/macos/




---