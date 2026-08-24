# www.andrewriley.info

Portfolio and digital CV for **Andrew Riley** ("Riles"), published at [https://www.andrewriley.info](https://www.andrewriley.info).

## Purpose

The 2026 version of the site is built around proof-of-work through four themes: lead, build, play, and health. It presents professional leadership, technology projects, AI tooling, DIY work, writing, wellbeing, and music through an active portfolio rather than a static resume.

## Technical stack

| Layer | Choice |
|--------|--------|
| **Framework** | Next.js 16 with App Router |
| **UI** | React 19 and TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Content** | MDX files under `src/content/posts/` |
| **Hosting** | Cloudflare Workers via OpenNext |

## Local development

Requires Node 20.9+ (22 is used in CI and Workers Builds; see `.node-version`).

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
```

`npm run build` is the Cloudflare/OpenNext production build plus local cache populate (so prerendered `/p/<slug>` posts are uploaded as static assets). Use `npm run build:next` for a plain Next.js build.

## Cloudflare deploy

The app is a Worker, not Cloudflare Pages.

### Workers Builds (canonical)

Connect this GitHub repository in the Cloudflare dashboard. On push to `main`:

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Node version | `22` (from `.node-version`) |

`wrangler.jsonc` attaches the production hostnames:

- https://andrewriley.info
- https://www.andrewriley.info
- https://2026.andrewriley.info

### Local / manual

```bash
npm run preview   # OpenNext build + wrangler dev
npm run deploy    # OpenNext build + production deploy
npm run upload    # OpenNext build + version upload (gradual rollout)
```

`wrangler.jsonc` is the source of truth for the Worker name (`www-andrewriley-info`), Node.js compatibility flags, static assets, image optimization, and custom domains.

## Repository layout

- `src/app/` — App Router pages and layouts
- `src/components/` — Reusable UI components
- `src/content/posts/` — MDX post archive (`/p/<slug>`)
- `src/data/site.ts` — Navigation, social links, featured work, and homepage metadata
- `open-next.config.ts` — OpenNext adapter (keeps Workers Builds from recursing into `npm run build`)
- `wrangler.jsonc` — Cloudflare Worker configuration
