# AGENTS.md

## Cursor Cloud specific instructions

This is a static Astro 5.x + Tailwind CSS portfolio/blog site (Luka2Chat). No backend, no database, no external services required for local development.

### Key commands

All standard dev commands are in `package.json` scripts. Use `pnpm` as the package manager (declared in `packageManager` field).

| Task | Command |
|------|---------|
| Dev server | `pnpm run dev` (port 4321) |
| Build | `pnpm run build` |
| Lint (all) | `pnpm run check` |
| ESLint only | `pnpm run check:eslint` |
| Prettier only | `pnpm run check:prettier` |
| Astro check | `pnpm run check:astro` |
| Auto-fix lint | `pnpm run fix` |

### Notes

- The codebase has pre-existing ESLint errors (unused imports) and Prettier formatting issues. These are not regressions — they exist in the upstream code.
- `astro check` passes with 0 errors (only hints about unused imports).
- The site supports i18n (English at `/`, Chinese at `/zh/`). Blog posts have `.md` and `.zh.md` variants in `src/data/post/`.
- Site config is in `src/config.yaml`. Navigation is in `src/navigation.ts`.
- To bind the dev server to all interfaces (useful in cloud VMs): `pnpm run dev -- --host 0.0.0.0`.
