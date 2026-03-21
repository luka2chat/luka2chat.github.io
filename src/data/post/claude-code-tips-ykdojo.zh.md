---
publishDate: 2026-03-21T00:00:00Z
author: luka2chat
title: "45 条 Claude Code 使用技巧——ykdojo 的实战笔记"
excerpt: 从别名、语音输入到系统提示词瘦身和容器化 Claude，ykdojo 把他用 Claude Code 踩过的坑和摸出来的路子整理成了 45 条。附带一个 dx 插件，两行命令装好。
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
  canonical: https://luka2chat.com/zh/claude-code-tips-ykdojo
---

我在用 Claude Code 的过程中有个反复出现的体验：感觉自己只用了它三成功力，但又不知道剩下七成藏在哪。

[ykdojo](https://github.com/ykdojo) 写了一份 [claude-code-tips](https://github.com/ykdojo/claude-code-tips)，把他自己日常用 Claude Code 踩坑和提效的经验整理成 45 条，全塞在一篇非常长的 README 里。6.5k star，400 多 fork。不是那种"10 个你不知道的技巧"水文——里面有真实的终端输出、脚本、补丁文件，甚至还带一个可以直接 `claude plugin install` 的插件。

## 仓库里有什么

除了 README 本身，仓库还包含：

- `scripts/` — 自定义状态栏、会话克隆、上下文用量检测、一键 setup
- `skills/` 和 `.claude/commands/` — 可以直接复制到自己项目里用的 skill 和斜杠命令
- `system-prompt/` — 给 Claude Code 的 CLI 打补丁，把系统提示词和工具描述的 token 开销砍掉大约一半（作者测的数据是 ~19k 压到 ~9k）
- dx 插件 — 把上面这些打包成一个可安装的插件

## 我觉得最有意思的几块

### 上下文管理

ykdojo 把上下文当成稀缺资源来管理。他建议关掉自动压缩（auto-compact），自己控制什么时候压缩、什么时候开新会话。当一轮对话快到头了，他不是直接 `/compact`，而是让 Claude 写一份 HANDOFF.md——记录当前状态、试过什么、哪些有效哪些没用——然后开新会话时只喂这个文件。

更狠的是「半克隆」：把一段长对话只保留后半段，前半段丢掉。他甚至写了 hook，在上下文用量超过 85% 时自动提醒你执行半克隆。

### 系统提示词瘦身

Claude Code 每次启动，系统提示词和工具描述就吃掉约 19k token，大概占 200k 上下文窗口的 10%。ykdojo 写了一套补丁脚本直接改 CLI 的压缩包，把工具描述里的冗余示例和重复文案砍掉。README 里贴了 `/context` 命令的前后对比截图——打完补丁之后确实只占 5% 左右。

另一个简单但容易忽略的设置：在 `settings.json` 里加 `ENABLE_TOOL_SEARCH: true`，让 MCP 工具按需加载，而不是每个会话都把所有 MCP 工具定义塞进去。

### 容器里跑 Claude

第 21 条讲的是在 Docker 容器里跑 `claude --dangerously-skip-permissions`。好处很直接：容器里搞砸了不影响主机。作者还走了一步——用本机的 Claude 通过 tmux 给容器里的 Claude 发指令、读输出，相当于本地 Claude 当「指挥官」，容器里的 Claude 当「工人」。

听起来有点疯，但对于那种需要跑很久、又可能有破坏性操作的研究任务，确实比在主机上直接跑安全得多。

### 工程习惯没过时

里面反复强调的一点是：会用 Claude Code 不等于不需要工程能力。大任务拆小任务、写测试（特别是 TDD）、用 Git worktree 并行开分支、用 `git bisect` 配合 tmux 做二分法定位 bug——这些传统技能反而在 AI 时代更有杠杆。

### 被忽略的内置功能

前几条专门讲那些藏在 `/` 后面的命令：`/usage` 看限额、`/stats` 看活跃度（有 GitHub 热力图风格的展示）、`/copy` 直接把上一条回复复制为 markdown。还有设别名这种小事——`c` 代替 `claude`，`ch` 代替 `claude --chrome`——看着不起眼，每天省的击键加起来不少。

### Gemini CLI 当替补

Claude Code 的 WebFetch 抓不了 Reddit 之类的站。ykdojo 的做法是写一个 skill，让 Claude 在抓不到时自动通过 tmux 调 Gemini CLI 去拿内容。不快，但能拿到数据。这个 skill 也包含在 dx 插件里。

## dx 插件

两行安装：

```bash
claude plugin marketplace add ykdojo/claude-code-tips
claude plugin install dx@ykdojo
```

装完之后多了几个命令：`/dx:gha` 分析 GitHub Actions 失败、`/dx:handoff` 写交接文档、`/dx:clone` 和 `/dx:half-clone` 克隆/半克隆会话。还有 Reddit 抓取和 CLAUDE.md 审查两个 skill。

## 一键 setup

仓库带一个交互式 setup 脚本，可以一次性配好 dx 插件、cc-safe（审计危险命令的 CLI 工具）、状态栏、MCP 懒加载、别名等，每一项都可以跳过：

```bash
bash <(curl -s https://raw.githubusercontent.com/ykdojo/claude-code-tips/main/scripts/setup.sh)
```

跑之前看清楚它会改 `~/.claude` 下的哪些文件。

## 怎么用这份资料

45 条不用一口气读完。我的建议是先扫一遍目录，挑两三条跟你当前痛点相关的先落地——比如别名、上下文管理、或者 dx 插件。等过一阵撞到新的天花板，再回来翻。

仓库地址：[ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips)
