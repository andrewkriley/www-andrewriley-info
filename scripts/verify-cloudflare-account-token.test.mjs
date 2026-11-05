import test from "node:test";
import assert from "node:assert/strict";
import { verifyAccountToken } from "./verify-cloudflare-account-token.mjs";
const env = { CLOUDFLARE_ACCOUNT_ID: "23eb211b6d50300b28d04731a5b48bbc", CLOUDFLARE_API_TOKEN: "test-credential-never-log" };
const valid = { success: true, result: { id: "15fc67dd37e79edfc1809e2836632c84", status: "active" } };
const reply = data => async () => ({ ok: true, json: async () => data });

test("verifies the named token through the account endpoint", async () => {
  await verifyAccountToken(env, async (url, options) => {
    assert.equal(url, `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/tokens/verify`);
    assert.equal(options.headers.Authorization, `Bearer ${env.CLOUDFLARE_API_TOKEN}`);
    return { ok: true, json: async () => valid };
  });
});
for (const [label, data] of [
  ["another credential", { ...valid, result: { ...valid.result, id: "another-token" } }],
  ["disabled token", { ...valid, result: { ...valid.result, status: "disabled" } }],
  ["unsuccessful verification", { ...valid, success: false }],
  ["missing token metadata", { success: true }],
]) test(`rejects ${label}`, async () => assert.rejects(verifyAccountToken(env, reply(data))));
test("rejects missing credentials without making a request", async () => {
  await assert.rejects(verifyAccountToken({}, () => assert.fail("Unexpected request")), /Set the GitHub Actions secret/);
});
test("rejects a different account without making a request", async () => {
  await assert.rejects(verifyAccountToken({ ...env, CLOUDFLARE_ACCOUNT_ID: "another-account" }, () => assert.fail("Unexpected request")), /Unexpected Cloudflare account/);
});
test("does not expose raw error bodies or credentials", async () => {
  await assert.rejects(verifyAccountToken(env, async () => ({ ok: false, status: 401, json: () => assert.fail("Do not inspect or print the error body") })), error => {
    assert.ok(!error.message.includes(env.CLOUDFLARE_API_TOKEN));
    return error.message.includes("HTTP 401");
  });
});
