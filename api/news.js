import { approvedStatuses, getNewsItems } from './_newsStore.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const news = await getNewsItems(req);
    const items = news.items.filter((item) => approvedStatuses.includes(item.status));

    return res.status(200).json({
      ok: true,
      generatedAt: news.generatedAt,
      items,
    });
  } catch (error) {
    console.error('Public news error:', error);
    return res.status(500).json({ error: 'Falha ao carregar noticias' });
  }
}
