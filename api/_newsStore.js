import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getSupabaseAdmin } from './_supabaseAdmin.js';

export const approvedStatuses = ['aprovada', 'approved'];

function toDbItem(item, status) {
  return {
    id: item.id,
    title: item.title || '',
    title_pt: item.titlePt || item.title_pt || null,
    link: item.link || '',
    source: item.source || null,
    category: item.category || null,
    published_at: item.publishedAt || item.published_at || null,
    summary: item.summary || null,
    summary_pt: item.summaryPt || item.summary_pt || null,
    status: status || item.status || 'aguardando_avaliacao',
    score: item.score || 0,
    rank: item.rank || null,
    payload: item,
    updated_at: new Date().toISOString(),
  };
}

function fromDbItem(row) {
  return {
    ...(row.payload || {}),
    id: row.id,
    title: row.title,
    titlePt: row.title_pt || row.payload?.titlePt,
    link: row.link,
    source: row.source,
    category: row.category,
    publishedAt: row.published_at || row.payload?.publishedAt,
    summary: row.summary,
    summaryPt: row.summary_pt || row.payload?.summaryPt,
    status: row.status,
    score: row.score,
    rank: row.rank,
    reviewedAt: row.reviewed_at,
    updatedAt: row.updated_at,
  };
}

export async function readStaticNews(req) {
  try {
    const file = await readFile(path.resolve(process.cwd(), 'public/data/ai-news.json'), 'utf8');
    return JSON.parse(file);
  } catch {
    if (!req?.headers?.host) return { items: [] };
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const response = await fetch(`${protocol}://${req.headers.host}/data/ai-news.json`);
    if (!response.ok) return { items: [] };
    return response.json();
  }
}

export async function getNewsItems(req) {
  const staticNews = await readStaticNews(req);
  const itemsById = new Map((staticNews.items || []).map((item) => [item.id, item]));
  const supabase = getSupabaseAdmin();
  const warnings = [];

  if (supabase) {
    const { data, error } = await supabase
      .from('ai_news_items')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      warnings.push(error.message);
    } else {
      (data || []).forEach((row) => {
        const current = itemsById.get(row.id) || {};
        itemsById.set(row.id, { ...current, ...fromDbItem(row) });
      });
    }
  }

  return {
    generatedAt: staticNews.generatedAt || null,
    reviewStatus: staticNews.reviewStatus || 'aguardando_avaliacao',
    warnings,
    items: [...itemsById.values()].sort((a, b) => {
      const aTime = new Date(a.publishedAt || 0).getTime();
      const bTime = new Date(b.publishedAt || 0).getTime();
      if (bTime !== aTime) return bTime - aTime;
      return (a.rank || 999) - (b.rank || 999);
    }),
  };
}

export async function upsertNewsStatus(item, status) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { stored: false, item: { ...item, status } };

  const now = new Date().toISOString();
  const dbItem = {
    ...toDbItem(item, status),
    reviewed_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from('ai_news_items')
    .upsert(dbItem, { onConflict: 'id' })
    .select('*')
    .single();

  if (error) throw error;
  return { stored: true, item: fromDbItem(data) };
}
