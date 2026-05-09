import { isAdminRequest } from './_adminAuth.js';
import { upsertNewsStatus } from './_newsStore.js';

const allowedStatuses = ['aguardando_avaliacao', 'aprovada', 'reprovada'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const status = String(req.body?.status || '').trim();
  const item = req.body?.item;

  if (!item?.id || !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Noticia ou status invalido' });
  }

  try {
    const result = await upsertNewsStatus(item, status);
    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error('Admin news update error:', error);
    return res.status(500).json({ error: 'Falha ao atualizar noticia' });
  }
}
