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
- react-router-dom v7 — catch-all routing via `ContentRouter`
- react-markdown + rehype-highlight + highlight.js — article rendering
- GSAP — animations
- react-helmet-async — SEO/head management
- pnpm — package manager

## Path aliases

`@/` maps to `src/` (configured in `vite.config.ts` + `tsconfig.app.json`).

## Routing architecture

Router config (`src/router.tsx`) has two routes: `/` → `HomePage`, `*` → `ContentRouter`. No manual route registration needed.

`ContentRouter` resolves each path by:
1. Checking `articleByPath` map (O(1) lookup) → renders `ArticlePage`
2. Checking if path matches a `ContentNode` in the tree → renders `ListingPage`
3. Otherwise navigates to `/404`

## Content system

Articles are `.tsx` files in `src/content/articles/`. The registry (`src/content/registry.ts`) auto-discovers them via `import.meta.glob` — file path determines URL slug and tree position. The nesting can be arbitrarily deep (not just section/subsection).

```
src/content/articles/
├── <section>/
│   └── <slug>.tsx              →  /<section>/<slug>
└── <section>/
    └── <subsection>/
        └── <slug>.tsx          →  /<section>/<subsection>/<slug>
```

**Registry exports:**
- `articles` — flat `Article[]` array
- `sections` — top-level `ContentNode[]`
- `contentRoot` — full nested tree (used by sidebar)
- `articleByPath` — `Map<string, Article>` for O(1) lookup
- `searchArticles(query)` — searches title, excerpt, tags, author, path segments

### Creating a new article

Copy `src/content/articles/_template.tsx` into the appropriate section folder and rename it:

```bash
cp src/content/articles/_template.tsx src/content/articles/<section>/<slug>.tsx
```

Then update `meta`, `content`, and the component name. The app auto-discovers it on save.

> Files prefixed with `_` are ignored by the registry (filtered in code, not via glob pattern) — `_template.tsx` will never appear as an article.

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
│   ├── ArticleCard.tsx      — card shown in listings (shows first 3 tags only)
│   ├── ArticleMeta.tsx      — date/tags/reading time display
│   ├── ArticleTemplate.tsx  — full article layout (markdown renderer)
│   └── CodeBlock.tsx        — syntax-highlighted code block with copy button
├── common/
│   ├── NodeCarousel.tsx     — horizontal scrollable carousel with GSAP scroll animation
│   ├── ReadingProgress.tsx  — fixed scroll-progress bar
│   └── Tag.tsx              — tag chip with optional click handler
├── layout/
│   ├── Header.tsx           — sticky header with logo + SearchBar
│   ├── Footer.tsx
│   ├── PageLayout.tsx       — root layout: Header, Sidebar (conditional), Main, Footer
│   └── Sidebar.tsx          — sticky sidebar, hidden at md breakpoint
├── navigation/
│   ├── Breadcrumbs.tsx
│   └── SectionNav.tsx       — recursive TreeNode nav with GSAP collapse/expand
├── search/
│   └── SearchBar.tsx        — debounced, dropdown, max 8 results
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

**Color scheme:** dark red/maroon accent (`#c84040`) on near-black background (`#0a0101`).

**Transient props:** use `$`-prefixed props for styled-component variants that should not be forwarded to the DOM (e.g. `$open`, `$active`, `$copied`, `$clickable`):

```tsx
const Item = styled.div<{ $active: boolean }>`
  color: ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.text};
`;
```

**Responsive breakpoints** (`max-width` queries): `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`. Sidebar collapses at `md`.

## Key types (`src/lib/types.ts`)

```ts
interface ArticleMeta { title, tags, date, excerpt, author?, order? }
interface Article     { meta, slug, section, subsection?, path, readingTime, component }
interface ContentNode { slug, label, path, children: Record<string, ContentNode>, articles: Article[] }
```

> `Section` is gone — the codebase uses `ContentNode` (recursive, supports arbitrary depth). `buildContentTree()` builds it; `buildSections()` is a legacy alias.

## Coding preferences

- **Styled-components go at the bottom** of every `.tsx` file — after all interfaces, helper functions, and exported components. Never declare them above the component that uses them.
- **Consistent page width** — all page content uses a `PageContent` wrapper with `max-width: 900px; margin: 0 auto`. Don't introduce new max-width constraints inside page components.
- **GSAP animations** — always wrap in `gsap.context()` with a `return () => ctx.revert()` cleanup. For toggled show/hide animations, use `gsap.fromTo()` (not `gsap.from()`) so both start and end states are explicit.
- **Hidden interactive elements** — when hiding elements with GSAP (opacity 0 / height 0), also set `pointer-events: none` via a styled-component prop so invisible content can't be clicked.
- **Stagger animations** — use the `stagger` parameter on `gsap.fromTo()` / `gsap.from()` to sequence list items. Target elements by class name (e.g. `.listing-item`, `.recent-card`).
- **No external UI libraries** — all components are built with styled-components and React primitives only. Don't add component libraries.
- **Semantic HTML + accessibility** — use `aria-label` on interactive elements (search input, carousel buttons, nav). Use appropriate landmark elements.

## Utility functions (`src/lib/articles.ts`)

- `calculateReadingTime(markdown)` — word count ÷ 200 wpm, min 1 minute
- `sortArticles(articles)` — sort by `order` asc, then `date` desc
- `buildContentTree(articles)` — flat array → nested `ContentNode` tree
- `countArticles(node)` — recursive count of articles under a node
- `labelify(slug)` — `'flask-setup'` → `'Flask Setup'`
- `slugify(str)` — string → kebab-case
- `formatDate(dateStr)` — ISO date → human-readable
- `getAllTags(articles)` — deduplicated sorted tag list

## Markdown rendering

`ArticleTemplate` uses `react-markdown` with:
- `remarkGfm` — tables, strikethrough, task lists
- `rehypeHighlight` — syntax highlighting; supported languages: `bash`, `css`, `js`, `json`, `python`, `sql`, `typescript`, `xml`
- Custom `pre`/`code` component mapping → `CodeBlock` (with copy-to-clipboard)
- Inline code (no language class) renders as plain `<code>`, not a `CodeBlock`

## ESLint notes

Uses the new flat config format (`eslint.config.js`). Two non-obvious rules:
- `react-refresh/only-export-components` is disabled for article files (they export `meta` + a component, which normally trips this rule)
- `@typescript-eslint/no-empty-object-type` is disabled (needed for `styled.d.ts` theme augmentation)
