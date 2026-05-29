import { isAdminRequest } from './_adminAuth.js';
import { collectNewsPayload } from './_newsCollector.js';
import { upsertNewsItem } from './_newsStore.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const limit = Number(req.body?.limit || process.env.NEWS_AGENT_LIMIT || 20);
    const payload = await collectNewsPayload({ limit });
    const stored = [];

    for (const item of payload.items || []) {
      const result = await upsertNewsItem(item, item.status || 'aguardando_avaliacao');
      stored.push(result.item);
    }

    return res.status(200).json({
      ok: true,
      stored: stored.length,
      items: stored,
      failedSources: payload.failedSources || [],
      generatedAt: payload.generatedAt,
    });
  } catch (error) {
    console.error('Admin news agent error:', error);
    return res.status(500).json({ error: 'Falha ao buscar noticias atuais' });
  }
}
