---
publishDate: 2026-03-21T00:00:00Z
author: luka2chat
title: "45 Claude Code Tips — ykdojo's Field Notes for Power Users"
excerpt: From aliases and voice input to system prompt patching and containerized Claude, ykdojo compiled everything he learned using Claude Code daily into 45 tips. Comes with a dx plugin you can install in two commands.
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
category: AI & Technology
tags:
  - claude code
  - anthropic
  - developer productivity
  - open source
  - agentic coding
  - tips
metadata:
  canonical: https://luka2chat.com/claude-code-tips-ykdojo
---

I keep having this nagging feeling with Claude Code — like I'm only using 30% of what it can do, but I can't tell where the other 70% is hiding.

[ykdojo](https://github.com/ykdojo) clearly had the same itch. His [claude-code-tips](https://github.com/ykdojo/claude-code-tips) repo compiles 45 tips into one very long README, drawn from daily Claude Code use. 6.5k stars, 400+ forks. This isn't a listicle — it has real terminal output, working scripts, patch files, and a plugin you can actually `claude plugin install`.

## What's in the repo

Beyond the README itself:

- `scripts/` — custom status line, conversation cloning, context usage checks, one-shot setup
- `skills/` and `.claude/commands/` — ready to copy into your own projects
- `system-prompt/` — patches for the CLI bundle that cut system prompt + tool description overhead roughly in half (author measured ~19k down to ~9k tokens)
- dx plugin — bundles the above into an installable package

## The parts I found most interesting

### Context as a scarce resource

ykdojo treats context like memory on a constrained device. He disables auto-compact and manages it manually. When a conversation is getting long, instead of running `/compact`, he asks Claude to write a HANDOFF.md — what's been tried, what worked, what didn't — then starts a fresh session with just that file.

Even wilder: "half-clone" keeps only the back half of a long conversation and throws away the front. He wrote a hook that triggers automatically when context hits 85%.

### Slimming the system prompt

Every Claude Code session starts with ~19k tokens of system prompt and tool descriptions — roughly 10% of your 200k window, gone before you type anything. ykdojo wrote patch scripts that modify the minified CLI bundle to strip redundant examples and verbose text from tool descriptions. The README shows `/context` before and after — patched sessions start at about 5%.

A simpler win that's easy to miss: set `ENABLE_TOOL_SEARCH: true` in `settings.json` so MCP tool definitions load on demand instead of getting stuffed into every session upfront.

### Running Claude in a container

Tip 21 is about spinning up Claude Code with `--dangerously-skip-permissions` inside Docker. The obvious benefit: if it breaks something, it's contained. But ykdojo takes it further — using the local Claude to send commands to the containerized Claude via tmux. Local Claude acts as the "manager," container Claude does the risky work.

Sounds over-engineered until you have a task that needs to run for an hour unsupervised and might delete things along the way. Then it makes a lot of sense.

### Engineering skills still matter

A recurring theme: knowing Claude Code doesn't replace knowing software engineering. Breaking big problems into smaller ones, writing tests (especially TDD), using Git worktrees for parallel branches, running `git bisect` with tmux to find regressions — these traditional techniques get more leverage with an AI agent, not less.

### Built-in features people skip

The first few tips cover slash commands that many users never try: `/usage` for rate limits, `/stats` for an activity heatmap, `/copy` to grab the last response as markdown. Setting up aliases sounds trivial — `c` for `claude`, `ch` for `claude --chrome` — but the keystrokes add up over a day.

### Gemini CLI as a fallback

Claude Code's WebFetch can't reach Reddit and some other sites. ykdojo wrote a skill that automatically falls back to Gemini CLI via tmux when Claude gets blocked. It's slow, but it works. The skill is included in the dx plugin.

## The dx plugin

Two commands to install:

```bash
claude plugin marketplace add ykdojo/claude-code-tips
claude plugin install dx@ykdojo
```

This gives you `/dx:gha` for investigating GitHub Actions failures, `/dx:handoff` for context handoff docs, `/dx:clone` and `/dx:half-clone` for session management, plus skills for Reddit fetching and CLAUDE.md review.

## One-shot setup

The repo includes an interactive setup script that can configure dx, cc-safe (a CLI for auditing dangerous approved commands), the status line, MCP lazy loading, aliases, and more — with the option to skip any item:

```bash
bash <(curl -s https://raw.githubusercontent.com/ykdojo/claude-code-tips/main/scripts/setup.sh)
```

Read what it's going to change in `~/.claude` before running it on a machine you care about.

## How to use this

You don't need to read all 45 tips in one sitting. Skim the table of contents, pick two or three that match whatever is frustrating you right now — maybe aliases, maybe context management, maybe the dx plugin — and try them. Come back when you hit the next wall.

Repo: [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips)
