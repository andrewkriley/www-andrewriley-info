/* AUTO-GENERATED from andrewkriley/design-system@v0.1.0 (therileys-team). Do not edit. */

export const designSystemSource = {
  kind: "pattern",
  repo: "andrewkriley/design-system",
  ref: "v0.1.0",
  url: "https://github.com/andrewkriley/design-system/tree/v0.1.0",
  consumeDoc: "https://github.com/andrewkriley/design-system/blob/v0.1.0/design-system/tooling/CONSUME.md",
  patternId: "therileys-team",
  profileId: "therileys-team",
  sharedWith: ["runbyus"] as const,
} as const;

export const designSystemProfile = {
  id: "therileys-team",
  name: "therileys-team",
  tagline: "A homelab/product UI token set — not a brand-voice profile.",
  purpose: "Token-only DEMO pattern (dark). Accents are softened from v0.1.0 — primary brand #58a6ff is now #749ece. Same token set runbyus and build4galileo should consume.",
  values: [
    "Use only this pattern for product UIs — andrewriley.info and runbyus.",
    "Do not apply personal / business-primary / business-venture tokens here.",
    "Dark-only: there is no light variant in this token set."
  ] as const,
  tone: {
    primary: "Token-only — no brand voice",
  },
  voice: {
    summary: "The DEMO pattern has no voice or tone profile. Visual language only, shared with runbyus.",
  },
} as const;

export const designSystemPalette = [
  {
    "name": "Canvas",
    "token": "surface-page",
    "path": "color.bg.canvas",
    "hex": "#0e1116",
    "usage": "Page background — DEMO / runbyus --bg-canvas.",
    "className": "bg-surface-page"
  },
  {
    "name": "Panel",
    "token": "surface-muted",
    "path": "color.bg.panel",
    "hex": "#161b22",
    "usage": "Cards and rails — DEMO / runbyus --bg-panel.",
    "className": "bg-surface-muted"
  },
  {
    "name": "Accent",
    "token": "brand-primary",
    "path": "color.accent.default",
    "hex": "#749ece",
    "usage": "Softened primary brand accent — --accent-default (#749ece, was #58a6ff).",
    "className": "bg-brand-primary"
  },
  {
    "name": "Cyan",
    "token": "brand-secondary",
    "path": "color.accent.cyan",
    "hex": "#56a3a7",
    "usage": "Secondary highlights — --accent-cyan.",
    "className": "bg-brand-secondary"
  },
  {
    "name": "Violet",
    "token": "brand-accent",
    "path": "color.accent.violet",
    "hex": "#a185ce",
    "usage": "Accent moments — --accent-violet.",
    "className": "bg-brand-accent"
  },
  {
    "name": "Success",
    "token": "brand-growth",
    "path": "color.accent.success",
    "hex": "#578d5e",
    "usage": "Positive state — --accent-success.",
    "className": "bg-brand-growth"
  }
] as const;
