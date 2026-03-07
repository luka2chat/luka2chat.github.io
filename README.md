# luka2chat.github.io

Personal website and blog for [luka2chat.com](https://luka2chat.com/).

This project powers my bilingual portfolio/blog, where I share what I'm building around:

- Generative Engine Optimization (GEO)
- AI and LLM-powered tools
- Open-source side projects
- Notes and posts about building in public

## Overview

The site is built with `Astro` and `Tailwind CSS`, based on AstroWind originally, but customized for my own content, navigation, styling, and bilingual structure.

Current site features:

- English and Simplified Chinese pages
- Personal homepage, about page, and contact page
- Blog with tags, categories, RSS, and MDX/Markdown content
- Custom design tokens, typography, dark mode, and motion polish
- Static build output with Vercel-friendly config

## Tech Stack

- `Astro 5`
- `Tailwind CSS 3`
- `TypeScript`
- `MDX`
- `astro-icon`
- `astro-compress`
- `@astrolib/seo`
- `@astrojs/rss`
- `@astrojs/sitemap`

## Local Development

This project uses `pnpm`.

### Install

```bash
pnpm install
```

### Start dev server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Run checks

```bash
pnpm check
```

### Auto-fix lint/format issues

```bash
pnpm fix
```

## Project Structure

```text
.
├── public/                 # Static assets
├── src/
│   ├── assets/             # Styles and local assets
│   ├── components/         # UI, blog, layout, and widget components
│   ├── content/            # Content collections config
│   ├── data/post/          # Blog posts (.md / .mdx)
│   ├── layouts/            # Site/page/markdown layouts
│   ├── pages/              # Routes (including /zh localized pages)
│   ├── utils/              # Helpers and utilities
│   ├── config.yaml         # Site metadata and app config
│   └── navigation.ts       # Header/footer navigation data
├── astro.config.ts
├── tailwind.config.js
├── vercel.json
└── package.json
```

## Content Editing

Most day-to-day content updates happen in these files:

- `src/pages/index.astro`
- `src/pages/zh/index.astro`
- `src/pages/about.astro`
- `src/pages/zh/about.astro`
- `src/pages/contact.astro`
- `src/pages/zh/contact.astro`
- `src/data/post/`
- `src/navigation.ts`
- `src/config.yaml`

## Styling

Main design customization lives here:

- `src/components/CustomStyles.astro`
- `src/assets/styles/tailwind.css`
- `tailwind.config.js`

## Blog

Blog posts are stored in:

- `src/data/post/*.md`
- `src/data/post/*.mdx`

The blog supports:

- post pages
- paginated list pages
- category pages
- tag pages
- RSS
- English/Chinese localized content

## Deployment

The site is configured as a static Astro build and can be deployed to platforms like Vercel.

### Production build

```bash
pnpm build
```

Output is generated in:

```text
dist/
```

### Vercel

`vercel.json` is included for clean URLs, no trailing slash, and long-term caching for built assets.

## Notes

- Package manager: `pnpm`
- Default site URL: `https://luka2chat.com`
- Theme mode: `system`
- Languages: `en`, `zh`

## Credits

This project started from the AstroWind template and has since been customized into my personal website.

## License

MIT. See `LICENSE.md`.
