import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, email, ebook } = req.body;

  if (!email || !nome || !ebook) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  const now = new Date().toISOString();

  try {
    // 1. Salva no Supabase
    await supabase
      .from('subscribers')
      .upsert(
        { nome, email, ebook, created_at: now },
        { onConflict: 'email', ignoreDuplicates: false }
      );

    // 2. Emails em paralelo
    await Promise.all([
      // Notificação para Victor
      transporter.sendMail({
        from: `"Vant Business" <${VICTOR_EMAIL}>`,
        to: VICTOR_EMAIL,
        subject: `📥 Novo inscrito — ${ebook}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
            <h2 style="color:#0f172a;margin-bottom:16px;">Novo inscrito no ebook</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:8px 0;color:#64748b;width:80px;">Nome</td>
                <td style="padding:8px 0;font-weight:600;color:#0f172a;">${nome}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Email</td>
                <td style="padding:8px 0;font-weight:600;color:#0f172a;">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Ebook</td>
                <td style="padding:8px 0;font-weight:600;color:#0ea5e9;">${ebook}</td>
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
        to: email,
        subject: `Seu ebook está pronto, ${nome}!`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#0f172a;color:#f1f5f9;">
            <h2 style="color:#22d3ee;margin-bottom:8px;">Ebook liberado! 📥</h2>
            <p style="color:#94a3b8;line-height:1.6;">
              Olá, ${nome}! Seu ebook está disponível para download no site.
            </p>
            <p style="color:#94a3b8;line-height:1.6;margin-top:16px;">
              Se a página de download não abriu, acesse o tutorial e clique em "Baixar" novamente.
            </p>
            <hr style="border:none;border-top:1px solid #1e293b;margin:24px 0;" />
            <p style="color:#475569;font-size:12px;">
              Você recebeu este email porque se cadastrou em vant.business.<br>
              Só mandamos conteúdo útil sobre IA e automação.
            </p>
          </div>
        `,
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Falha ao processar inscrição' });
  }
}
