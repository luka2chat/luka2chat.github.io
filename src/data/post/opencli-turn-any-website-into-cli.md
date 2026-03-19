---
publishDate: 2026-03-19T00:00:00Z
author: luka2chat
title: "OpenCLI — Turn Any Website or Electron App into a Command-Line Interface"
excerpt: OpenCLI lets you control Twitter, Reddit, Bilibili, Notion, Cursor, ChatGPT and 25+ other platforms from your terminal. Reuses your Chrome login. AI-powered adapter generation. 2.3k stars.
image: https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80
category: AI & Technology
tags:
  - cli tools
  - browser automation
  - developer tools
  - open source
  - ai agents
  - web scraping
metadata:
  canonical: https://luka2chat.com/opencli-turn-any-website-into-cli
---

What if you could do this from your terminal:

```bash
opencli twitter trending --limit 10
opencli bilibili hot -f json
opencli zhihu hot -f yaml
opencli cursor send "refactor the auth module"
```

No API keys. No scraping frameworks. No reverse engineering. Just your browser's existing login session, exposed as clean CLI commands.

That's [OpenCLI](https://github.com/jackwener/opencli). It turns **any website or Electron app** into a command-line interface — and it already supports 25+ platforms out of the box.

## How It Works

OpenCLI connects to your running Chrome browser through a lightweight Browser Bridge extension + micro-daemon. When you run a command like `opencli twitter trending`, it:

1. Reuses your Chrome session — you're already logged in to Twitter, so OpenCLI just reads the page
2. Extracts structured data using either YAML declarative pipelines or TypeScript browser injections
3. Outputs the result in your choice of format: `table`, `json`, `yaml`, `md`, or `csv`

Your credentials never leave the browser. There's no token exchange, no OAuth dance, no API key management. If you can see it in Chrome, OpenCLI can extract it.

## 25+ Built-in Platforms

The command registry is extensive:

| Platform | What you can do | Mode |
|----------|----------------|------|
| **Twitter/X** | Trending, bookmarks, search, timeline, post, reply, follow, DM, download media | Browser |
| **Reddit** | Hot, frontpage, search, subreddit, read, upvote, save, comment | Browser |
| **Cursor** | Send prompts, read responses, extract code, switch models, export history | Desktop |
| **Bilibili** | Hot, search, favorites, history, subtitles, ranking, download | Browser |
| **Codex** | Send prompts, read responses, extract diffs, switch models | Desktop |
| **Notion** | Search, read, write, sidebar, favorites, export | Desktop |
| **Discord** | Send, read, channels, servers, search, members | Desktop |
| **ChatGPT** | New chat, send, read, ask | Desktop |
| **Xiaohongshu** | Search, feed, user profiles, download images/videos | Browser |
| **Zhihu** | Hot topics, search, questions, download articles | Browser |
| **YouTube** | Search, video info, transcripts | Browser |
| **Xueqiu** | Stock feed, hot stocks, watchlist | Browser |
| **LinkedIn** | Search | Browser |
| **HackerNews** | Top stories | Public API |
| **BBC** | News | Public API |

Plus V2EX, Weibo, Boss Zhipin, Coupang, Ctrip, Apple Podcasts, Xiaoyuzhou, Yahoo Finance, SMZDM, Reuters, and GitHub search.

## The Electron Breakthrough

The latest update adds support for **Electron apps** — not just websites. This means you can CLI-ify desktop applications like Cursor, Codex, ChatGPT, Notion, Discord, and Antigravity.

```bash
opencli cursor send "explain this function"
opencli cursor extract-code
opencli notion search "meeting notes"
opencli chatgpt ask "summarize this PDF"
```

This is particularly powerful for AI agents. An agent can now programmatically interact with Cursor, Codex, or ChatGPT through the command line — AI controlling AI tools natively.

## AI-Powered Adapter Generation

Don't see your favorite site? OpenCLI can generate adapters automatically:

```bash
# Explore a site — discover APIs, auth strategies, capabilities
opencli explore https://example.com --site mysite

# Generate adapters from exploration results
opencli synthesize mysite

# Or one-shot: explore + synthesize + register
opencli generate https://example.com --goal "hot"

# Auto-detect auth strategy: PUBLIC → COOKIE → HEADER
opencli cascade https://api.example.com/data
```

The `explore` command maps out a site's API endpoints, authentication methods, and data structures. `synthesize` turns that map into working YAML or TypeScript adapters. Drop them in the `clis/` folder and they auto-register.

## Dual-Engine Architecture

OpenCLI supports two adapter types:

**YAML declarative pipelines** — for straightforward data extraction. Define a fetch URL, CSS selectors or JSON paths, and output mapping. No code needed.

**TypeScript browser injections** — for complex interactions that need real browser context. Full access to the DOM, JavaScript execution, and page state.

Both engines support the same output formats and can be mixed within the same site adapter.

## Download Support

OpenCLI can download media from supported platforms:

```bash
# Xiaohongshu images and videos
opencli xiaohongshu download --note-id abc123 --output ./xhs

# Bilibili video (requires yt-dlp)
opencli bilibili download --bvid BV1xxx --quality 1080p

# Twitter media
opencli twitter download --username elonmusk --limit 20

# Zhihu articles as Markdown with images
opencli zhihu download --url "https://zhuanlan.zhihu.com/p/xxx" --download-images
```

## Self-Healing Setup

```bash
opencli setup      # Auto-discover tokens and configure
opencli doctor     # Diagnose config across 10+ tools
opencli doctor --fix  # Auto-repair issues
```

The `doctor` command checks extension connectivity, daemon status, and live browser command execution. `--fix` repairs whatever it can automatically.

## Why This Matters

OpenCLI solves a real problem: most websites and apps lock their data behind GUIs. APIs are rate-limited, paywalled, or don't exist. Scraping breaks constantly. OAuth is a bureaucratic maze.

OpenCLI sidesteps all of that by reusing what you already have — a browser with active sessions. It's account-safe (credentials never leave Chrome), maintenance-light (adapters work as long as the site's HTML doesn't change drastically), and extensible (AI can generate new adapters on the fly).

For AI agent builders, this is particularly exciting. OpenCLI gives agents a structured way to interact with any website — reading data, posting content, downloading media — without building custom integrations for each platform.

2.3k stars. 38 releases. Apache-2.0 licensed.

Check out the [OpenCLI repository](https://github.com/jackwener/opencli) on GitHub.
