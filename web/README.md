# andrewriley.info (Next.js reboot)

Personal site built with **Next.js** (App Router), **Tailwind CSS v4**, **TypeScript**, and **MDX**-backed posts via `next-mdx-remote`. Static export output is compatible with **Cloudflare Pages**.

Design tokens follow [andrewkriley/design-system](https://github.com/andrewkriley/design-system) (personal + shared palettes and typography).

## Commands

```bash
cd web
npm install
npm run dev          # local dev
npm run build        # static export → out/
npm run migrate:posts  # re-copy Hugo posts from ../content/post → content/posts
```

## Blog migration

Hugo posts live under the repo root `content/post/<year>/<slug>/`. The script writes:

- `web/content/posts/<slug>.mdx`
- Images to `web/public/images/posts/<slug>/`

## Cloudflare Pages

1. **Build command:** `npm run build` (run from `web/` — set root directory to `web` in the Pages project).
2. **Build output directory:** `out`
3. **Node:** 20.x or 22.x

### Contact form (Resend)

Static export does not include Next.js API routes. Contact uses a **Pages Function** at `functions/api/contact.js` (POST `/api/contact`).

In the Pages project, set secrets / environment variables:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Your inbox |
| `CONTACT_FROM_EMAIL` | Sender (must be a verified domain in Resend) |

Optional for local preview against deployed API:

```env
NEXT_PUBLIC_CONTACT_API=https://<your>.pages.dev/api/contact
```

## Analytics

Add the **Cloudflare Web Analytics** snippet in `src/app/layout.tsx` when you are ready (token from the dashboard).
