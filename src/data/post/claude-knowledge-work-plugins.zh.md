---
publishDate: 2026-03-10T00:00:00Z
author: luka2chat
title: "Claude 知识工作插件 — 让 Claude 成为每个岗位的专家"
excerpt: Anthropic 开源了 11 个插件，能把 Claude 变成销售、市场、法务、财务、数据分析等领域的专家。它们怎么工作，为什么值得关注。
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
  canonical: https://luka2chat.com/zh/claude-knowledge-work-plugins
---

大多数人用 Claude 的方式都一样——粘贴一段文字，问个问题，拿到答案。但如果 Claude 已经了解你公司的流程、能调用你的工具、还懂你这个岗位的门道呢？

这就是 [Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins) 做的事。Anthropic 刚刚开源了 11 个插件，能把 Claude 从通用助手变成岗位级别的专家——覆盖销售、市场、法务、财务、数据、工程等方向。

## 什么是知识工作插件？

每个插件是一组**技能（Skills）**、**斜杠命令（Commands）**和**连接器（Connectors）**的组合，为特定岗位量身定做。可以把它们理解为预装的"领域大脑"，把专业知识、最佳实践和工作流程编码进去。

关键点：插件就是 markdown 和 JSON 文件。没有代码，没有基础设施，没有构建步骤。你能读到 Claude 遵循的每一条指令，也能编辑它们、改成你自己的。

它们同时支持 **Claude Cowork**（网页端协作产品）和 **Claude Code**（终端编程智能体）。

## 11 个开源插件

开箱即用的完整列表：

| 插件 | 功能 |
|------|------|
| **Productivity（效率）** | 管理任务、日历、日常工作流，连接 Slack、Notion、Asana、Linear 等 |
| **Sales（销售）** | 调研客户、准备电话、审查管线、起草外联邮件、制作竞品分析卡 |
| **Customer Support（客服）** | 分诊工单、起草回复、打包升级、创建知识库文章 |
| **Product Management（产品）** | 写需求文档、规划路线图、综合用户研究、跟踪竞争格局 |
| **Marketing（市场）** | 起草内容、策划活动、维护品牌调性、汇报各渠道表现 |
| **Legal（法务）** | 审合同、分诊 NDA、合规导航、风险评估 |
| **Finance（财务）** | 准备记账凭证、对账、生成财务报表、支持审计 |
| **Data（数据）** | 写 SQL、跑统计分析、建仪表板、校验结果 |
| **Enterprise Search（企业搜索）** | 一个查询跨搜邮件、聊天、文档和 wiki |
| **Bio Research（生物研究）** | 连接 PubMed、bioRxiv、ClinicalTrials.gov 等，加速生命科学研发 |
| **Plugin Management（插件管理）** | 创建新插件或定制现有插件 |

每个插件通过 [MCP 服务器](https://modelcontextprotocol.io/)连接你岗位依赖的工具——CRM、项目管理、数据仓库、设计工具。

## 插件结构

每个插件的文件结构一致：

```
plugin-name/
├── .claude-plugin/plugin.json   # 清单文件
├── .mcp.json                    # 工具连接配置
├── commands/                    # 斜杠命令（/sales:call-prep）
└── skills/                      # Claude 自动调用的领域知识
```

**Skills** 在相关时自动触发——Claude 读取它们并应用领域专业知识，不需要你额外提示。**Commands** 是你主动触发的操作，比如 `/finance:reconciliation` 或 `/product-management:write-spec`。**Connectors** 通过 MCP 把 Claude 接入外部工具。

## 怎么开始用

### Claude Cowork

直接去 [claude.com/plugins](https://claude.com/plugins/) 安装。

### Claude Code

```bash
claude plugin marketplace add anthropics/knowledge-work-plugins
claude plugin install sales@knowledge-work-plugins
```

安装后，技能自动激活，斜杠命令在会话中直接可用。

## 为什么独立创客也该关注

你可能觉得"企业插件"跟独立开发者没关系。我觉得恰好相反：

1. **学 Anthropic 的提示工程。** 这些插件本质上是 Anthropic 把结构化 Claude 行为的最佳实践——用可读的 markdown 编码出来了。研究他们怎么写 skills，你到处都能写出更好的 prompt。

2. **插件架构可复用。** 同样的模式——skills + commands + connectors——适用于任何领域。你可以用同样的架构构建 GEO 插件、内容营销插件或代码审查插件。

3. **MCP 集成是宝藏。** `.mcp.json` 文件展示了如何把 Claude 接入真实工具。如果你一直想把 Claude 连到自己的 API 或数据库，这些就是现成的参考实现。

4. **Fork 然后定制。** 这就是设计目的。这些是通用起点——把连接器换成你的工具栈，加入你的术语和流程，你就有了一个像是为你量身定做的 AI 专家。

## 更大的图景

Knowledge Work Plugins 代表了我们对 AI 助手思考方式的转变。从一个每次都需要从零开始提示的通用模型，走向**预配置的专家**——携带持久上下文、连接真实工具、遵循既定工作流。

这一切都是开源的、基于文件的——没有 SDK，没有需要学的 API，就是 markdown——任何能编辑文本文件的人都能上手。

不管你是用 Claude Cowork、Claude Code，还是只想学学 Anthropic 怎么构建 AI 工作流，[knowledge-work-plugins 仓库](https://github.com/anthropics/knowledge-work-plugins) 都值得深读。

9200+ star，还在涨。这是我们未来和 AI 协作的方式。
