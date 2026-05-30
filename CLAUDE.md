# CLAUDE.md — www.andrewriley.info

## Project Overview

Personal site / portfolio for Andrew Riley ("Riles"), built with Next.js 16 (App Router) + React 19 + TypeScript, styled with Tailwind CSS v4, content authored in MDX, deployed to Cloudflare via OpenNext. Hosted at https://www.andrewriley.info.

## Project Structure

```
.
├── public/
│   └── images/writing/    # Post hero images (by slug or flat)
├── scripts/
│   └── optimize-hero-images.mjs
├── src/
│   ├── app/               # App Router routes (lead, build, play, health, p/[slug], etc.)
│   ├── components/        # UI components (site-header, post-card, mdx-components, ...)
│   ├── content/
│   │   └── posts/         # *.mdx blog posts (slug = filename)
│   ├── data/
│   │   └── site.ts        # Nav, social links, featured work, homepage metadata
│   └── lib/               # content, format, post-image, youtube, utils
├── next.config.ts         # Page extensions, allowed origins, redirects
├── open-next.config.ts    # OpenNext Cloudflare adapter config
├── wrangler.jsonc         # Cloudflare Worker / assets config
└── package.json
```

## Posts

Posts are MDX files at `src/content/posts/<slug>.mdx` and render at `/p/<slug>`.

### Front Matter (YAML)

```yaml
---
title: Post Title
description: One-line summary.
date: 2025-01-01T00:00:00+11:00
image: cover-image.png      # optional; resolved from public/images/writing/<slug>/ or public/images/writing/
tags:
    - linux
categories:
    - technology
slug: post-slug
---
```

Hero image resolution lives in [src/lib/post-image.ts](src/lib/post-image.ts).

## Scripts

```bash
npm run dev          # Next.js dev server
npm run build        # Production build
npm run start        # Run production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run optimize:hero  # Sharp-based hero image optimisation

# Cloudflare (OpenNext)
npm run cf:build     # opennextjs-cloudflare build
npm run cf:preview   # build + wrangler dev
npm run cf:deploy    # build + deploy
```

## Deployment

Hosted on **Cloudflare** (Workers + assets via OpenNext). Commits to `main` deploy to production at https://www.andrewriley.info.

## Redirects

Legacy Hugo URLs (e.g. `/categories/technology`, `/djriles`, `/archives`) are preserved as permanent redirects in [next.config.ts](next.config.ts).
