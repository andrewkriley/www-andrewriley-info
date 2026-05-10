# www.andrewriley.info

Portfolio and digital CV for **Andrew Riley** ("Riles"), published at [https://www.andrewriley.info](https://www.andrewriley.info).

## Purpose

The 2026 version of the site is built around proof-of-work through three themes: impact, build, and play. It presents professional leadership, technology projects, AI tooling, DIY work, writing, and music through an active portfolio rather than a static resume.

## Technical stack

| Layer | Choice |
|--------|--------|
| **Framework** | Next.js 16 with App Router |
| **UI** | React 19 and TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Content** | MDX files under `src/content/posts/` |
| **Email** | Resend-ready; contact flow still to be finalized |
| **Hosting** | Cloudflare with OpenNext |

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Content migration

The previous Hugo posts remain under `content/post/` as source material. To regenerate the MDX archive:

```bash
npm run migrate:content
```

Migrated posts live at `src/content/posts/*.mdx` and are served at `/p/<slug>` to preserve the existing public URL shape.

## Cloudflare preview and deploy

OpenNext adapts the Next.js build for Cloudflare:

```bash
npm run cf:build
npm run cf:preview
npm run cf:deploy
```

`wrangler.jsonc` contains the Cloudflare worker/assets configuration used by the OpenNext output.

## Repository layout

- `src/app/` - App Router pages and layouts
- `src/components/` - Reusable UI components
- `src/content/posts/` - MDX post archive
- `src/data/site.ts` - Navigation, social links, featured work, and homepage metadata
- `scripts/migrate-hugo-content.mjs` - Hugo-to-MDX migration script
- `content/` - Legacy Hugo content retained as migration source during the rebuild
