import { sendEmail } from '../api/_email.js';

const recipient = process.argv[2] || process.env.TEST_EMAIL_TO || process.env.SMTP_USER;

if (!recipient) {
  console.error('Informe um destinatario: npm run test:email -- seu@email.com');
  process.exit(1);
}

try {
  const result = await sendEmail({
    to: recipient,
    subject: 'Teste SMTP Hostinger - VANT Business',
    html: `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h1>SMTP conectado.</h1>
        <p>Este email confirma que o envio pelo dominio da VANT Business esta funcionando.</p>
      </div>
    `,
  });

  console.log('Email enviado com sucesso.');
  console.log(result);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
