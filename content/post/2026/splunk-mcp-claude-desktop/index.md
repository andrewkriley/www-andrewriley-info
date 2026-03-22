---
title: Connecting Splunk to Claude — Token Auth, Self-Signed Certs, and the Desktop Gap
description: How to wire up the Splunk MCP server to both Claude Code and Claude Desktop in a homelab using token-based auth and mcp-remote as a TLS proxy.
slug: splunk-mcp-claude-desktop
date: 2026-03-22T18:27:53Z
tags:
    - splunk
    - claude
    - mcp
    - homelab
categories:
    - technology
---

I've had Splunk talking to Claude Code for a while now — I can just ask "what are the last 10 Meraki events?" and get an actual answer from my homelab Splunk instance, no SPL required. It's one of those quality-of-life things that sounds gimmicky until you use it every day.

The gap was Claude Desktop. Same machine, same user, same Splunk — but no MCP connection. This post is about closing that gap, why it's not as simple as copying a config, and how I used Claude's own `/grill-me` skill to design the solution before touching a single file.

---

## The Setup (What Was Already Working)

My Splunk instance runs in the homelab and exposes an MCP endpoint at `https://<SPLUNK_HOST>:8089/services/mcp`. The Splunk MCP add-on is installed, and it speaks JSON-RPC over HTTP — standard MCP protocol.

The catch: it's HTTPS with a self-signed cert. Claude Code's built-in HTTP MCP transport has no way to disable cert verification, so a direct connection fails. The workaround is `mcp-remote` — a small Node.js bridge that acts as a local stdio server and forwards requests to the remote HTTP endpoint, with full control over TLS behaviour via environment variables.

The Claude Code registration looks like this:

```bash
claude mcp add --scope user splunk-mcp-server \
  -e NODE_TLS_REJECT_UNAUTHORIZED=0 \
  -- npx -y mcp-remote@0.1.38 "https://<SPLUNK_HOST>:8089/services/mcp" \
  --header "Authorization: Bearer <YOUR_SPLUNK_TOKEN>"
```

The token comes from `~/.claude/env.sh` — machine-local, gitignored, never committed. The `NODE_TLS_REJECT_UNAUTHORIZED=0` env var tells Node.js to ignore the self-signed cert. Not ideal for production, totally fine for a homelab.

That's been running reliably for months. Claude Code can query Splunk, generate SPL, explain results — the works.

---

## The Problem With Claude Desktop

Claude Desktop uses a completely different config file: `~/Library/Application Support/Claude/claude_desktop_config.json`. It has its own `mcpServers` block, separate from anything Claude Code knows about. They don't share MCP config.

There's also a subtlety that bit me when I first thought about this: **Claude Desktop doesn't source your shell profile**. No `.zshrc`, no `~/.claude/env.sh`. If your token lives in a shell export, it's not available to Desktop's MCP subprocess unless you explicitly pass it.

---

## Designing It First with /grill-me

Before editing anything, I ran `/grill-me` — a Claude Code skill I've built that conducts a structured design interview. One question at a time, one branch at a time, resolving dependencies before moving on.

The interview covered:

1. **Target machine** — same Mac, same user (confirmed; no cross-machine complexity)
2. **Secret management** — three options: hardcode in config, wrapper script, or `env` block in the JSON. Claude read my existing `CLAUDE.md` and `env.sh` before asking, so it already knew the token location and didn't ask about things it could infer.
3. **TLS handling** — straight carry-over from Claude Code: `NODE_TLS_REJECT_UNAUTHORIZED=0` in the `env` block
4. **Sync strategy** — Desktop config stays machine-local, not tracked in the repo or synced via `setup.sh`
5. **Token rotation** — deferred; manual update for now

The output was a "Shared Understanding" doc — decisions locked in, open questions called out, next steps ordered. This is genuinely useful because it surfaces hidden assumptions before they become bugs. For example: "Claude Desktop doesn't source `.zshrc`" is the kind of thing you discover at 11pm when your MCP server silently fails to connect. Getting it on paper first is better.

If you want to use this pattern for your own infrastructure decisions, the `/grill-me` skill is [in my Claude resource repo](https://github.com/andrewkriley/claude). It works for anything — not just MCP config.

---

## The Config

With decisions made, the actual change was small. I edited `~/Library/Application Support/Claude/claude_desktop_config.json` to add an `mcpServers` block:

```json
{
  "mcpServers": {
    "splunk-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@0.1.38",
        "https://<SPLUNK_HOST>:8089/services/mcp",
        "--header",
        "Authorization: Bearer <YOUR_SPLUNK_TOKEN>"
      ],
      "env": {
        "NODE_TLS_REJECT_UNAUTHORIZED": "0"
      }
    }
  },
  "preferences": {
    ...your existing preferences...
  }
}
```

A few things worth noting:

- The `--header` arg and its value are **separate array elements**. Get this wrong and mcp-remote silently ignores the header.
- The `env` block is how you pass environment variables to Desktop MCP subprocesses. This is the equivalent of `-e` in `claude mcp add`.
- The token is hardcoded here. This file is machine-local and not tracked in any repo, so that's an acceptable trade-off for a homelab. If you're paranoid, a wrapper shell script that sources a secrets file works too — but it's more moving parts.
- After editing, **restart Claude Desktop**. It only reads this config at startup.

---

## Troubleshooting

If the tools don't appear after restart, check the logs:

```
~/Library/Logs/Claude/mcp-server-splunk-mcp-server.log
```

Common failure modes:
- **TLS error** — `NODE_TLS_REJECT_UNAUTHORIZED` not set or not reaching the subprocess
- **401 Unauthorized** — token is wrong or expired; regenerate from Splunk Web → Settings → Tokens
- **mcp-remote OAuth loop** — only happens on HTTP 401, meaning your token is bad (not a TLS issue)
- **Tools not listed** — check the log for connection errors; the server may have started but failed to handshake

---

## Validation

Once Claude Desktop restarted with the new config, I asked it: *"What are the last 10 Meraki events in Splunk?"*

It ran a live query against my homelab Splunk and returned a clean table — DHCPv6 renewals on both MX68 security appliances, plus a DHCP lease for one of the family's MacBooks. Routine stuff, but the point is: it worked, first try, no faffing.

---

## What's Not Ideal

A few honest caveats:

- **Self-signed cert bypass** — `NODE_TLS_REJECT_UNAUTHORIZED=0` is a blunt instrument. For a homelab on a trusted private network, it's fine. For anything facing the internet, sort out a real cert.
- **Token rotation is manual** — when the Splunk token expires, you update the JSON by hand. I haven't automated this. It's on the list.
- **Desktop config not synced** — Claude Code config is in the repo and synced via `setup.sh`. Desktop config isn't, which means setting up a new machine requires this step separately. Intentional, but worth knowing.

---

If you've got Splunk in a homelab and Claude Code already working, this is a 10-minute job. The config isn't complex — the main thing to get right is the `env` block and the `--header` arg format.

And if you're making infrastructure decisions and not using a structured design interview first — give `/grill-me` a go. It's changed how I approach even small config changes.
