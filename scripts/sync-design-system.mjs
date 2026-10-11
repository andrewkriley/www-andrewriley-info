#!/usr/bin/env node
/**
 * Consume andrewkriley/design-system the way CONSUME.md + the demo describe.
 *
 * This site uses only the DEMO default pattern (`therileys-team`) — the same
 * token set runbyus pins. It does not merge shared.json or apply a brand-voice
 * profile.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PIN_PATH = path.join(ROOT, "design-system.lock.json");
const DS_ROOT = path.join(ROOT, "node_modules", "design-system");
const SOFTENED_TOKENS = path.join(
  ROOT,
  "upstream/design-system/tokens/therileys-team.json",
);
const OUT_DIR = path.join(ROOT, "src", "generated");

const FALLBACK_FONT =
  "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

const SITE_TOKEN_MAP = {
  "brand-primary": "color.brand.primary",
  "brand-secondary": "color.brand.primaryMuted",
  "brand-accent": "color.brand.accent",
  "brand-growth": "color.accent.success",
  "brand-sky": "color.accent.cyan",
  "surface-page": "color.bg.canvas",
  "surface-muted": "color.bg.panel",
  "surface-inverse": "color.accent.default",
  "text-primary": "color.semantic.text",
  "text-secondary": "color.semantic.textMuted",
  "text-muted": "color.semantic.textMuted",
  "text-inverse": "color.semantic.onPrimary",
  "border-subtle": "color.border.default",
  "radius-card": "radius.md",
  "radius-hero": "radius.md",
};

const PALETTE = [
  {
    name: "Canvas",
    path: "color.bg.canvas",
    token: "surface-page",
    className: "bg-surface-page",
    usage: "Page background — DEMO / runbyus --bg-canvas.",
  },
  {
    name: "Panel",
    path: "color.bg.panel",
    token: "surface-muted",
    className: "bg-surface-muted",
    usage: "Cards and rails — DEMO / runbyus --bg-panel.",
  },
  {
    name: "Accent",
    path: "color.accent.default",
    token: "brand-primary",
    className: "bg-brand-primary",
    usage: "Softened primary brand accent — --accent-default (#749ece, was #58a6ff).",
  },
  {
    name: "Cyan",
    path: "color.accent.cyan",
    token: "brand-secondary",
    className: "bg-brand-secondary",
    usage: "Secondary highlights — --accent-cyan.",
  },
  {
    name: "Violet",
    path: "color.accent.violet",
    token: "brand-accent",
    className: "bg-brand-accent",
    usage: "Accent moments — --accent-violet.",
  },
  {
    name: "Success",
    path: "color.accent.success",
    token: "brand-growth",
    className: "bg-brand-growth",
    usage: "Positive state — --accent-success.",
  },
];

function readJson(absPath) {
  return JSON.parse(fs.readFileSync(absPath, "utf8"));
}

function dsPath(repoRelative) {
  return path.join(DS_ROOT, repoRelative);
}

function flattenTokens(tree, prefix = "", out = {}) {
  for (const key of Object.keys(tree)) {
    if (key.startsWith("$") || key === "meta") continue;
    const node = tree[key];
    const tokenPath = prefix ? `${prefix}.${key}` : key;
    if (node && typeof node === "object" && !Array.isArray(node) && "value" in node) {
      out[tokenPath] = { ...node, path: tokenPath };
    } else if (node && typeof node === "object" && !Array.isArray(node)) {
      flattenTokens(node, tokenPath, out);
    } else if (
      typeof node === "string" ||
      typeof node === "number" ||
      typeof node === "boolean"
    ) {
      out[tokenPath] = { value: node, path: tokenPath };
    }
  }
  return out;
}

function resolveOne(flat, tokenPath, seen) {
  const node = flat[tokenPath];
  if (!node) throw new Error(`Unknown token reference: ${tokenPath}`);
  if (node.resolvedValue !== undefined) return node.resolvedValue;
  if (seen.has(tokenPath)) {
    throw new Error(`Cyclic token reference at ${tokenPath}`);
  }
  seen.add(tokenPath);
  const match = typeof node.value === "string" && node.value.match(/^\{([\w.]+)\}$/);
  if (!match) {
    node.resolvedValue = node.value;
    return node.value;
  }
  const resolved = resolveOne(flat, match[1], seen);
  node.resolvedValue = resolved;
  node.refPath = match[1];
  return resolved;
}

function resolveAllTokens(flat) {
  for (const tokenPath of Object.keys(flat)) {
    resolveOne(flat, tokenPath, new Set());
  }
  return flat;
}

function withPatternColorAliases(tokens) {
  const alias = (aliasPath, sourcePath) => {
    if (tokens[sourcePath]) {
      tokens[aliasPath] = { ...tokens[sourcePath], path: aliasPath };
    }
  };
  alias("color.brand.primary", "color.accent.default");
  alias("color.brand.primaryMuted", "color.accent.cyan");
  alias("color.brand.accent", "color.accent.violet");
  alias("color.brand.surface", "color.bg.panel");
  alias("color.brand.surfaceAlt", "color.bg.canvas");
  alias("color.semantic.text", "color.text.primary");
  alias("color.semantic.textMuted", "color.text.muted");
  alias("color.semantic.link", "color.accent.default");
  alias("color.semantic.linkHover", "color.accent.cyan");
  alias("color.semantic.onPrimary", "color.bg.canvas");
  alias("color.semantic.onAccent", "color.bg.canvas");
  return tokens;
}

function cssValue(value) {
  return typeof value === "number" ? `${value}px` : value;
}

function tokenValue(flat, tokenPath) {
  const node = flat[tokenPath];
  if (!node) throw new Error(`Missing token ${tokenPath}`);
  return cssValue(node.resolvedValue);
}

function jsString(value) {
  return JSON.stringify(value);
}

function cssDecl(name, value, indent = "  ") {
  const property = name === "color-scheme" ? name : `--${name}`;
  return `${indent}${property}: ${value};`;
}

function cssBlock(selector, vars) {
  const body = vars.map(([name, value]) => cssDecl(name, value)).join("\n");
  return `${selector} {\n${body}\n}`;
}

function siteVars(flat) {
  const mapped = Object.entries(SITE_TOKEN_MAP).map(([name, tokenPath]) => [
    name,
    tokenValue(flat, tokenPath),
  ]);
  const accent = tokenValue(flat, "color.accent.default");
  mapped.push(["brand-accent-soft", `color-mix(in srgb, ${accent} 16%, transparent)`]);
  mapped.push(["shadow-soft", "0 8px 24px rgb(0 0 0 / 0.3)"]);
  mapped.push(["font-heading", FALLBACK_FONT]);
  mapped.push(["font-body", FALLBACK_FONT]);
  return mapped;
}

function writeGeneratedCss(pin, flat) {
  const header = `/* AUTO-GENERATED from ${pin.repo}@${pin.ref} (${pin.patternId} DEMO pattern). Do not edit. */`;
  const vars = [["color-scheme", "dark"], ...siteVars(flat)];
  const darkQueryVars = vars
    .map(([name, value]) => cssDecl(name, value, "    "))
    .join("\n");
  return `${header}

${cssBlock(":root", vars)}

@media (prefers-color-scheme: dark) {
  :root {
${darkQueryVars}
  }
}

${cssBlock('html[data-theme="light"]', vars)}

${cssBlock('html[data-theme="dark"]', vars)}
`;
}

function writeGeneratedTs(pin, pattern, flat) {
  const swatches = PALETTE.map((swatch) => ({
    name: swatch.name,
    token: swatch.token,
    path: swatch.path,
    hex: tokenValue(flat, swatch.path),
    usage: swatch.usage,
    className: swatch.className,
  }));

  return `/* AUTO-GENERATED from ${pin.repo}@${pin.ref} (${pin.patternId}). Do not edit. */

export const designSystemSource = {
  kind: "pattern",
  repo: ${jsString(pin.repo)},
  ref: ${jsString(pin.ref)},
  url: ${jsString(pin.url)},
  consumeDoc: ${jsString(`https://github.com/${pin.repo}/blob/${pin.ref}/design-system/tooling/CONSUME.md`)},
  patternId: ${jsString(pin.patternId)},
  profileId: ${jsString(pin.patternId)},
  sharedWith: ["runbyus"] as const,
} as const;

export const designSystemProfile = {
  id: ${jsString(pattern.id)},
  name: ${jsString(pattern.name)},
  tagline: ${jsString(pattern.tagline)},
  purpose: ${jsString(
    "Token-only DEMO pattern (dark). Accents are softened from v0.1.0 — primary brand #58a6ff is now #749ece. Same token set runbyus and build4galileo should consume.",
  )},
  values: [
    "Use only this pattern for product UIs — andrewriley.info and runbyus.",
    "Do not apply personal / business-primary / business-venture tokens here.",
    "Dark-only: there is no light variant in this token set."
  ] as const,
  tone: {
    primary: "Token-only — no brand voice",
  },
  voice: {
    summary: ${jsString(
      "The DEMO pattern has no voice or tone profile. Visual language only, shared with runbyus.",
    )},
  },
} as const;

export const designSystemPalette = ${JSON.stringify(swatches, null, 2)} as const;
`;
}

function main() {
  if (!fs.existsSync(DS_ROOT)) {
    throw new Error(
      "Missing node_modules/design-system. Run npm install so the pinned github:andrewkriley/design-system dependency is present.",
    );
  }

  const pin = readJson(PIN_PATH);
  if (pin.kind !== "pattern" || !pin.patternId) {
    throw new Error("design-system.lock.json must set kind=pattern and patternId.");
  }

  const patternIndex = readJson(dsPath("design-system/patterns/index.json"));
  const pattern = patternIndex.patterns.find((entry) => entry.id === pin.patternId);
  if (!pattern) {
    throw new Error(`Pattern ${pin.patternId} not listed in patterns/index.json`);
  }

  const raw = readJson(dsPath(pattern.tokensPath));
  const softened = readJson(SOFTENED_TOKENS);
  raw.color.accent = softened.color.accent;
  const flat = withPatternColorAliases(
    resolveAllTokens(flattenTokens(raw)),
  );

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const cssPath = path.join(OUT_DIR, "design-tokens.css");
  const tsPath = path.join(OUT_DIR, "design-system.ts");
  fs.writeFileSync(cssPath, writeGeneratedCss(pin, flat));
  fs.writeFileSync(tsPath, writeGeneratedTs(pin, pattern, flat));

  console.log(`Wrote ${path.relative(ROOT, cssPath)}`);
  console.log(`Wrote ${path.relative(ROOT, tsPath)}`);
  console.log(`Pinned ${pin.repo}@${pin.ref} pattern=${pin.patternId} (DEMO default, softened accents)`);
}

main();
