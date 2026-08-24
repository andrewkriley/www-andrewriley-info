# CLAUDE.md — www.andrewriley.info

## Project Overview

Portfolio and digital CV for Andrew Riley ("Riles"), published at https://www.andrewriley.info.

The 2026 site is a Next.js App Router app deployed to **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare). It is not a Hugo site.

## Technical stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- MDX posts under `src/content/posts/`
- Cloudflare Workers + OpenNext (`@opennextjs/cloudflare`) + Wrangler

## Project structure

```
.
├── .github/workflows/   # CI (typecheck/lint) and secret scanning
├── public/              # Static assets (hero images, `_headers`)
├── scripts/             # Hero-image optimisation helper
├── src/
│   ├── app/             # App Router pages and layouts
│   ├── components/      # Shared UI
│   ├── content/posts/   # MDX archive, served at /p/<slug>
│   ├── data/site.ts     # Nav, socials, homepage copy
│   └── lib/             # Content helpers, YouTube, formatting
├── next.config.ts
├── open-next.config.ts  # OpenNext adapter (buildCommand avoids npm recursion)
├── wrangler.jsonc       # Worker name, domains, bindings
└── package.json
```

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars   # first time only
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build          # OpenNext Cloudflare build (what Workers Builds runs)
npm run preview        # OpenNext build + wrangler dev
```

## Content

Posts live at `src/content/posts/<slug>.mdx` and are served at `/p/<slug>/`.

```yaml
---
title: Post Title
description: One-line summary.
date: 2026-01-01T00:00:00+11:00
image: /images/writing/<slug>/cover.jpg   # optional
tags:
  - linux
categories:
  - technology
---
```

Categories used on the site: `technology`, `music`, `home`.

Site copy, nav, and featured work live in `src/data/site.ts`.

## Cloudflare deployment

Canonical path is **Workers Builds** connected to this GitHub repo (`main`).

Workers Builds settings:

- **Build command:** `npm run build` (runs `opennextjs-cloudflare build`)
- **Deploy command:** `npx opennextjs-cloudflare deploy`
- **Root directory:** repository root
- **Node:** 22 (see `.node-version`)

`open-next.config.ts` sets `buildCommand` to `npx next build` so OpenNext does not re-invoke `npm run build`. It also uses the Static Assets incremental cache so prerendered `/p/<slug>` posts are served (the default dummy cache 404s those routes).

Do not put custom domains only in the dashboard if they already exist in `wrangler.jsonc` — Wrangler is the source of truth for:

- `andrewriley.info`
- `www.andrewriley.info`
- `2026.andrewriley.info`

Preview Worker (`www-andrewriley-info-dev`, `*.workers.dev` only — no production hostnames):

```bash
npm run deploy:dev
```

Workers Builds for that Worker:

- **Build command:** `npm run build`
- **Deploy command:** `npx opennextjs-cloudflare deploy --env=dev`

Production deploy (when Cloudflare credentials are available locally):

```bash
npm run deploy
```

## Notes

- Incremental cache uses Workers Static Assets (no R2). Play's `revalidate = 3600` is served from the last deploy until the next build.
- Health, DIY workshop notes, and parts of `/uses` are intentionally light.
- Contact/email (Resend) is not wired up yet.
