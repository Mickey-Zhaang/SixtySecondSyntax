# SixtySecondSyntax

A collection of bite-sized programming guides — each one designed to get you up and running in 60 seconds or less.

## Contributing an Article

Articles are `.tsx` files that live in `src/content/articles/`. The registry auto-discovers them by file path, so placement determines the section and URL.

### File placement

```
src/content/articles/
├── <section>/
│   └── <slug>.tsx                        # → /<section>/<slug>
└── <section>/
    └── <subsection>/
        └── <slug>.tsx                    # → /<section>/<subsection>/<slug>
```

**Example:** `src/content/articles/python/flask-setup.tsx` becomes the article at `/python/flask-setup`.

### Article structure

Every article file exports three things:

```tsx
import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

// 1. Meta — controls how the article appears in listings
export const meta: ArticleMeta = {
  title: 'Your Title Here',
  tags: ['tag1', 'tag2'],
  date: '2026-03-17',       // YYYY-MM-DD
  excerpt: 'One sentence describing what the reader will learn.',
  order: 1,                 // optional — controls sort order within a section
};

// 2. Content — markdown string for the article body
export const content = `
Your markdown content here.

## A heading

\`\`\`language
code example
\`\`\`
`;

// 3. Default export — the rendered component
export default function YourArticleName() {
  return <ArticleTemplate meta={meta} markdown={content} />;
}
```

### Meta fields

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | Display title of the article |
| `tags` | `string[]` | Yes | Used for search and filtering |
| `date` | `string` | Yes | Publication date in `YYYY-MM-DD` format |
| `excerpt` | `string` | Yes | Short description shown in article listings |
| `order` | `number` | No | Sort order within a section (lower = first) |

### Writing content

The `content` export is a markdown string. Use standard markdown:

- `##` and `###` for headings (avoid `#` — the title comes from `meta.title`)
- Fenced code blocks with a language tag for syntax highlighting
- `**bold**` and `_italic_` for emphasis
- Keep it short — aim for something a reader can absorb in under 60 seconds

### Naming conventions

- **Section folders:** lowercase, e.g. `python`, `javascript`, `react`
- **File names:** lowercase kebab-case, e.g. `flask-setup.tsx`, `use-state.tsx`
- **Component name:** PascalCase matching the concept, e.g. `FlaskSetup`, `UseState`

### Step-by-step

1. Fork the repository and create a branch
2. Create your article file under the appropriate section folder
3. Run `pnpm serve` and verify the article appears and renders correctly
4. Run `pnpm lint` and `pnpm format` to ensure code style passes
5. Open a pull request with a brief description of what the article covers

## Development

```bash
pnpm install
pnpm serve       # dev server at http://localhost:5173
pnpm build       # production build
pnpm lint        # check code quality
pnpm format      # auto-format code
```

## License

MIT
