# CLAUDE.md — www.andrewriley.info

## Project Overview

Personal website/blog for Andrew Riley ("Riles") built with [Hugo](https://gohugo.io/) using the [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack) theme. Hosted at https://www.andrewriley.info.

## Project Structure

```
.
├── archetypes/         # Content templates (default.md)
├── assets/             # Site-level assets (SCSS, JS, images)
├── config/_default/    # Hugo configuration files
│   ├── config.toml     # Main config (baseurl, title, theme, pagination)
│   ├── markup.toml     # Goldmark renderer, syntax highlighting, ToC
│   ├── module.toml     # Hugo module imports
│   ├── permalinks.toml # URL structure (/p/:slug/ for posts, /:slug/ for pages)
│   └── related.toml    # Related content config
├── content/
│   ├── _index.md       # Homepage
│   ├── categories/     # Category index pages
│   ├── page/           # Static pages (archives, search, about, etc.)
│   ├── post/2025/      # Blog posts — each post is a directory with index.md
│   └── scss/           # Custom SCSS overrides
├── public/             # Hugo build output (do not edit manually)
├── resources/          # Hugo resource cache
├── static/             # Static files (favicon.ico, etc.)
└── themes/
    └── hugo-theme-stack/ # Theme (git submodule)
```

## Content Conventions

### Creating a New Post

Posts live under `content/post/2025/<slug>/index.md`. Use the archetype to scaffold:

```bash
hugo new post/2025/my-post-title/index.md
```

### Front Matter (YAML)

```yaml
---
title: Post Title
description: One-line summary.
date: 2025-01-01T00:00:00+11:00
image: cover-image.png          # optional, place image in same directory
# weight: 1                     # optional, overrides date-based sort order
tags:
    - linux
categories:
    - technology
---
```

Available categories: `technology`, `music`, `home`

### Post URL Structure

Posts are served at `/p/<slug>/` — the slug is derived from the directory name.

## Hugo Commands

```bash
# Local dev server (with drafts)
hugo server -D

# Build for production
hugo

# Create new post
hugo new post/2025/<slug>/index.md
```

## Deployment

The site is hosted on **Cloudflare Pages**. Deployments are triggered automatically by commits to:

- `main` — production deployment at https://www.andrewriley.info
- `dev` — preview deployment

## Configuration Notes

- **baseurl** in `config.toml` — update before deploying (`https://www.andrewriley.info`)
- **Markdown rendering** — `unsafe = true` allows raw HTML in markdown
- **Math support** — LaTeX via passthrough delimiters (`$$...$$`, `\[...\]`)
- **Syntax highlighting** — line numbers enabled, uses CSS classes (`noClasses = false`)
- **Theme** — `hugo-theme-stack` is vendored locally in `themes/` (not a Go module import)
