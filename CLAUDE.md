# SixtySecondSyntax — Claude Guide

## Project

A React/TypeScript site serving bite-sized programming guides. Each article is designed to be absorbed in under 60 seconds.

## Dev commands

```bash
pnpm serve       # dev server at http://localhost:5173
pnpm build       # production build (tsc + vite)
pnpm lint        # ESLint check
pnpm lint:fix    # ESLint auto-fix
pnpm format      # Prettier auto-format
```

## Tech stack

- React 19, TypeScript, Vite
- styled-components — all styling; theme via `src/styles/theme.ts`
- react-router-dom v7 — file-based routing driven by content structure
- react-markdown + rehype-highlight + highlight.js — article rendering
- GSAP — animations
- react-helmet-async — SEO/head management
- pnpm — package manager

## Path aliases

`@/` maps to `src/` (configured in `vite.config.ts` + `tsconfig.app.json`).

## Content system

Articles are `.tsx` files in `src/content/articles/`. The registry (`src/content/registry.ts`) auto-discovers them via `import.meta.glob` — file path determines section, subsection, and URL slug.

```
src/content/articles/
├── <section>/
│   └── <slug>.tsx              →  /<section>/<slug>
└── <section>/
    └── <subsection>/
        └── <slug>.tsx          →  /<section>/<subsection>/<slug>
```

### Article file structure

Every article exports three things:

```tsx
import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

export const meta: ArticleMeta = {
  title: 'Your Title Here',
  tags: ['tag1', 'tag2'],
  date: '2026-03-17',       // YYYY-MM-DD
  excerpt: 'One sentence describing what the reader will learn.',
  order: 1,                 // optional — lower = sorted first within section
  author: 'Your Name',      // optional
};

export const content = `
Markdown content here. Use ## and ### for headings (never #).
Fenced code blocks with language tags for syntax highlighting.
Aim for content a reader can absorb in under 60 seconds.
`;

export default function YourArticleName() {
  return <ArticleTemplate meta={meta} markdown={content} />;
}
```

### Naming conventions

- **Section folders:** lowercase, e.g. `python`, `javascript`, `react`
- **File names:** lowercase kebab-case, e.g. `flask-setup.tsx`, `use-state.tsx`
- **Component name:** PascalCase, e.g. `FlaskSetup`, `UseState`

### Article sort order

Within a section, articles sort by `meta.order` (ascending), then by `meta.date` (newest first) as a tiebreaker.

## Component structure

```
src/components/
├── article/
│   ├── ArticleCard.tsx      — card shown in listings
│   ├── ArticleMeta.tsx      — date/tags/reading time display
│   ├── ArticleTemplate.tsx  — full article layout (markdown renderer)
│   └── CodeBlock.tsx        — syntax-highlighted code block
├── common/                  — shared UI primitives
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PageLayout.tsx
│   └── Sidebar.tsx
├── navigation/
│   ├── Breadcrumbs.tsx
│   └── SectionNav.tsx
├── search/                  — search UI
└── index.ts                 — barrel export
```

## Styling

Use styled-components with the theme. Access theme tokens via the `theme` prop:

```tsx
const MyComponent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing[4]};
`;
```

Key theme tokens: `colors`, `fonts`, `fontSizes`, `spacing`, `breakpoints`, `radii`, `shadows`, `transitions`. See `src/styles/theme.ts` for all values.

## Key types (`src/lib/types.ts`)

```ts
interface ArticleMeta { title, tags, date, excerpt, author?, order? }
interface Article     { meta, slug, section, subsection?, path, readingTime, component }
interface Section     { slug, label, articles, subsections }
```

## Coding preferences

- **Styled-components go at the bottom** of every `.tsx` file — after all interfaces, helper functions, and exported components. Never declare them above the component that uses them.
- **Consistent page width** — all page content uses a `PageContent` wrapper with `max-width: 900px; margin: 0 auto`. Don't introduce new max-width constraints inside page components.
- **GSAP animations** — always wrap in `gsap.context()` with a `return () => ctx.revert()` cleanup. For toggled show/hide animations, use `gsap.fromTo()` (not `gsap.from()`) so both start and end states are explicit.
- **Hidden interactive elements** — when hiding elements with GSAP (opacity 0 / height 0), also set `pointer-events: none` via a styled-component prop so invisible content can't be clicked.

## Utility functions (`src/lib/articles.ts`)

- `calculateReadingTime(markdown)` — returns minutes (min 1)
- `sortArticles(articles)` — sort by order then date
- `buildSections(articles)` — group articles into sections/subsections
- `labelify(slug)` — `'flask-setup'` → `'Flask Setup'`
- `formatDate(dateStr)` — ISO date → human-readable
- `getAllTags(articles)` — deduplicated sorted tag list
