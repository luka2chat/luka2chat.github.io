---
publishDate: 2026-03-19T00:00:00Z
author: luka2chat
title: "OpenCLI — 把任何网站或桌面应用变成命令行工具"
excerpt: OpenCLI 让你在终端控制 Twitter、Reddit、B站、Notion、Cursor、ChatGPT 等 25+ 平台。复用 Chrome 登录状态。AI 自动生成适配器。2.3k star。
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
  canonical: https://luka2chat.com/zh/opencli-turn-any-website-into-cli
---

想象一下在终端里这样操作：

```bash
opencli twitter trending --limit 10
opencli bilibili hot -f json
opencli zhihu hot -f yaml
opencli cursor send "重构认证模块"
```

不需要 API 密钥。不需要爬虫框架。不需要逆向工程。只是复用你浏览器里现有的登录状态，暴露为干净的 CLI 命令。

这就是 [OpenCLI](https://github.com/jackwener/opencli)。它把**任何网站或 Electron 应用**变成命令行接口——已经内置支持 25+ 个平台。

## 工作原理

OpenCLI 通过一个轻量级的 Browser Bridge Chrome 扩展 + 微型守护进程连接到你正在运行的 Chrome 浏览器。当你执行 `opencli twitter trending` 时，它：

1. **复用 Chrome 会话** — 你已经登录了 Twitter，OpenCLI 直接读取页面
2. **提取结构化数据** — 使用 YAML 声明式管道或 TypeScript 浏览器注入
3. **输出你选择的格式** — `table`、`json`、`yaml`、`md` 或 `csv`

你的凭据永远不会离开浏览器。没有 token 交换，没有 OAuth 舞蹈，没有 API 密钥管理。只要你在 Chrome 里能看到，OpenCLI 就能提取。

## 25+ 内置平台

命令注册表覆盖面很广：

| 平台 | 你能做什么 | 模式 |
|------|-----------|------|
| **Twitter/X** | 热门、书签、搜索、时间线、发帖、回复、关注、私信、下载媒体 | 浏览器 |
| **Reddit** | 热门、首页、搜索、子版块、阅读、点赞、收藏、评论 | 浏览器 |
| **Cursor** | 发送提示词、读取回复、提取代码、切换模型、导出历史 | 桌面 |
| **Bilibili** | 热门、搜索、收藏、历史、字幕、排行、下载 | 浏览器 |
| **Codex** | 发送提示词、读取回复、提取 diff、切换模型 | 桌面 |
| **Notion** | 搜索、阅读、写入、侧边栏、收藏夹、导出 | 桌面 |
| **Discord** | 发送、阅读、频道、服务器、搜索、成员 | 桌面 |
| **ChatGPT** | 新对话、发送、阅读、提问 | 桌面 |
| **小红书** | 搜索、信息流、用户主页、下载图片视频 | 浏览器 |
| **知乎** | 热榜、搜索、问题、下载文章 | 浏览器 |
| **YouTube** | 搜索、视频信息、字幕 | 浏览器 |
| **雪球** | 股票动态、热门个股、自选股 | 浏览器 |
| **LinkedIn** | 搜索 | 浏览器 |
| **HackerNews** | 热门故事 | 公开 API |
| **BBC** | 新闻 | 公开 API |

还有 V2EX、微博、Boss 直聘、Coupang、携程、Apple Podcasts、小宇宙、Yahoo Finance、什么值得买、Reuters 和 GitHub 搜索。

## Electron 应用支持：真正的突破

最新更新加入了对 **Electron 应用**的支持——不只是网站。这意味着你可以把桌面应用如 Cursor、Codex、ChatGPT、Notion、Discord 变成 CLI 工具。

```bash
opencli cursor send "解释这个函数"
opencli cursor extract-code
opencli notion search "会议纪要"
opencli chatgpt ask "总结这个 PDF"
```

这对 AI 智能体特别有价值。智能体现在可以通过命令行程序化地与 Cursor、Codex 或 ChatGPT 交互——AI 原生地控制 AI 工具。

## AI 驱动的适配器生成

没有你常用的网站？OpenCLI 可以自动生成适配器：

```bash
# 探索网站——发现 API、认证策略、能力
opencli explore https://example.com --site mysite

# 从探索结果生成适配器
opencli synthesize mysite

# 或一键完成：探索 + 合成 + 注册
opencli generate https://example.com --goal "hot"

# 自动检测认证策略：PUBLIC → COOKIE → HEADER
opencli cascade https://api.example.com/data
```

`explore` 命令映射网站的 API 端点、认证方式和数据结构。`synthesize` 把这份地图转化为可用的 YAML 或 TypeScript 适配器。丢进 `clis/` 文件夹就自动注册。

## 双引擎架构

OpenCLI 支持两种适配器类型：

**YAML 声明式管道** — 适合直接的数据提取。定义 fetch URL、CSS 选择器或 JSON 路径、输出映射。不需要写代码。

**TypeScript 浏览器注入** — 适合需要真实浏览器上下文的复杂交互。完整访问 DOM、JavaScript 执行和页面状态。

两种引擎支持相同的输出格式，可以在同一个网站适配器中混合使用。

## 下载支持

OpenCLI 可以从支持的平台下载媒体：

```bash
# 小红书图片和视频
opencli xiaohongshu download --note-id abc123 --output ./xhs

# Bilibili 视频（需要 yt-dlp）
opencli bilibili download --bvid BV1xxx --quality 1080p

# Twitter 媒体
opencli twitter download --username elonmusk --limit 20

# 知乎文章导出为 Markdown 并下载图片
opencli zhihu download --url "https://zhuanlan.zhihu.com/p/xxx" --download-images
```

## 自愈式配置

```bash
opencli setup         # 自动发现 token 并配置
opencli doctor        # 诊断 10+ 工具的配置状态
opencli doctor --fix  # 自动修复问题
```

`doctor` 命令检查扩展连接性、守护进程状态和浏览器命令执行。`--fix` 自动修复它能处理的问题。

## 为什么这很重要

OpenCLI 解决了一个真实的问题：大多数网站和应用把数据锁在 GUI 后面。API 有速率限制、收费或根本不存在。爬虫不断失效。OAuth 是一个官僚迷宫。

OpenCLI 绕过了所有这些，复用你已经拥有的东西——一个有活跃会话的浏览器。它对账号安全（凭据不离开 Chrome）、维护成本低（只要网站 HTML 不大改适配器就能用）、可扩展（AI 可以动态生成新适配器）。

对 AI 智能体开发者来说特别令人兴奋。OpenCLI 给智能体提供了结构化的方式与任何网站交互——读数据、发内容、下载媒体——不需要为每个平台构建定制集成。

2.3k star。38 个版本。Apache-2.0 许可证。

查看 GitHub 上的 [OpenCLI 仓库](https://github.com/jackwener/opencli)。
