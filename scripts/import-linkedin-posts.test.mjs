import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const importer = fileURLToPath(new URL("./import-linkedin-posts.mjs", import.meta.url));
const profile = "https://www.linkedin.com/in/andrewriley/";
const post = { urn: "urn:li:activity:7523107221660975104", kind: "post", authorUrl: profile, text: "Original post. <script>never execute this text</script> {untrusted}", images: [] };

function fixture(entry) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "journal-import-"));
  fs.mkdirSync(path.join(directory, "src/content"), { recursive: true });
  const archive = path.join(directory, "archive.json");
  fs.writeFileSync(archive, JSON.stringify({ profile, capturedAt: "2026-11-05T12:00:00.000Z", posts: [entry] }));
  return { directory, archive, run: () => spawnSync(process.execPath, [importer, archive], { cwd: directory, encoding: "utf8" }) };
}

test("a verified original keeps its text and date and imports only once", () => {
  const f = fixture(post);
  assert.equal(f.run().status, 0);
  const output = path.join(f.directory, "src/content/linkedin-posts.json");
  const first = fs.readFileSync(output, "utf8");
  const [result] = JSON.parse(first);
  assert.equal(result.text, post.text);
  assert.equal(result.date, "2026-11-02T19:42:14.217Z");
  assert.equal(f.run().status, 0);
  assert.equal(fs.readFileSync(output, "utf8"), first);
});

for (const kind of ["comment", "reply", "repost"]) {
  test(`rejects ${kind} activity`, () => {
    const f = fixture({ ...post, kind });
    assert.notEqual(f.run().status, 0);
    assert.equal(fs.existsSync(path.join(f.directory, "src/content/linkedin-posts.json")), false);
  });
}

test("rejects another author's post", () => {
  const f = fixture({ ...post, authorUrl: "https://www.linkedin.com/in/someone-else/" });
  assert.notEqual(f.run().status, 0);
});

test("refuses an entry when an attached image has not been saved", () => {
  const f = fixture({ ...post, images: [{ url: "https://media.licdn.com/missing.jpg", alt: "Missing attachment" }] });
  assert.notEqual(f.run().status, 0);
  assert.equal(fs.existsSync(path.join(f.directory, "src/content/linkedin-posts.json")), false);
});
