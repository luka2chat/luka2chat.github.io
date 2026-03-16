---
publishDate: 2026-03-16T00:00:00Z
author: luka2chat
title: "gstack — Turn Claude Code into a Team of Specialists You Summon on Demand"
excerpt: Garry Tan open-sourced gstack, a toolkit that splits Claude Code into 9 distinct workflow modes — founder planning, engineering review, automated shipping, browser QA, and more. 16k stars in 5 days.
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
category: AI & Technology
tags:
  - claude code
  - gstack
  - garry tan
  - ai coding
  - developer tools
  - open source
  - qa automation
metadata:
  canonical: https://luka2chat.com/gstack-claude-code-workflow-toolkit
---

Claude Code is powerful, but it has a fundamental problem: it operates in one mushy generic mode. Whether you're brainstorming product direction, reviewing code for production bugs, or trying to ship a PR — it's all the same assistant, with the same depth, the same tone, the same lack of structure.

[gstack](https://github.com/garrytan/gstack) fixes this. Created by [Garry Tan](https://x.com/garrytan), President & CEO of Y Combinator, gstack gives Claude Code **explicit gears** — 9 opinionated workflow skills, each tuned for a specific role in the software delivery process.

16,000+ stars in 5 days. MIT licensed. Let's dig in.

## The Core Idea: Cognitive Modes, Not Prompts

The insight behind gstack is simple but powerful: **planning is not review. Review is not shipping. Founder taste is not engineering rigor.** If you blur them all together, you get a mediocre blend of everything.

gstack separates these concerns into explicit operating modes you switch between using slash commands:

| Skill | Role | What it does |
|-------|------|--------------|
| `/plan-ceo-review` | Founder / CEO | Rethink the problem. Find the 10-star product hiding inside the request. |
| `/plan-eng-review` | Eng manager | Lock in architecture, data flow, diagrams, edge cases, and tests. |
| `/review` | Paranoid staff engineer | Find the bugs that pass CI but blow up in production. |
| `/ship` | Release engineer | Sync main, run tests, push, open PR. No more talking. |
| `/browse` | QA engineer | Give the agent eyes — log in, click through your app, take screenshots. |
| `/qa` | QA + fix engineer | Test app, find bugs, fix them, re-verify. Health scores and ship-readiness. |
| `/qa-only` | QA reporter | Report-only QA without code changes. |
| `/setup-browser-cookies` | Session manager | Import real browser cookies into the headless session. |
| `/retro` | Engineering manager | Data-driven retrospectives with per-person praise and growth areas. |

## How a Feature Flows Through gstack

Here's how Garry uses these modes together — one feature, five gears:

**Step 1: Product thinking** — You describe the feature, then run `/plan-ceo-review`. Instead of implementing your request literally, Claude challenges the premise. "Photo upload" becomes "help sellers create listings that actually sell" — with auto-identification, spec lookup, price comparisons, and smart image selection.

**Step 2: Engineering spec** — `/plan-eng-review` takes the refined vision and produces architecture diagrams, state machines, async job boundaries, failure modes, and a test matrix. Diagrams force hidden assumptions into the open.

**Step 3: Paranoid review** — `/review` hunts for the bugs that pass CI: N+1 queries, race conditions, trust boundary violations, orphaned files, prompt injection vectors from external data.

**Step 4: Ship it** — `/ship` syncs with main, runs tests, resolves review comments, pushes the branch, and opens the PR. Six tool calls, done.

**Step 5: Automated QA** — `/qa` reads the git diff, identifies affected routes, spins up the browser, and tests each page. Before/after health scores, screenshots saved to `.gstack/qa-reports/`.

## The Persistent Browser: The Real Technical Breakthrough

The most interesting part of gstack isn't the Markdown skills — it's the browser subsystem.

Most agent tools treat browser automation as a separate debugging step. gstack makes it a core part of the workflow. It runs a **persistent headless Chromium daemon** over localhost HTTP. Cold start costs ~3-5 seconds; subsequent calls run in ~100-200ms. Cookies, tabs, localStorage, and login state persist across commands.

This means `/browse` and `/qa` can do real end-to-end testing: sign up a user, navigate every changed page, take screenshots, read them, check the console for errors, and verify the API — all in about 60 seconds.

The browser auto-shuts down after 30 minutes of idle time. Built on [Playwright](https://playwright.dev/), compiled as a native binary via Bun.

## Greptile Integration: Two-Layer Code Review

gstack also integrates with [Greptile](https://greptile.com), an automated PR reviewer. The problem with any automated reviewer is triage — not every comment is a real issue, and without a triage layer, comments pile up and get ignored.

`/review` and `/ship` are Greptile-aware. They read Greptile's comments, classify each one as **valid** (gets fixed), **already-fixed** (auto-reply), or **false positive** (pushback with explanation). False positives are saved to `~/.gstack/greptile-history.md` so future runs auto-skip known patterns.

## Why Bun, Not Node

gstack uses Bun for four practical reasons: compiled binaries (no separate runtime for users), native SQLite access (reads Chromium's cookie database directly), native TypeScript execution, and a built-in HTTP server via `Bun.serve()`. These aren't aesthetic choices — they're what let gstack install cleanly inside `~/.claude/skills/` without users managing a toolchain.

## Installation

Requirements: Claude Code, Git, Bun v1.0+.

Open Claude Code and paste this:

```
Install gstack: run `git clone https://github.com/garrytan/gstack.git
~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`
```

Claude handles the rest. For team setups, copy into `.claude/skills/gstack` in your repo so teammates get the same workflows via `git clone`.

Everything lives inside `.claude/`. Nothing touches your PATH or runs in the background.

## Why This Matters

gstack represents a shift in how we think about AI coding assistants. Instead of one generic mode that does everything at medium depth, we get **explicit role boundaries** — the same way real engineering teams separate product thinking, technical design, code review, release engineering, and QA.

The fact that it's all Markdown skills, MIT licensed, and installs in one command makes it immediately useful. But the bigger idea is worth paying attention to: **the future of AI coding isn't a smarter model — it's better operating modes for the models we already have.**

16k stars in 5 days. Built by the CEO of YC. This is how serious builders are using Claude Code.

Check out the [gstack repository](https://github.com/garrytan/gstack) on GitHub.
