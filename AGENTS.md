## Cursor Cloud specific instructions

### Overview

This is a Hugo static site (personal blog). The only required tool is **Hugo extended** (`hugo`). There is no database, backend service, Node.js, or Docker dependency.

### Hugo installation

Hugo extended edition is installed via `.deb` package from GitHub releases. The update script handles this automatically.

### Running the dev server

```bash
hugo server -D --bind 0.0.0.0 --port 1313
```

- `-D` includes draft posts
- The site is then available at `http://localhost:1313/`
- Hugo watches for file changes and live-reloads automatically

### Building the site

```bash
hugo
```

Output goes to `public/`. See `CLAUDE.md` for full project structure and conventions.

### Theme

The `hugo-theme-stack` theme is vendored in `themes/hugo-theme-stack/` (declared as a git submodule in `.gitmodules` but files are committed directly). Hugo module imports in `config/_default/module.toml` are commented out — the theme loads from the local directory.

### Gotchas

- There is no linter or test framework configured for this project; validation is done via `hugo` build (which fails on broken templates/config).
- The `.Site.Data` deprecation warning during build is from the theme, not site content — safe to ignore.
- Post slugs in URLs (`/p/<slug>/`) are derived from the front matter `title` (slugified), not the directory name.
