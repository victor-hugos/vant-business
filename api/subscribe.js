import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    : null;

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const VICTOR_EMAIL = process.env.EMAIL_USER;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalize(value = '') {
  return String(value).trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    nome,
    email,
    whatsapp,
    ebook,
    productTitle,
    leadType = 'ebook',
    newsletterOptIn = false,
    source = 'unknown',
  } = req.body || {};

  const cleanName = normalize(nome);
  const cleanEmail = normalize(email).toLowerCase();
  const cleanWhatsapp = normalize(whatsapp);
  const cleanEbook = normalize(ebook);
  const cleanProductTitle = normalize(productTitle) || cleanEbook;
  const cleanLeadType = leadType === 'newsletter' ? 'newsletter' : 'ebook';
  const wantsNewsletter = cleanLeadType === 'newsletter' || Boolean(newsletterOptIn);

  if (!cleanEmail || !cleanName || !cleanWhatsapp || !cleanEbook) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ error: 'Email invalido' });
  }

  if (!supabase || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Ambiente de email ou banco nao configurado' });
  }

  const now = new Date().toISOString();
  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeWhatsapp = escapeHtml(cleanWhatsapp);
  const safeProductTitle = escapeHtml(cleanProductTitle);
  const safeLeadType = escapeHtml(cleanLeadType);
  const safeSource = escapeHtml(source);
  const ebookUrl = `https://vant.business/ebook/${encodeURIComponent(cleanEbook)}`;

  try {
    // 1. Salva no Supabase
    const { error } = await supabase
      .from('subscribers')
      .upsert(
        {
          nome: cleanName,
          email: cleanEmail,
          whatsapp: cleanWhatsapp,
          ebook: cleanEbook,
          product_title: cleanProductTitle,
          lead_type: cleanLeadType,
          newsletter_opt_in: wantsNewsletter,
          source,
          metadata: {
            userAgent: req.headers['user-agent'] || null,
            referer: req.headers.referer || null,
          },
          created_at: now,
          updated_at: now,
        },
        { onConflict: 'email,ebook', ignoreDuplicates: false }
      );

    if (error) throw error;

    const isNewsletterOnly = cleanLeadType === 'newsletter';
    const subscriberSubject = isNewsletterOnly
      ? `${cleanName}, voce entrou no canal de noticias de IA`
      : `Seu ebook esta pronto, ${cleanName}!`;

    const subscriberHtml = isNewsletterOnly
      ? `
          <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#0f172a;color:#f1f5f9;">
            <h2 style="color:#22d3ee;margin-bottom:8px;">Cadastro confirmado</h2>
            <p style="color:#cbd5e1;line-height:1.6;">
              Ola, ${safeName}. Voce entrou no canal diario de noticias de IA da VANT Business.
            </p>
            <p style="color:#94a3b8;line-height:1.6;margin-top:16px;">
              O agente busca 20 noticias, Victor avalia a fila e o email diario envia as 10 melhores aprovadas.
            </p>
          </div>
        `
      : `
          <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#0f172a;color:#f1f5f9;">
            <h2 style="color:#22d3ee;margin-bottom:8px;">Ebook liberado</h2>
            <p style="color:#cbd5e1;line-height:1.6;">
              Ola, ${safeName}. Seu material <strong>${safeProductTitle}</strong> foi registrado no sistema.
            </p>
            <p style="color:#94a3b8;line-height:1.6;margin-top:16px;">
              Para baixar novamente, acesse: <a href="${ebookUrl}" style="color:#67e8f9;">${ebookUrl}</a>
            </p>
            <p style="color:#94a3b8;line-height:1.6;margin-top:16px;">
              Preferencia de noticias: ${wantsNewsletter ? 'ebook + canal diario de IA' : 'somente este ebook'}.
            </p>
          </div>
        `;

    // 2. Emails em paralelo
    await Promise.all([
      // Notificação para Victor
      transporter.sendMail({
        from: `"Vant Business" <${VICTOR_EMAIL}>`,
        to: VICTOR_EMAIL,
        subject: `Novo lead VANT - ${cleanProductTitle}`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
            <h2 style="color:#0f172a;margin-bottom:16px;">Novo lead captado</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:8px 0;color:#64748b;width:140px;">Nome</td>
                <td style="padding:8px 0;font-weight:600;color:#0f172a;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Email</td>
                <td style="padding:8px 0;font-weight:600;color:#0f172a;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">WhatsApp</td>
                <td style="padding:8px 0;font-weight:600;color:#0f172a;">${safeWhatsapp}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Produto</td>
                <td style="padding:8px 0;font-weight:600;color:#0ea5e9;">${safeProductTitle}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Tipo</td>
                <td style="padding:8px 0;color:#475569;">${safeLeadType}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Noticias</td>
                <td style="padding:8px 0;color:#475569;">${wantsNewsletter ? 'sim' : 'nao'}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Origem</td>
                <td style="padding:8px 0;color:#475569;">${safeSource}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Data</td>
                <td style="padding:8px 0;color:#475569;">${new Date(now).toLocaleString('pt-BR')}</td>
              </tr>
            </table>
          </div>
        `,
      }),

      // Confirmação para o inscrito
      transporter.sendMail({
        from: `"Vant Business" <${VICTOR_EMAIL}>`,
        to: cleanEmail,
        subject: subscriberSubject,
        html: subscriberHtml,
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Falha ao processar inscrição' });
  }
}
