import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

export const meta: ArticleMeta = {
	title: 'Sliding Window Technique',
	tags: ['algorithms', 'sliding-window', 'leetcode', 'python'],
	date: '2026-03-22',
	excerpt:
		'Replace O(n²) nested loops with two pointers to process subarrays in linear time.',
	order: 1,
};

export const content = `
The sliding window technique uses two pointers to scan a subarray in **O(n)** instead of re-computing from scratch each step.

## Fixed Window (size = k)

Window size never changes — slide by adding the right element and dropping the left.

\`\`\`python
def fixed_window(arr, k):
    window = sum(arr[:k])
    best = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i - k]
        best = max(best, window)
    return best
\`\`\`

## Dynamic Window

Window grows and shrinks based on a condition — expand \`right\`, shrink \`left\` when invalid.

\`\`\`python
def dynamic_window(arr, target):
    left = total = best = 0
    for right in range(len(arr)):
        total += arr[right]
        while total > target:
            total -= arr[left]
            left += 1
        best = max(best, right - left + 1)
    return best
\`\`\`

## The LeetCode Pattern

1. Move \`right\` to expand the window
2. Check if the window violates your condition
3. If so, advance \`left\` to shrink it
4. Update your answer at each step

**Spot it:** any problem asking for the longest/shortest subarray or substring satisfying some condition is almost always sliding window.
`;

export default function SlidingWindow() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
