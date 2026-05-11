import { createClient } from '@supabase/supabase-js';
import { escapeHtml, sendEmail } from './_email.js';
import { approvedStatuses, getNewsItems } from './_newsStore.js';
import { getNewsletterSubscribers } from './_supabase.js';

const supabase =
  process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
    ? createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
      )
    : null;

function buildDigestHtml(nome, items) {
  const newsHtml = items
    .map(
      (item) => `
        <li style="margin:0 0 18px;padding:0 0 18px;border-bottom:1px solid #e2e8f0;">
          <a href="${escapeHtml(item.link)}" style="font-weight:700;color:#0369a1;text-decoration:none;">${escapeHtml(item.titlePt || item.title)}</a>
          <p style="margin:6px 0 0;color:#475569;font-size:14px;line-height:1.55;">${escapeHtml(item.summaryPt || item.summary || '')}</p>
          <p style="margin:8px 0 0;color:#94a3b8;font-size:12px;">${escapeHtml(item.source || 'Fonte externa')}</p>
        </li>
      `
    )
    .join('');

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:620px;margin:0 auto;padding:28px;background:#f8fafc;color:#0f172a;">
      <p style="margin:0 0 8px;color:#0891b2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">VANT Business</p>
      <h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;">${escapeHtml(nome)}, estas sao as 10 noticias de IA de hoje</h1>
      <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.6;">Curadoria automatizada e revisada antes do envio para manter o canal objetivo.</p>
      <ol style="margin:0;padding-left:20px;">${newsHtml}</ol>
      <p style="margin:24px 0 0;color:#64748b;font-size:12px;line-height:1.6;">
        Voce recebeu este email porque entrou no canal de noticias da VANT Business.
      </p>
    </div>
  `;
}

async function getExistingSubscribers() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('subscribers')
    .select('nome,email')
    .or('newsletter_opt_in.eq.true,lead_type.eq.newsletter');

  if (error) throw error;
  return data || [];
}

async function getAllSubscribers() {
  const [subscribers, leads] = await Promise.all([
    getExistingSubscribers(),
    getNewsletterSubscribers().catch(() => []),
  ]);

  const deduped = new Map();
  for (const subscriber of [...subscribers, ...leads]) {
    if (subscriber.email) {
      deduped.set(subscriber.email.toLowerCase(), subscriber);
    }
  }
  return Array.from(deduped.values());
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const querySecret = req.query?.secret;
  const expectedSecret = process.env.CRON_SECRET;

  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}` && querySecret !== expectedSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Ambiente de banco nao configurado' });
  }

  try {
    const news = await getNewsItems(req);
    const approved = (news.items || []).filter((item) => approvedStatuses.includes(item.status));
    const digestItems = approved.slice(0, 10);

    if (digestItems.length === 0) {
      return res.status(200).json({
        ok: true,
        sent: 0,
        skipped: true,
        reason: 'Nenhuma noticia aprovada para envio.',
        availableForReview: (news.items || []).length,
      });
    }

    const subscribers = await getAllSubscribers();
    const limit = Number(process.env.MAX_DIGEST_RECIPIENTS || 200);
    const selectedSubscribers = subscribers.slice(0, limit);
    const dryRun = req.query?.dryRun === 'true';

    if (!dryRun) {
      for (const subscriber of selectedSubscribers) {
        await sendEmail({
          to: subscriber.email,
          subject: 'As 10 melhores noticias de IA de hoje',
          html: buildDigestHtml(subscriber.nome || subscriber.name || 'Tudo bem', digestItems),
        });
      }
    }

    return res.status(200).json({
      ok: true,
      dryRun,
      sent: dryRun ? 0 : selectedSubscribers.length,
      recipients: selectedSubscribers.length,
      news: digestItems.length,
    });
  } catch (error) {
    console.error('Newsletter digest error:', error);
    return res.status(500).json({ error: 'Falha ao enviar newsletter diaria' });
  }
}
