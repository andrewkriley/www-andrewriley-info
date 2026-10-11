#!/usr/bin/env node
/**
 * Consume andrewkriley/design-system the way CONSUME.md describes:
 * load manifests/index.json + tokens/index.json, merge shared + profile
 * tokens, resolve `{dot.path}` references, then emit site CSS and metadata.
 *
 * Source files come from the pinned git dependency (`design-system` in
 * package.json / design-system.lock.json).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PIN_PATH = path.join(ROOT, "design-system.lock.json");
const DS_ROOT = path.join(ROOT, "node_modules", "design-system");
const OUT_DIR = path.join(ROOT, "src", "generated");

const SITE_TOKEN_MAP = {
  "brand-primary": "color.brand.primary",
  "brand-secondary": "color.brand.primaryMuted",
  "brand-accent": "color.brand.accent",
  "brand-growth": "color.brand.growth",
  "brand-sky": "color.brand.sky",
  "brand-accent-soft": "color.brand.accentSoft",
  "surface-page": "color.brand.surface",
  "surface-muted": "color.brand.surfaceAlt",
  "surface-inverse": "color.brand.primaryMuted",
  "text-primary": "color.semantic.text",
  "text-secondary": "color.semantic.textMuted",
  "text-muted": "color.semantic.textSubtle",
  "text-inverse": "color.semantic.inverse",
  "border-subtle": "color.semantic.border",
  "shadow-soft": "shadow.soft",
  "radius-card": "radius.card",
  "radius-hero": "radius.hero",
  "font-heading": "font.heading",
  "font-body": "font.body",
};

const BRAND_SWATCHES = [
  {
    name: "Cobalt",
    path: "color.brand.primary",
    token: "brand-primary",
    className: "bg-brand-primary",
  },
  {
    name: "Sky",
    path: "color.brand.primaryMuted",
    token: "brand-secondary",
    className: "bg-brand-secondary",
  },
  {
    name: "Lime",
    path: "color.brand.accent",
    token: "brand-accent",
    className: "bg-brand-accent",
  },
  {
    name: "Growth",
    path: "color.brand.growth",
    token: "brand-growth",
    className: "bg-brand-growth",
  },
  {
    name: "Air",
    path: "color.brand.sky",
    token: "brand-sky",
    className: "bg-brand-sky",
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
    if (key.startsWith("$")) continue;
    const node = tree[key];
    const tokenPath = prefix ? `${prefix}.${key}` : key;
    if (node && typeof node === "object" && !Array.isArray(node) && "value" in node) {
      out[tokenPath] = { ...node, path: tokenPath };
    } else if (node && typeof node === "object" && !Array.isArray(node)) {
      flattenTokens(node, tokenPath, out);
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

function deepMerge(a, b) {
  const out = { ...a };
  for (const key of Object.keys(b)) {
    if (
      b[key] &&
      typeof b[key] === "object" &&
      !("value" in b[key]) &&
      a[key] &&
      typeof a[key] === "object"
    ) {
      out[key] = deepMerge(a[key], b[key]);
    } else {
      out[key] = b[key];
    }
  }
  return out;
}

function tokenValue(flat, tokenPath, mode = "light") {
  const darkPath = `dark.${tokenPath}`;
  if (mode === "dark" && flat[darkPath]) return flat[darkPath].resolvedValue;
  const node = flat[tokenPath];
  if (!node) throw new Error(`Missing token ${tokenPath}`);
  return node.resolvedValue;
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

function siteVars(flat, mode) {
  return Object.entries(SITE_TOKEN_MAP).map(([name, tokenPath]) => [
    name,
    tokenValue(flat, tokenPath, mode),
  ]);
}

function writeGeneratedCss(pin, flat) {
  const header = `/* AUTO-GENERATED from ${pin.repo}@${pin.ref} (${pin.profileId}). Do not edit. */`;
  const darkVars = [["color-scheme", "dark"], ...siteVars(flat, "dark")]
    .map(([name, value]) => cssDecl(name, value, "    "))
    .join("\n");
  const darkQuery = `@media (prefers-color-scheme: dark) {\n  :root {\n${darkVars}\n  }\n}`;

  return `${header}

${cssBlock(":root", [["color-scheme", "light"], ...siteVars(flat, "light")])}

${darkQuery}

${cssBlock('html[data-theme="light"]', [
  ["color-scheme", "light"],
  ...siteVars(flat, "light"),
])}

${cssBlock('html[data-theme="dark"]', [
  ["color-scheme", "dark"],
  ...siteVars(flat, "dark"),
])}
`;
}

function writeGeneratedTs(pin, manifest, flat) {
  const swatches = BRAND_SWATCHES.map((swatch) => ({
    name: swatch.name,
    token: swatch.token,
    path: swatch.path,
    hex: tokenValue(flat, swatch.path, "light"),
    usage: flat[swatch.path]?.description ?? "",
    className: swatch.className,
  }));

  return `/* AUTO-GENERATED from ${pin.repo}@${pin.ref} (${pin.profileId}). Do not edit. */

export const designSystemSource = {
  repo: ${jsString(pin.repo)},
  ref: ${jsString(pin.ref)},
  url: ${jsString(pin.url)},
  consumeDoc: ${jsString(`https://github.com/${pin.repo}/blob/${pin.ref}/design-system/tooling/CONSUME.md`)},
  profileId: ${jsString(pin.profileId)},
} as const;

export const designSystemProfile = {
  id: ${jsString(manifest.id)},
  name: ${jsString(manifest.name)},
  tagline: ${jsString(manifest.tagline)},
  purpose: ${jsString(manifest.purpose)},
  values: ${JSON.stringify(manifest.values, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join("\n")} as const,
  tone: ${JSON.stringify(manifest.tone, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join("\n")},
  voice: ${JSON.stringify(manifest.voice, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join("\n")},
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
  const manifestIndex = readJson(dsPath("design-system/manifests/index.json"));
  const tokenIndex = readJson(dsPath("design-system/tokens/index.json"));
  const shared = readJson(dsPath(tokenIndex.shared));

  const manifestPath = manifestIndex.profiles.find((entry) =>
    entry.endsWith(`/${pin.profileId}.json`),
  );
  if (!manifestPath) {
    throw new Error(`Profile ${pin.profileId} not listed in manifests/index.json`);
  }

  const manifest = readJson(dsPath(manifestPath));
  const setPath = tokenIndex.sets[manifest.tokenSetId];
  if (!setPath) {
    throw new Error(`No token set for ${manifest.tokenSetId}`);
  }

  const profileTokens = readJson(dsPath(setPath));
  const flat = resolveAllTokens(flattenTokens(deepMerge(shared, profileTokens)));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const cssPath = path.join(OUT_DIR, "design-tokens.css");
  const tsPath = path.join(OUT_DIR, "design-system.ts");
  fs.writeFileSync(cssPath, writeGeneratedCss(pin, flat));
  fs.writeFileSync(tsPath, writeGeneratedTs(pin, manifest, flat));

  console.log(`Wrote ${path.relative(ROOT, cssPath)}`);
  console.log(`Wrote ${path.relative(ROOT, tsPath)}`);
  console.log(`Pinned ${pin.repo}@${pin.ref} profile=${pin.profileId}`);
}

main();
