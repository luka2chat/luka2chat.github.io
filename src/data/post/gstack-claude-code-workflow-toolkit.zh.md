---
publishDate: 2026-03-16T00:00:00Z
author: luka2chat
title: "gstack — 把 Claude Code 变成一支随时召唤的专家团队"
excerpt: Y Combinator CEO Garry Tan 开源了 gstack，把 Claude Code 拆分成 9 种专属工作模式——创始人规划、工程评审、自动发布、浏览器 QA 等。5 天 16k star。
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
  canonical: https://luka2chat.com/zh/gstack-claude-code-workflow-toolkit
---

Claude Code 很强，但有一个根本问题：它只有一种模糊的通用模式。不管你是在脑暴产品方向、审查生产级 bug、还是想推一个 PR——它都是同一个助手，同样的深度，同样的语气，同样缺乏结构。

[gstack](https://github.com/garrytan/gstack) 解决了这个问题。它由 [Garry Tan](https://x.com/garrytan)（Y Combinator 总裁兼 CEO）创建，给 Claude Code 装上了**明确的档位**——9 个有态度的工作流技能，每个针对软件交付过程中的一个特定角色。

5 天超 16,000 star。MIT 许可证。来看看它到底做了什么。

## 核心理念：认知模式，不是提示词

gstack 背后的洞察简单但有力：**规划不是评审，评审不是发布，创始人品味不是工程严谨。** 如果把这些全混在一起，你只会得到四不像的平庸结果。

gstack 把这些关注点拆分成明确的操作模式，通过斜杠命令切换：

| 技能 | 角色 | 做什么 |
|------|------|--------|
| `/plan-ceo-review` | 创始人 / CEO | 重新思考问题，找到需求背后隐藏的「10 星产品」 |
| `/plan-eng-review` | 工程经理 | 锁定架构、数据流、图表、边界情况和测试方案 |
| `/review` | 偏执的资深工程师 | 找到那些能通过 CI 但会在生产环境爆炸的 bug |
| `/ship` | 发布工程师 | 同步 main，跑测试，推代码，开 PR。不再废话 |
| `/browse` | QA 工程师 | 给智能体装上眼睛——登录、点击你的应用、截图、捕捉问题 |
| `/qa` | QA + 修复工程师 | 测试应用、发现 bug、修复它们、重新验证。健康分数和发布就绪报告 |
| `/qa-only` | QA 报告员 | 只报告不改代码的 QA 测试 |
| `/setup-browser-cookies` | 会话管理器 | 从真实浏览器导入 cookie 到无头会话 |
| `/retro` | 工程经理 | 数据驱动的复盘，包含每个人的具体表扬和成长建议 |

## 一个功能如何走完 gstack 全流程

以下是 Garry 如何串联这些模式——一个功能，五个档位：

**第一步：产品思考** — 你描述功能，然后运行 `/plan-ceo-review`。Claude 不会照字面意思实现你的需求，而是挑战前提。「照片上传」变成了「帮卖家创建真正能卖出去的商品列表」——包括自动识别商品、查规格、比价格、智能选图。

**第二步：工程规格** — `/plan-eng-review` 接过精炼后的产品愿景，产出架构图、状态机、异步任务边界、失败模式和测试矩阵。图表迫使隐藏的假设浮出水面。

**第三步：偏执评审** — `/review` 猎杀那些能通过 CI 的 bug：N+1 查询、竞态条件、信任边界违规、孤儿文件、来自外部数据的提示注入。

**第四步：发布** — `/ship` 同步 main、跑测试、处理评审意见、推分支、开 PR。六次工具调用，搞定。

**第五步：自动化 QA** — `/qa` 读取 git diff，识别受影响的路由，启动浏览器，逐页测试。前后对比健康分数，截图保存到 `.gstack/qa-reports/`。

## 持久化浏览器：真正的技术突破

gstack 最有意思的部分不是 Markdown 技能——而是浏览器子系统。

大多数智能体工具把浏览器自动化当作一个独立的调试步骤。gstack 把它变成核心工作流的一部分。它运行一个**持久化的无头 Chromium 守护进程**，通过 localhost HTTP 通信。冷启动约 3-5 秒；后续调用约 100-200ms。Cookie、标签页、localStorage 和登录状态在命令之间持续保留。

这意味着 `/browse` 和 `/qa` 可以做真正的端到端测试：注册用户、导航每个改过的页面、截图、读取截图、检查控制台错误、验证 API——全部在大约 60 秒内完成。

浏览器闲置 30 分钟后自动关闭。基于 [Playwright](https://playwright.dev/) 构建，通过 Bun 编译为原生二进制文件。

## Greptile 集成：双层代码评审

gstack 还集成了 [Greptile](https://greptile.com)，一个自动化 PR 评审工具。自动评审的问题在于分诊——不是每条评论都是真问题，没有分诊层的话评论会堆积然后被忽略。

`/review` 和 `/ship` 能感知 Greptile。它们读取 Greptile 的评论，把每条分类为**有效**（修复）、**已修复**（自动回复）或**误报**（回复解释为什么不是问题）。误报被保存到 `~/.gstack/greptile-history.md`，后续运行会自动跳过已知的误报模式。

## 为什么用 Bun 而不是 Node

gstack 用 Bun 有四个实际原因：编译成二进制文件（用户不需要单独的运行时）、原生 SQLite 访问（直接读取 Chromium 的 cookie 数据库）、原生 TypeScript 执行、以及通过 `Bun.serve()` 内置 HTTP 服务器。这些不是审美选择——它们让 gstack 能干净地安装在 `~/.claude/skills/` 里，用户不需要管理工具链。

## 安装

要求：Claude Code、Git、Bun v1.0+。

打开 Claude Code 然后粘贴：

```
Install gstack: run `git clone https://github.com/garrytan/gstack.git
~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`
```

Claude 会处理剩下的事。团队使用时，复制到仓库的 `.claude/skills/gstack` 目录，队友通过 `git clone` 就能获得相同的工作流。

所有东西都在 `.claude/` 里。不碰你的 PATH，不在后台运行任何进程。

## 为什么这很重要

gstack 代表了我们对 AI 编程助手思考方式的转变。不再是一个通用模式做所有事情但每件事都只做到中等深度，而是**明确的角色边界**——就像真正的工程团队把产品思考、技术设计、代码评审、发布工程和 QA 分开一样。

它全部是 Markdown 技能、MIT 许可证、一行命令安装，这让它立刻可用。但更大的理念值得关注：**AI 编程的未来不是更聪明的模型——而是我们已有模型的更好操作模式。**

5 天 16k star。YC CEO 亲手打造。这是认真做事的人使用 Claude Code 的方式。

查看 GitHub 上的 [gstack 仓库](https://github.com/garrytan/gstack)。
