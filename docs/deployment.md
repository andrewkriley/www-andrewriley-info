# Deployment with an account-owned Cloudflare token

GitHub Actions uses the existing account-owned **54NR andrewriley.info worker** token, ID `15fc67dd37e79edfc1809e2836632c84`, in account `23eb211b6d50300b28d04731a5b48bbc`. The value belongs in the repository Actions secret `CLOUDFLARE_API_TOKEN`, never in source, a workflow input, a build log or chat.

Secret settings: https://github.com/andrewkriley/www-andrewriley-info/settings/secrets/actions

Cloudflare token settings: https://dash.cloudflare.com/23eb211b6d50300b28d04731a5b48bbc/api-tokens/tokens/15fc67dd37e79edfc1809e2836632c84

## Dev

`.github/workflows/deploy.yml` runs on trusted repository branch pushes, excluding `main`. It does not execute on pull requests or accept fork code with deployment credentials. Shared dev deployments are serialized. Once the workflow exists on the default branch, a manual dispatch with destination `dev` is also available.

Before installing or deploying, the workflow verifies that the secret is the named, active account-owned token via the account token verification endpoint. A deleted user token or an unrelated credential stops the run. Credentials are provided only to verification and deployment steps.

The run installs the lockfile, validates content and code, checks the selected Worker/domain/self-reference, runs `npm run deploy:dev`, then checks every journal page and image at https://dev.andrewriley.info. It deploys only `www-andrewriley-info-dev` with the canonical dev custom domain. A failed deployment or verification fails the GitHub check.

## Production is staged but disabled

Merging a change or pushing `main` does not publish production through this workflow. The production job additionally requires manual dispatch on `main`, target `production`, and repository variable `ENABLE_PRODUCTION_ACCOUNT_DEPLOYMENT=true`.

Do not enable that variable until Andrew has approved configuring the `production` GitHub environment with Andrew (`andrewkriley`) as required reviewer, a main-only deployment branch policy and administrator bypass disabled. Allow self-review so the repository owner can approve a run they requested. The workflow references that environment and therefore waits for its approval before running production steps. Automatic approval review blocked changing these environment protections during setup; they have not been configured yet.

Production publication still needs Andrew's explicit approval. No production run is needed to test account-token authentication or the dev pipeline.

## Cutover from Workers Builds

Cloudflare Workers Builds currently supports user-owned build tokens only. Its old `www-andrewriley-info build token` registration points to a deleted or rotated user token. It is not the account token above. Do not create a replacement user token for this workflow.

After the GitHub dev deployment is verified, disable the legacy Workers Builds triggers to avoid duplicate deploy paths and obsolete failing checks. Preserve their original settings for rollback; do not delete credentials or change Worker code/domains as part of that cutover. Until cutover is confirmed, the old Cloudflare check can remain red independently of the GitHub deployment.

## If the existing secret is invalid

Update `CLOUDFLARE_API_TOKEN` in the GitHub settings link above with the existing account token's value, then rerun the failed Actions job. Stored secret values cannot be read back from GitHub, and the Cloudflare token details page cannot reveal an existing token value. Do not rotate the token as a troubleshooting shortcut: other services may depend on it. If its value is unavailable, arrange a deliberate credential update separately.

References: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/ and https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#api-token
