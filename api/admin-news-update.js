import { isAdminRequest } from './_adminAuth.js';
import { upsertNewsItem } from './_newsStore.js';
import { upsertToolItem } from './_toolsStore.js';

const allowedStatuses = ['rascunho', 'aguardando_avaliacao', 'aprovada', 'publicada', 'reprovada'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const status = String(req.body?.status || '').trim();
  const item = req.body?.item;
  const tool = req.body?.tool;

  if (req.body?.type === 'tool' || tool) {
    const toolStatus = status || tool?.status || 'rascunho';
    if (!tool?.name || !tool?.link || !allowedStatuses.includes(toolStatus)) {
      return res.status(400).json({ error: 'Ferramenta ou status invalido' });
    }

    try {
      const result = await upsertToolItem(tool, toolStatus);
      return res.status(200).json({ ok: true, ...result });
    } catch (error) {
      console.error('Admin tool update error:', error);
      return res.status(500).json({ error: 'Falha ao salvar ferramenta' });
    }
  }

  if (!(item?.id || item?.title || item?.titlePt) || !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Noticia ou status invalido' });
  }

  try {
    const result = await upsertNewsItem(item, status);
    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error('Admin news update error:', error);
    return res.status(500).json({ error: 'Falha ao atualizar noticia' });
  }
}
