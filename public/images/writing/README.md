# Writing Images

Use this folder for post cover images, article illustrations, diagrams, and supporting screenshots.

Recommended sizes:

- Post cover images: `1600 x 900px`, 16:9.
- Inline screenshots: at least `1400px` wide.
- Simple diagrams: SVG where practical.

Suggested naming:

- `post-slug-cover.webp`
- `post-slug-diagram.svg`
- `post-slug-screenshot-01.webp`

## Post hero images (front matter)

In each post MDX file, set a cover image:

```yaml
image: cover.webp
```

The site looks for files in this order:

1. `public/images/writing/<post-slug>/cover.webp` (preferred)
2. `public/images/writing/cover.webp` (shared filename)

You can also use a full path: `image: /images/hero/andrew_main.jpg`

Hero images appear on post pages, cards in lists, and Open Graph metadata when the file exists.

If a post is migrated from the old Hugo site and references local images, place replacement assets here using the slug folder pattern above.
