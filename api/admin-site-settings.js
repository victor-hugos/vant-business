import { isAdminRequest } from './_adminAuth.js';
import { upsertSiteSetting } from './_siteSettingsStore.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const setting = req.body?.setting;
  if (!setting?.key) {
    return res.status(400).json({ error: 'Configuracao invalida' });
  }

  try {
    const result = await upsertSiteSetting(setting);
    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error('Admin site settings error:', error);
    return res.status(500).json({ error: 'Falha ao salvar configuracao' });
  }
}
