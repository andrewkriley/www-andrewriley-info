# www.andrewriley.info

Personal website and blog for **Andrew Riley** (“Riles”), published at [https://www.andrewriley.info](https://www.andrewriley.info).

## Purpose

The site is a place for writing and sharing posts—technology, music, home, and similar topics—using a static site so pages stay fast, cheap to host, and easy to version in Git.

## Technical stack

| Layer | Choice |
|--------|--------|
| **Generator** | [Hugo](https://gohugo.io/) (static site) |
| **Theme** | [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack), vendored under `themes/hugo-theme-stack/` |
| **Content** | Markdown with YAML front matter under `content/` |
| **Markup** | Goldmark (with optional raw HTML where configured) |
| **Math** | LaTeX via passthrough delimiters (`$$...$$`, `\[...\]`) |
| **Syntax highlighting** | Hugo/Chroma, line-numbered code blocks |
| **Styling** | Theme defaults plus overrides in `content/scss/` and `assets/` |

Configuration lives in `config/_default/` (`config.toml`, `markup.toml`, `permalinks.toml`, etc.). Posts use URLs like `/p/<slug>/` as defined in the permalink config.

## Local development

Requires [Hugo](https://gohugo.io/installation/) installed locally.

```bash
# Dev server (includes drafts)
hugo server -D

# Production build (output in public/)
hugo
```

To scaffold a new post:

```bash
hugo new post/2025/<slug>/index.md
```

## Deployment (Cloudflare Pages)

The site is deployed on **[Cloudflare Pages](https://pages.cloudflare.com/)**. Pushes to this repository trigger builds and deploys:

- **`main`** — production at `https://www.andrewriley.info`
- **`dev`** — preview deployments for work-in-progress changes

Set the Cloudflare Pages build to run Hugo (install Hugo in the build environment if needed) and publish the `public/` directory. Keep `baseurl` in `config/_default/config.toml` aligned with the production URL before release builds.

## Repository layout (short)

- `content/` — pages, posts, categories, homepage
- `config/_default/` — Hugo config
- `themes/hugo-theme-stack/` — theme (git submodule)
- `static/` — static assets (e.g. favicon)
- `public/` — build output (generated; do not edit)

More detail on conventions and categories is in [`CLAUDE.md`](CLAUDE.md).
