import { fileURLToPath } from "node:url";

// Verify credentials without logging their values or raw API responses.
export async function verifyAccountToken(env = process.env, request = fetch) {
  const accountId = "23eb211b6d50300b28d04731a5b48bbc";
  const tokenId = "15fc67dd37e79edfc1809e2836632c84";
  const token = env.CLOUDFLARE_API_TOKEN;
  if (!token) throw new Error("Set the GitHub Actions secret CLOUDFLARE_API_TOKEN to the account-owned '54NR andrewriley.info worker' token.");
  if (env.CLOUDFLARE_ACCOUNT_ID !== accountId) throw new Error("Unexpected Cloudflare account.");
  const response = await request(`https://api.cloudflare.com/client/v4/accounts/${accountId}/tokens/verify`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Account-token verification failed (HTTP ${response.status}). Update the GitHub Actions secret with the active account-owned token.`);
  const data = await response.json();
  if (!data.success || data.result?.status !== "active" || data.result?.id !== tokenId) {
    throw new Error("The GitHub Actions secret must contain the active account-owned '54NR andrewriley.info worker' token (not the deleted user build token).");
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await verifyAccountToken();
  console.log("Verified the active account-owned deployment token.");
}
