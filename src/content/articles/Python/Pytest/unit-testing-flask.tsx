import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

export const meta: ArticleMeta = {
	title: 'Unit Testing Basics',
	tags: ['Pytest', 'Python', 'unit-tests'],
	date: '2026-03-17', // YYYY-MM-DD
	excerpt: 'The basics of pytest and unit testing in 60s...',
	order: 1, // optional — controls sort order within a section: 1 > 9
};

export const content = `
One of the most circular but useful and maddening experiences of modern programming. Welcome to Unit Testing!

## Requirements
- \`pip install pytest\`

## The Absolute Basics

\`\`\`python
# In a file called simple.py

def add(a: int, b: int) -> int:
    return a + b
\`\`\`

\`\`\`python
# In a file called test_simple.py
from simple import add

def test_add():
    result = add(x=2, y=3)
    assert result == 5
	
\`\`\`
- run \`pytest .\` to run all files, and every function within, that are prepended with \`test_\`
- \`test_\` is Pytest's way of finding tests to run

Mostly self-explanatory; given some function in a module, a unit test isolates the functionality
and tests that it works as intended from the perspective of the engineer.
`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
