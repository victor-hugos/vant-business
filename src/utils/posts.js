import { marked } from 'marked';

const rawPosts = import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' });

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data = {};
  match[1].split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = val;
    }
  });
  return { data, content: match[2] };
}

export function getAllPosts() {
  return Object.entries(rawPosts)
    .map(([path, raw]) => {
      const { data, content } = parseFrontMatter(raw);
      const slug = path.split('/').pop().replace('.md', '');
      return { slug, ...data, html: marked(content) };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}
