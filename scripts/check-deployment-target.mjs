import fs from "node:fs";
import assert from "node:assert/strict";
import ts from "typescript";

const target = process.argv[2];
assert.ok(["dev", "production"].includes(target), "Choose dev or production explicitly.");
const { config, error } = ts.parseConfigFileTextToJson("wrangler.jsonc", fs.readFileSync("wrangler.jsonc", "utf8"));
assert.ok(!error, "Invalid Wrangler configuration.");
const selected = target === "dev" ? config.env?.dev : config;
const name = target === "dev" ? "www-andrewriley-info-dev" : "www-andrewriley-info";
assert.equal(selected?.name, name, "Wrong Worker for the selected destination.");
assert.equal(selected.services?.find(binding => binding.binding === "WORKER_SELF_REFERENCE")?.service, name, "Worker self-reference must use the same destination.");
const domains = target === "dev" ? ["dev.andrewriley.info"] : ["andrewriley.info", "www.andrewriley.info", "2026.andrewriley.info"];
assert.deepEqual(selected.routes?.map(route => route.pattern).sort(), domains.sort(), "Unexpected deployment domains.");
assert.ok(selected.routes.every(route => route.custom_domain === true), "Expected custom domains only.");
console.log(`Verified ${target} Worker and domain isolation.`);
