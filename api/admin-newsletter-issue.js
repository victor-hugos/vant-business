import { isAdminRequest } from './_adminAuth.js';
import { upsertNewsletterIssue } from './_newsletterStore.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const items = Array.isArray(req.body?.items) ? req.body.items.slice(0, 10) : [];
    if (items.length === 0) {
      return res.status(400).json({ error: 'Selecione ao menos uma noticia para o email' });
    }

    const result = await upsertNewsletterIssue({
      id: req.body?.id,
      subject: req.body?.subject,
      intro: req.body?.intro,
      type: req.body?.type || 'curadoria',
      status: req.body?.status || 'rascunho',
      scheduledAt: req.body?.scheduledAt,
      items,
    });

    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error('Admin newsletter issue error:', error);
    return res.status(500).json({ error: 'Falha ao salvar edicao de newsletter' });
  }
}
