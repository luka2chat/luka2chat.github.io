---
publishDate: 2026-03-10T00:00:00Z
author: luka2chat
title: "Claude Knowledge Work Plugins — Turn Claude into a Specialist for Every Role"
excerpt: Anthropic just open-sourced 11 plugins that turn Claude into a domain expert for sales, marketing, legal, finance, data, and more. Here's how they work and why they matter.
image: https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80
category: AI & Technology
tags:
  - claude
  - anthropic
  - ai plugins
  - cowork
  - productivity
  - open source
metadata:
  canonical: https://luka2chat.com/claude-knowledge-work-plugins
---

Most people use Claude the same way — paste in some text, ask a question, get an answer. But what if Claude already knew your company's processes, had access to your tools, and understood the nuances of your specific role?

That's exactly what [Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins) deliver. Anthropic just open-sourced 11 plugins that transform Claude from a general-purpose assistant into a role-specific specialist — for sales, marketing, legal, finance, data, engineering, and more.

## What Are Knowledge Work Plugins?

Each plugin is a bundle of **skills**, **slash commands**, and **connectors** designed for a specific job function. Think of them as pre-built "brains" that encode domain expertise, best practices, and step-by-step workflows.

The key insight: plugins are just markdown and JSON files. No code, no infrastructure, no build steps. You can read every instruction Claude follows, edit them, and make them your own.

They work with both **Claude Cowork** (the web-based collaborative product) and **Claude Code** (the terminal-based coding agent).

## The 11 Plugins

Here's what's available out of the box:

| Plugin | What it does |
|--------|-------------|
| **Productivity** | Manages tasks, calendars, and daily workflows across Slack, Notion, Asana, Linear, and more |
| **Sales** | Researches prospects, preps for calls, reviews pipelines, drafts outreach, builds battlecards |
| **Customer Support** | Triages tickets, drafts responses, packages escalations, creates knowledge base articles |
| **Product Management** | Writes specs, plans roadmaps, synthesizes user research, tracks competitive landscape |
| **Marketing** | Drafts content, plans campaigns, enforces brand voice, reports on channel performance |
| **Legal** | Reviews contracts, triages NDAs, navigates compliance, assesses risk |
| **Finance** | Preps journal entries, reconciles accounts, generates financial statements, supports audits |
| **Data** | Writes SQL, runs statistical analysis, builds dashboards, validates results |
| **Enterprise Search** | Searches across email, chat, docs, and wikis — one query across all your tools |
| **Bio Research** | Connects to PubMed, bioRxiv, ClinicalTrials.gov and more for life sciences R&D |
| **Plugin Management** | Creates new plugins or customizes existing ones |

Each plugin connects to the tools your role depends on — CRMs, project trackers, data warehouses, design tools — via [MCP servers](https://modelcontextprotocol.io/).

## How They Work

Every plugin follows the same file structure:

```
plugin-name/
├── .claude-plugin/plugin.json   # Manifest
├── .mcp.json                    # Tool connections
├── commands/                    # Slash commands (/sales:call-prep)
└── skills/                      # Domain knowledge Claude draws on
```

**Skills** fire automatically when relevant — Claude reads them and applies the domain expertise without you having to prompt for it. **Commands** are explicit actions you trigger, like `/finance:reconciliation` or `/product-management:write-spec`. **Connectors** wire Claude to external tools via MCP.

## Getting Started

### In Claude Cowork

Head to [claude.com/plugins](https://claude.com/plugins/) and install directly.

### In Claude Code

```bash
claude plugin marketplace add anthropics/knowledge-work-plugins
claude plugin install sales@knowledge-work-plugins
```

Once installed, skills activate automatically and slash commands are available in your session.

## Why This Matters for Indie Makers

You might think "enterprise plugins" aren't relevant if you're a solo maker or a small team. I'd argue the opposite:

1. **Learn from Anthropic's prompt engineering.** These plugins are essentially Anthropic's best practices for structuring Claude's behavior — encoded in readable markdown. Study how they write skills and you'll write better prompts everywhere.

2. **The plugin structure is reusable.** The same pattern — skills + commands + connectors — works for any domain. You could build a GEO plugin, a content marketing plugin, or a code review plugin using the same architecture.

3. **MCP integrations are gold.** The `.mcp.json` files show exactly how to wire Claude to real tools. If you've been wanting to connect Claude to your own APIs or databases, these are working examples to learn from.

4. **Fork and customize.** That's the whole point. These are generic starting points — swap connectors to your tool stack, add your terminology and processes, and you have a custom AI specialist that works like it was built for you.

## The Bigger Picture

Knowledge Work Plugins represent a shift in how we think about AI assistants. Instead of one general-purpose model that needs to be prompted from scratch every time, we're moving toward **pre-configured specialists** that carry persistent context, connect to real tools, and follow established workflows.

The fact that it's all open source and file-based — no SDKs, no APIs to learn, just markdown — makes this accessible to anyone who can edit a text file.

Whether you use Claude Cowork, Claude Code, or just want to learn how Anthropic thinks about structuring AI workflows, the [knowledge-work-plugins repo](https://github.com/anthropics/knowledge-work-plugins) is worth a deep read.

9.2k stars and growing. This is the future of how we'll work with AI.
