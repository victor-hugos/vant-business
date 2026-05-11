import { escapeHtml, sendEmail } from './_email.js';
import { getLeadMagnet } from './_leadMagnets.js';
import { storeLead } from './_supabase.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseBody(req) {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body || '{}');
  }
  return req.body || {};
}

function renderUserEmail({ name, product }) {
  const safeName = escapeHtml(name);
  const safeTitle = escapeHtml(product.title);

  if (product.type === 'newsletter') {
    return `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h1>Bem-vindo, ${safeName}.</h1>
        <p>Voce entrou na lista da VANT Business para receber as 10 melhores noticias de IA por dia.</p>
        <p>Os envios vao priorizar ferramentas, automacao, produtos, mercado e oportunidades praticas.</p>
        <p>Se quiser responder com alguma sugestao de tema, basta falar por este email.</p>
      </div>
    `;
  }

  const deliveryBlock = product.deliveryUrl
    ? `<p><a href="${escapeHtml(product.deliveryUrl)}" style="color:#0891b2;font-weight:700">Acessar ${safeTitle}</a></p>`
    : '<p>O material esta registrado para entrega. Assim que o arquivo final estiver publicado, voce recebe o link por aqui.</p>';

  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1>${safeName}, aqui esta seu material.</h1>
      <p>Voce solicitou: <strong>${safeTitle}</strong>.</p>
      ${deliveryBlock}
      <p>Este material faz parte da base de IA da VANT Business.</p>
    </div>
  `;
}

function renderAdminEmail({ name, email, whatsapp, product, source }) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1>Novo lead capturado</h1>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
      <p><strong>Produto:</strong> ${escapeHtml(product.title)}</p>
      <p><strong>Origem:</strong> ${escapeHtml(source)}</p>
    </div>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo nao permitido.' });
  }

  try {
    const body = parseBody(req);
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const whatsapp = String(body.whatsapp || '').trim();
    const productId = String(body.productId || '').trim();
    const source = String(body.source || 'site').trim();
    const consent = Boolean(body.consent);
    const honeypot = String(body.company || '').trim();
    const product = getLeadMagnet(productId);

    if (honeypot) {
      return res.status(200).json({ ok: true });
    }

    if (!name || !emailPattern.test(email) || !whatsapp || !product || !consent) {
      return res.status(400).json({ error: 'Preencha nome, email, WhatsApp e consentimento.' });
    }

    await storeLead({
      name,
      email,
      whatsapp,
      product_id: product.id,
      product_title: product.title,
      product_type: product.type,
      source,
      consent: true,
      metadata: {
        userAgent: req.headers['user-agent'] || '',
        referrer: req.headers.referer || '',
      },
    });

    await sendEmail({
      to: email,
      subject: product.emailSubject,
      html: renderUserEmail({ name, product }),
    });

    if (process.env.ADMIN_LEADS_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_LEADS_EMAIL,
        subject: `Novo lead: ${product.title}`,
        html: renderAdminEmail({ name, email, whatsapp, product, source }),
      });
    }

    return res.status(200).json({ ok: true, productId: product.id });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Erro interno.' });
  }
}
