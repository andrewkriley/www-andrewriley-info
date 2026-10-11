/* AUTO-GENERATED from andrewkriley/design-system@v0.1.0 (personal). Do not edit. */

export const designSystemSource = {
  repo: "andrewkriley/design-system",
  ref: "v0.1.0",
  url: "https://github.com/andrewkriley/design-system/tree/v0.1.0",
  consumeDoc: "https://github.com/andrewkriley/design-system/blob/v0.1.0/design-system/tooling/CONSUME.md",
  profileId: "personal",
} as const;

export const designSystemProfile = {
  id: "personal",
  name: "Andrew Riley",
  tagline: "From breadboards to boardrooms: leadership, technology and DIY builds, creative play through music, and personal health.",
  purpose: "Represent Andrew Riley as an individual: credibility, character, and the through-line that connects every business entity. This profile is for speaking, writing, and media where the person—not a company—is the primary brand. Lives at https://www.andrewriley.info, organised around four pillars: Health, Build, Play, Lead.",
  values: [
    "Health means protecting the physical and mental foundation underneath it all.",
    "Build means making useful things visible, repeatable, and understandable.",
    "Play means keeping creativity, energy, and curiosity alive.",
    "Lead means helping people, teams, and ideas move forward."
  ] as const,
  tone: {
    "primary": "Assured, approachable, precise",
    "secondary": [
      "Conversational without being casual",
      "Optimistic but grounded"
    ],
    "avoid": [
      "Hype without substance",
      "Corporate filler",
      "Talking down to the audience"
    ]
  },
  voice: {
    "summary": "Sound like someone who has done the work and can explain it plainly. Prefer concrete examples, short sentences, and a calm confidence. Let expertise show through structure and accuracy, not jargon.",
    "theyAllSoundLike": "Every Andrew Riley touchpoint—personal or business—should feel like the same person showed up: clear, fair-minded, and allergic to empty marketing noise. Business entities may dial formality or playfulness up or down, but never swap integrity of voice.",
    "do": [
      "Lead with the point, then support it",
      "Use “we” for shared work, “I” for personal point of view",
      "Name trade-offs when they matter"
    ],
    "dont": [
      "Stack superlatives",
      "Hide uncertainty behind buzzwords",
      "Mimic trends that clash with stated values"
    ]
  },
} as const;

export const designSystemPalette = [
  {
    "name": "Cobalt",
    "token": "brand-primary",
    "path": "color.brand.primary",
    "hex": "#3a55b4",
    "usage": "Cobalt — primary actions, key links, brand anchor",
    "className": "bg-brand-primary"
  },
  {
    "name": "Sky",
    "token": "brand-secondary",
    "path": "color.brand.primaryMuted",
    "hex": "#6caddf",
    "usage": "Sky — eyebrows, secondary highlights, section accents (site's brand-secondary)",
    "className": "bg-brand-secondary"
  },
  {
    "name": "Lime",
    "token": "brand-accent",
    "path": "color.brand.accent",
    "hex": "#ccff8c",
    "usage": "Lime — high-energy accents and small emphasis moments",
    "className": "bg-brand-accent"
  },
  {
    "name": "Growth",
    "token": "brand-growth",
    "path": "color.brand.growth",
    "hex": "#81de76",
    "usage": "Growth green — making, progress, DIY, positive-state highlights",
    "className": "bg-brand-growth"
  },
  {
    "name": "Air",
    "token": "brand-sky",
    "path": "color.brand.sky",
    "hex": "#8cd9ff",
    "usage": "Air — soft surfaces and glows; becomes the primary color in dark mode",
    "className": "bg-brand-sky"
  }
] as const;
