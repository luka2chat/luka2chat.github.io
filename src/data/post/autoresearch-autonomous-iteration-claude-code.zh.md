---
publishDate: 2026-03-17T00:00:00Z
author: luka2chat
title: "Claude Autoresearch — 设定目标，走开，醒来看结果"
excerpt: 受 Karpathy 的 autoresearch 启发，这个 Claude Code 技能把你的 IDE 变成一台不知疲倦的改进引擎。定义一个指标，启动循环，让 Claude 自主运行 100+ 次实验。几天内 1,000+ star。
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
  canonical: https://luka2chat.com/zh/autoresearch-autonomous-iteration-claude-code
---

如果你能告诉 AI 编程助手「提高这个指标」，几小时后回来发现它已经跑了 100 次实验、保留了赢家、回滚了输家、记录了每一步呢？

这就是 [Claude Autoresearch](https://github.com/uditgoenka/autoresearch) 做的事。由 [Udit Goenka](https://udit.co) 创建，它是一个 Claude Code 技能，把 IDE 变成自主改进引擎——灵感来自 [Karpathy 的 autoresearch](https://github.com/karpathy/autoresearch)，后者证明了一个 630 行的 Python 脚本能在一夜之间跑 100 次 ML 实验。

核心洞察：**你不需要 AGI。你需要一个目标、一个指标、和一个永不停止的循环。**

## 核心循环

概念看似简单，但极其有效：

```
1. 审查当前状态 + git 历史 + 结果日志
2. 选择下一个改动（基于成功/失败/未尝试的记录）
3. 做一个聚焦的改动
4. Git 提交（验证之前）
5. 运行机械验证（测试、基准、分数）
6. 如果改善 → 保留。如果变差 → git revert
7. 记录结果
8. 重复。永远不停（或跑 N 次）
```

每次改善都会累积。每次失败都会自动回滚。Git 就是记忆。进度以 TSV 格式记录，你可以追踪不在时发生的一切。

## 超越 ML：任何有数字的领域

Karpathy 的原版 autoresearch 专注于 ML 模型改进。Claude Autoresearch 把这个原则推广到**任何有可衡量指标的领域**：测试覆盖率、打包体积、API 响应时间、Lighthouse 分数、SEO 排名，甚至销售邮件的转化率。

启动一个循环看起来是这样的：

```
/autoresearch
Goal: Increase test coverage from 72% to 90%
Scope: src/**/*.test.ts, src/**/*.ts
Metric: coverage % (higher is better)
Verify: npm test -- --coverage | grep "All files"
```

就这样。Claude 读取所有文件，建立基线，开始迭代。每次一个原子改动。你可以走开了。

## 8 个命令覆盖不同工作流

Autoresearch 已经从基础循环进化为完整的工具集：

| 命令 | 做什么 |
|------|--------|
| `/autoresearch` | 核心自主改进循环 |
| `/autoresearch:plan` | 交互式向导，把你的目标转化为验证过的配置 |
| `/autoresearch:security` | STRIDE + OWASP + 红队安全审计（只读） |
| `/autoresearch:ship` | 通用发布——代码 PR、部署、博客文章，甚至销售材料 |
| `/autoresearch:debug` | 科学方法猎虫——可证伪假设、7 种调查技术 |
| `/autoresearch:fix` | 自主错误修复——迭代修复直到零错误 |
| `/autoresearch:scenario` | 12 个维度的场景探索（边界情况、滥用、规模、并发...） |
| `Guard: <cmd>` | 安全网，在优化时防止回归 |

## 8 条关键规则

这些规则定义了循环可靠运行的基础：

1. **循环到底** — 无界模式永远运行；有界模式跑 N 次后总结
2. **先读后写** — 修改之前充分理解完整上下文
3. **每次一个改动** — 原子性变更；如果出错，你确切知道是哪里
4. **只用机械验证** — 不要主观的「看起来不错」；用数字或通过/失败
5. **自动回滚** — 失败的改动立即回滚
6. **简单优先** — 同样的结果但代码更少 = 保留更简单的版本
7. **Git 就是记忆** — 实验以 `experiment:` 前缀提交，历史完整保留
8. **卡住时更用力思考** — 重新阅读，组合接近成功的尝试，试激进的改动

## 不碰代码的安全审计

`/autoresearch:security` 特别有意思。它运行只读安全审计，使用 STRIDE 威胁建模、OWASP Top 10 扫描，以及 4 个恶意角色的红队对抗分析。

每个发现都需要**代码证据**——文件路径、行号和具体的攻击场景。没有理论空话。输出到 `security/{date}-{slug}/`，包含 7 个结构化报告文件。

加 `--fix` 自动修复确认的严重/高危发现。加 `--fail-on <严重级别>` 用于 CI/CD 门控。

## Guard 系统：优化不破坏

当你在优化一个指标时，可能会意外破坏别的东西。Guard 系统解决了这个问题：

```
/autoresearch
Goal: Reduce API response time to under 100ms
Verify: npm run bench:api | grep "p95"
Guard: npm test
```

**Verify** 回答「指标改善了吗？」**Guard** 回答「别的东西坏了吗？」如果指标改善但 Guard 失败，Claude 会重新优化（最多 2 次尝试）。Guard 和测试文件永远不会被修改。

## Debug → Fix 链式工作流

debug 和 fix 命令可以串联，形成强大的自动化工作流：

```
/autoresearch:debug --fix
Scope: src/api/**/*.ts
Symptom: API returns 500 on POST /users
Iterations: 20
```

Debug 用科学方法猎虫——可证伪假设、基于证据的调查、7 种技术（二分搜索、差分调试、最小复现、跟踪执行、模式搜索、反向推导、橡皮鸭）。然后 Fix 接手，迭代修复每个问题直到零错误。

## 场景驱动的探索

1.6.0 版本引入了 `/autoresearch:scenario`，它取一个种子场景，在 12 个维度上探索：正常路径、错误、边界情况、滥用、规模、并发、时序、数据变体、权限、集成、恢复和状态转换。

```
/autoresearch:scenario
Scenario: User attempts to checkout with multiple payment methods
Iterations: 25
```

生成的是真实的测试场景，不是泛泛的清单。可以和 `/autoresearch:debug` 串联来猎虫，或和 `/autoresearch:security` 串联来审计发现的威胁场景。

## 安装

**插件安装（推荐）：**

```bash
/plugin marketplace add uditgoenka/autoresearch
/plugin install autoresearch@autoresearch
```

**手动安装：**

```bash
git clone https://github.com/uditgoenka/autoresearch.git
cp -r autoresearch/skills/autoresearch .claude/skills/autoresearch
cp -r autoresearch/commands/autoresearch .claude/commands/autoresearch
```

没有构建步骤。没有依赖。就是 Markdown 技能和命令，Claude Code 直接读取。

## 为什么这很重要

大多数 AI 编程工作流都是对话式的——你提示，AI 回应，你评估，你再提示。每一步都有人类瓶颈。

Claude Autoresearch 把人类从机械部分的循环中移除。你定义目标和指标。Claude 处理迭代、验证、回滚和日志。你负责策略。

这和 Karpathy 原始工作背后的洞察一样，只是被推广了：**当你约束范围、明确成功标准、机械化验证，让智能体优化战术而人类优化战略时，自主性才能规模化。**

1,000+ star。16 个版本。MIT 许可证。查看 GitHub 上的 [autoresearch 仓库](https://github.com/uditgoenka/autoresearch)。
