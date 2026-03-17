import type { Article, Section } from './types';

export function calculateReadingTime(markdown: string): number {
  const wordsPerMinute = 200;
  const wordCount = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function labelify(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function sortArticles(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    const orderA = a.meta.order ?? Infinity;
    const orderB = b.meta.order ?? Infinity;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
  });
}

export function buildSections(articles: Article[]): Record<string, Section> {
  const sections: Record<string, Section> = {};

  for (const article of articles) {
    if (!sections[article.section]) {
      sections[article.section] = {
        slug: article.section,
        label: labelify(article.section),
        articles: [],
        subsections: {},
      };
    }

    const section = sections[article.section];
    section.articles.push(article);

    if (article.subsection) {
      if (!section.subsections[article.subsection]) {
        section.subsections[article.subsection] = [];
      }
      section.subsections[article.subsection].push(article);
    }
  }

  // Sort articles within each section
  for (const section of Object.values(sections)) {
    section.articles = sortArticles(section.articles);
    for (const key of Object.keys(section.subsections)) {
      section.subsections[key] = sortArticles(section.subsections[key]);
    }
  }

  return sections;
}

export function searchArticles(articles: Article[], query: string): Article[] {
  if (!query.trim()) return articles;
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.meta.title.toLowerCase().includes(q) ||
      a.meta.excerpt.toLowerCase().includes(q) ||
      a.meta.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.meta.author?.toLowerCase().includes(q) ||
      a.section.toLowerCase().includes(q) ||
      a.slug.toLowerCase().includes(q),
  );
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getAllTags(articles: Article[]): string[] {
  const tagSet = new Set<string>();
  for (const article of articles) {
    for (const tag of article.meta.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}
