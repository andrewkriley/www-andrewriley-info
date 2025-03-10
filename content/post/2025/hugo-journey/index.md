---
title: A Journey with Hugo
description: The first steps to crafting a new static website using the Hugo Framework.
date: 2025-03-09T20:58:50+11:00
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

## TLDR;

What is Hugo https://gohugo.io/ - "The world’s fastest framework for building websites"

Here's the high level steps
1) Download Hugo binary for your OS
2) Confirm you can run the hugo binary 
3) Create a new site using hugo
4) Initiate a new git repository inside your newly provisioned hugo site
5) Push your new site to github.com
6) Connect your Github to CloudFlare Pages
7) Deploy your hugo site to CloudFlare Pages

> ***Did I try using Docker?***<br>
Yes, Docker is the default answer to everything right? I discovered permission issues with the base setup when running `hugo new site <newsite>`, mounting the path as a volume and then trying to edit it in Visual Studio Code. Am sure there's a way around this but for these first steps I just wanted a result. Hence the above approach using the locally run Hugo binary on my dev workstation meant permissions where simple and I could get underway quickly.

## Here's the detail

Download Hugo binary for your OS.

https://gohugo.io/installation<br>
Precompiled Binaries here <br>
https://github.com/gohugoio/hugo/releases/tag/v0.145.0

In my case I used the ```hugo_extended_0.145.0_darwin-universal.tar.gz``` binary, but do what fits your dev environment.

Extract the binary to a folder

```bash
mkdir hugo_extended
tar -xzvf hugo_extended_0.145.0_darwin-universal.tar.gz -C ./hugo_extended
```
Confirm you can run the hugo binary 

```
cd hugo_extended
hugo version
```
Which should give you this output<br>

```
hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended darwin/arm64 BuildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio
```

Create a new site using hugo

Run the following ```hugo``` command to set up the directory structure and files in the ```my-new-site``` folder.

```bash
hugo new site my-new-site
```

This will then give the following output if successful

```
Congratulations! Your new Hugo site was created in /Users/<yourusername>/Desktop/dev/my-new-site.

Just a few more steps...

1. Change the current directory to /Users/<yourusername>>/Desktop/dev/my-new-site.
2. Create or install a theme:
   - Create a new theme with the command "hugo new theme <THEMENAME>"
   - Or, install a theme from https://themes.gohugo.io/
3. Edit hugo.toml, setting the "theme" property to the theme name.
4. Create new content with the command "hugo new content <SECTIONNAME>/<FILENAME>.<FORMAT>".
5. Start the embedded web server with the command "hugo server --buildDrafts".


```
Initiate a new git repository inside your newly provisioned hugo site

Change directory to the ```my-new-site``` folder

```bash
cd my-new-site
```
Then create a new repository and push it to the main branch

```bash
echo "# my-new-site" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
```

Push your new site to github.com

```bash
git remote add origin git@github.com:<andrewkriley>/my-new-site.git
git push -u origin main
```

> ***UNFINISHED BELOW***<br>

6) Connect your Github to CloudFlare Pages
7) Deploy your hugo site to CloudFlare Pages

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


## Future projects
- Publish the docker image for Hugo I created
- Publish a how-to using the above and a local docker compose example

---

