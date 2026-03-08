---
publishDate: 2026-03-08T00:00:00Z
author: luka2chat
title: "一小时重新设计整个网站——我一行代码都没写"
excerpt: 我用 Cursor Agent 全自动完成了个人网站的整体重新设计，参考 impeccable.style 的风格，从千篇一律的模板风变成了杂志级的编辑美学——全程无人干预。
image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
category: Development Tools
tags:
  - cursor
  - ai
  - web design
  - productivity
  - automation
metadata:
  canonical: https://luka2chat.com/zh/redesigning-my-website-with-cursor-agent
---

我的个人网站之前看起来……还行。功能齐全，该有的板块都有——Hero、项目展示、数据统计、FAQ、页脚。但它也长得和市面上其他所有开发者作品集一模一样。蓝色按钮、居中文字、圆角卡片——你懂的，一股"模板味"。

我想要点不一样的东西。一个看起来更像杂志，而不是 GitHub README 的网站。

## 灵感来源

我偶然发现了 [impeccable.style](https://impeccable.style)，这是 Paul Bakaus 做的一个 AI 编码工具设计技能插件。这个网站本身就做得非常漂亮——优雅的衬线字体、大量留白、编号章节、细微的分隔线、克制的品红强调色。整体感觉精致、有编辑感、很有设计意图。

我想：*能不能让我的网站也有这种感觉？*

## 实验开始

我没有打开 Figma，也没有手动改 CSS 文件改上好几天。我决定换个方式——打开 **Cursor**，启动一个 **Cloud Agent**，给了它一个简单的指令：

> "我想让我的网站有 https://impeccable.style/#hero 这样的设计风格，帮我整体优化一下。"

然后我就走开了。

## 接下来发生了什么

Cursor Agent 开始全自动工作。它：

- 访问了 impeccable.style，研究了整体设计（截图、分析字体、配色、布局和间距）
- 探索了我整个代码库，理解了 Astro 项目结构
- 规划了一个覆盖 21 个文件的全面重设计方案
- 执行了每一项改动——从安装新衬线字体到重写组件模板
- 构建项目确认零错误
- 启动开发服务器，逐个板块进行视觉测试
- 甚至切换了暗色模式，确保两种主题都好看

整个过程大约花了 **一个小时**。没有人工干预，没有来回沟通。就一个提示词，一个完全自主的 Agent，完成了我可能要花整个周末才能做完的事。

## 优化前后对比

### Hero 区域

**优化前** — 居中文字，粗体无衬线字体，蓝色按钮。典型的模板风格。

![优化前：Hero](/images/blog/before-hero.webp)

**优化后** — 左对齐编辑排版，优雅的 Playfair Display 衬线标题，高对比度黑色 CTA，内容标签栏。精致而有设计感。

![优化后：Hero](/images/blog/after-hero.webp)

### 项目展示

**优化前** — 标准卡片网格，蓝色图标，灰色背景。

![优化前：项目](/images/blog/before-projects.webp)

**优化后** — 干净的卡片配细边框，品红色图标，编号章节标签（01），大量留白。每个板块都有清晰的视觉层次。

![优化后：项目](/images/blog/after-projects.webp)

### FAQ 板块

**优化前** — 所有答案一次性全部展开，两栏布局，蓝色箭头图标。信息过载。

![优化前：FAQ](/images/blog/before-faq.webp)

**优化后** — 干净的手风琴组件，`+` 切换图标，一次展示一个问题，居中布局，充足的呼吸空间。"Frequently Asked Questions" 的衬线标题增添了编辑质感。

![优化后：FAQ](/images/blog/after-faq.webp)

### 页脚和行动号召

**优化前** — 居中的 CTA 卡片配蓝色按钮，和页面其他部分割裂。

![优化前：页脚](/images/blog/before-footer.webp)

**优化后** — 水平布局的"Work with me"板块，左侧文字右侧按钮。黑色主 CTA，干净的次要描边按钮。像杂志的结尾页。

![优化后：页脚](/images/blog/after-footer.webp)

### 暗色模式

这次重设计还包括了完整的暗色模式刷新——效果非常惊艳。

![暗色模式](/images/blog/after-dark-mode.webp)

## 改了什么

Agent 一共修改了 **21 个文件**，覆盖了整个设计体系：

- **字体** — 标题从普通无衬线字体换成了 Playfair Display，一款经典衬线字体
- **配色** — 从标准蓝色换成了精致的品红/粉色强调色
- **布局** — 从居中对齐改为左对齐的编辑排版风格
- **间距** — 大幅增加留白，营造高端质感
- **结构** — 添加了编号章节（01、02、03……）和板块间的细微分隔线
- **按钮** — 高对比度黑色主 CTA 替代了彩色按钮
- **FAQ** — 从静态列表转为交互式手风琴组件
- **Logo** — 从头像 + 粗体文字改为斜体衬线纯文字品牌标识

## 我的感受

这真的让我印象深刻。不仅是因为 AI 写出了完美的代码（确实如此），更因为它做出了**设计决策**——它理解了 impeccable.style 的吸引力来自于克制、字体选择和编辑级的间距处理。它没有简单复制，而是把那种 *氛围* 适配到了我的内容上。

花整个周末改 CSS 的时代结束了。如果你有一个清晰的设计参考和一个好的 AI Agent，你可以在吃一顿午饭的时间里重新设计整个网站。

试试 [Cursor Agent](https://cursor.com)。如果你需要设计灵感，看看 [impeccable.style](https://impeccable.style)——这个工具和这个网站本身都值得一看。
