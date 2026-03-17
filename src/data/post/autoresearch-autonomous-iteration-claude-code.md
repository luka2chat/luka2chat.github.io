---
publishDate: 2026-03-17T00:00:00Z
author: luka2chat
title: "Claude Autoresearch — Set a Goal, Walk Away, Wake Up to Results"
excerpt: Inspired by Karpathy's autoresearch, this Claude Code skill turns your IDE into a relentless improvement engine. Define a metric, start the loop, and let Claude run 100+ experiments autonomously. 1,000+ stars in days.
image: https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80
category: AI & Technology
tags:
  - claude code
  - autoresearch
  - autonomous agents
  - developer tools
  - open source
  - karpathy
metadata:
  canonical: https://luka2chat.com/autoresearch-autonomous-iteration-claude-code
---

What if you could tell your AI coding assistant "improve this metric" and come back hours later to find it has run 100 experiments, kept the winners, reverted the losers, and logged every step?

That's exactly what [Claude Autoresearch](https://github.com/uditgoenka/autoresearch) does. Created by [Udit Goenka](https://udit.co), it's a Claude Code skill that turns the IDE into an autonomous improvement engine — inspired by [Karpathy's autoresearch](https://github.com/karpathy/autoresearch), which showed that a 630-line Python script could run 100 ML experiments overnight.

The key insight: **you don't need AGI. You need a goal, a metric, and a loop that never quits.**

## The Core Loop

The concept is deceptively simple:

```
1. Review current state + git history + results log
2. Pick the next change (based on what worked/failed/untried)
3. Make ONE focused change
4. Git commit (before verification)
5. Run mechanical verification (tests, benchmarks, scores)
6. If improved → keep. If worse → git revert.
7. Log the result
8. Repeat forever (or N times)
```

Every improvement stacks. Every failure auto-reverts. Git is memory. Progress is logged in TSV format so you can track exactly what happened while you were away.

## Beyond ML: Any Domain With a Number

Karpathy's original autoresearch was focused on ML model improvement. Claude Autoresearch generalizes this to **any domain with a measurable metric**: test coverage, bundle size, API response time, Lighthouse scores, SEO rankings, even sales email conversion rates.

Here's what starting a loop looks like:

```
/autoresearch
Goal: Increase test coverage from 72% to 90%
Scope: src/**/*.test.ts, src/**/*.ts
Metric: coverage % (higher is better)
Verify: npm test -- --coverage | grep "All files"
```

That's it. Claude reads all files, establishes a baseline, and starts iterating. One atomic change at a time. You walk away.

## 8 Commands for Different Workflows

Autoresearch has evolved far beyond the basic loop into a full toolkit:

| Command | What it does |
|---------|--------------|
| `/autoresearch` | The core autonomous improvement loop |
| `/autoresearch:plan` | Interactive wizard that converts your goal into a validated config |
| `/autoresearch:security` | STRIDE + OWASP + red-team security audit (read-only) |
| `/autoresearch:ship` | Universal shipping — code PRs, deployments, blog posts, even sales decks |
| `/autoresearch:debug` | Scientific bug hunting — falsifiable hypotheses, 7 investigation techniques |
| `/autoresearch:fix` | Autonomous error crusher — iteratively repairs until zero errors remain |
| `/autoresearch:scenario` | Scenario explorer across 12 dimensions (edge cases, abuse, scale, concurrency...) |
| `Guard: <cmd>` | Safety net that prevents regressions while optimizing |

## The 8 Critical Rules

These rules define what makes the loop work reliably:

1. **Loop until done** — unbounded runs forever; bounded runs N times then summarizes
2. **Read before write** — understand full context before modifying anything
3. **One change per iteration** — atomic changes; if it breaks, you know exactly why
4. **Mechanical verification only** — no subjective "looks good"; numbers or pass/fail
5. **Automatic rollback** — failed changes revert instantly
6. **Simplicity wins** — equal results with less code = keep the simpler version
7. **Git is memory** — experiments committed with `experiment:` prefix, history preserved
8. **When stuck, think harder** — re-read, combine near-misses, try radical changes

## Security Auditing Without Touching Code

`/autoresearch:security` is particularly interesting. It runs a read-only security audit using STRIDE threat modeling, OWASP Top 10 analysis, and red-team adversarial testing with 4 hostile personas.

Every finding requires **code evidence** — file path, line number, and a concrete attack scenario. No theoretical hand-waving. Output goes to `security/{date}-{slug}/` with 7 structured report files.

Add `--fix` to auto-remediate confirmed Critical/High findings. Add `--fail-on <severity>` for CI/CD gating.

## The Guard System: Optimize Without Breaking

When you're optimizing one metric, you might accidentally break something else. The Guard system solves this:

```
/autoresearch
Goal: Reduce API response time to under 100ms
Verify: npm run bench:api | grep "p95"
Guard: npm test
```

**Verify** answers "did the metric improve?" **Guard** answers "did anything else break?" If the metric improves but the guard fails, Claude reworks the optimization (up to 2 attempts). Guard/test files are never modified.

## Debug → Fix Chain

The debug and fix commands can be chained for a powerful automated workflow:

```
/autoresearch:debug --fix
Scope: src/api/**/*.ts
Symptom: API returns 500 on POST /users
Iterations: 20
```

Debug hunts bugs using the scientific method — falsifiable hypotheses, evidence-based investigation, 7 techniques (binary search, differential debugging, minimal reproduction, trace execution, pattern search, working backwards, rubber duck). Then fix takes over and iteratively repairs each issue until zero errors remain.

## Scenario-Driven Exploration

Version 1.6.0 introduced `/autoresearch:scenario`, which takes a seed scenario and explores it across 12 dimensions: happy paths, errors, edge cases, abuse, scale, concurrency, temporal, data variation, permissions, integrations, recovery, and state transitions.

```
/autoresearch:scenario
Scenario: User attempts to checkout with multiple payment methods
Iterations: 25
```

This generates real test scenarios, not generic checklists. Chain it with `/autoresearch:debug` to hunt bugs in discovered edge cases, or `/autoresearch:security` to audit discovered threat scenarios.

## Installation

**Plugin install (recommended):**

```bash
/plugin marketplace add uditgoenka/autoresearch
/plugin install autoresearch@autoresearch
```

**Manual install:**

```bash
git clone https://github.com/uditgoenka/autoresearch.git
cp -r autoresearch/skills/autoresearch .claude/skills/autoresearch
cp -r autoresearch/commands/autoresearch .claude/commands/autoresearch
```

No build steps. No dependencies. Just Markdown skills and commands that Claude Code reads directly.

## Why This Matters

Most AI coding workflows are conversational — you prompt, the AI responds, you evaluate, you prompt again. It's a human bottleneck at every step.

Claude Autoresearch removes the human from the loop for the mechanical parts. You define the goal and the metric. Claude handles the iteration, verification, rollback, and logging. You handle the strategy.

This is the same insight behind Karpathy's original work, generalized: **autonomy scales when you constrain scope, clarify success, mechanize verification, and let agents optimize tactics while humans optimize strategy.**

1,000+ stars. 16 releases. MIT licensed. Check out the [autoresearch repository](https://github.com/uditgoenka/autoresearch) on GitHub.
