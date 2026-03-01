---
title: Improving the Claude New Post Skill with a Dev Branch Workflow
description: How I updated my Claude Code skill for creating Hugo blog posts to commit to a dev branch first, validate the live URL, and confirm before merging to main.
date: 2026-03-02T08:00:00+11:00
tags:
    - claude
    - hugo
    - automation
    - git
categories:
    - technology
---

## Background

I've been using a custom [Claude Code](https://claude.ai/claude-code) skill to streamline writing new blog posts. The skill reads recent git history, drafts a Hugo post from the session context, and drops it into the `content/post/` directory. It worked well enough, but the original workflow had a gap: the post went straight to main with no preview step.

I wanted a safer pipeline — commit to `dev`, verify the post is actually live at the dev URL, then decide whether to merge to main.

## What Changed

### 1. Commit to `dev` first

The skill now checks out the `dev` branch (creating it from `main` if it doesn't exist), stages the new post directory, commits it, and pushes to the remote:

```bash
git checkout dev 2>/dev/null || git checkout -b dev origin/main 2>/dev/null || git checkout -b dev
git add content/post/<year>/<slug>/
git commit -m "Add post: <title>"
git push -u origin dev
```

This keeps `main` clean until the post has been reviewed.

### 2. Validate the dev URL

After pushing, the skill uses `WebFetch` to hit the expected post URL on the dev site:

```
https://dev.andrewriley.info/post/<year>/<slug>/
```

If the page is found and contains the post content, it confirms the build succeeded. If it returns a 404 (the build is still running), it warns me and moves on rather than blocking.

### 3. Ask before merging to main

The skill then uses `AskUserQuestion` to present two options — merge to `main` now, or leave it on `dev` for later. If I confirm, it runs:

```bash
git checkout main
git merge dev --no-ff -m "Merge post: <title> from dev"
git push origin main
```

This gives me a clear decision point with no accidental publishes.

### 4. Year-based post organisation

While I was in the skill, I also fixed a hardcoded `2025` in the file path. Posts are now placed under a folder matching the current year from the system date context:

```
content/post/<year>/<slug>/index.md
```

So posts created in 2026 go into `content/post/2026/`, 2027 into `content/post/2027/`, and so on — no manual updating required.

## The Skill File

The skill lives at `~/.claude/skills/new-post-andrewriley-info/SKILL.md` and is invoked automatically when I say something like "write a post about what we did" or "blog about this session."

The full workflow is now:

1. Read recent git context and understand the session
2. Pick a slug and title
3. Create `content/post/<year>/<slug>/index.md` with YAML front matter
4. Write the post body in a practical, first-person style
5. Commit to `dev` and push
6. Validate the post URL on `dev.andrewriley.info`
7. Ask to confirm merge into `main`

## Result

The flow now feels like a proper deployment pipeline rather than a direct commit to production. The validation step is particularly useful — it catches build issues (missing front matter fields, bad formatting) before the post goes live on the main site.
