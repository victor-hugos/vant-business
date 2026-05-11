import nodemailer from 'nodemailer';

const resendEndpoint = 'https://api.resend.com/emails';

export function requiredEmailEnv() {
  return Boolean(hasSmtpEnv() || hasLegacyHostingerEnv() || hasResendEnv());
}

function hasSmtpEnv() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.EMAIL_FROM,
  );
}

function hasResendEnv() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

function hasLegacyHostingerEnv() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
}

function smtpSecure() {
  if (process.env.SMTP_SECURE) {
    return process.env.SMTP_SECURE === 'true';
  }

  return Number(process.env.SMTP_PORT) === 465;
}

async function sendWithSmtp({ to, subject, html }) {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM || `VANT Business <${user}>`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: smtpSecure(),
    auth: {
      user,
      pass,
    },
  });

  return transporter.sendMail({
    from,
    to,
    replyTo: process.env.EMAIL_REPLY_TO || user,
    subject,
    html,
  });
}

export async function sendEmail({ to, subject, html }) {
  if (!requiredEmailEnv()) {
    throw new Error(
      'Email nao configurado. Defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e EMAIL_FROM.',
    );
  }

  if (hasSmtpEnv() || hasLegacyHostingerEnv()) {
    return sendWithSmtp({ to, subject, html });
  }

  const response = await fetch(resendEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [to],
      reply_to: process.env.EMAIL_REPLY_TO || 'admin@vant.business',
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao enviar email: ${errorText}`);
  }

  return response.json();
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
