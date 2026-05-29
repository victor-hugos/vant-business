function clean(value = '') {
  return String(value || '').trim();
}

export function normalizeWhatsAppNumber(value = '') {
  return clean(value).replace(/\D/g, '');
}

export function buildBriefingWhatsAppMessage(data = {}) {
  const lines = [
    'Ola, Victor. Vim pelo site VANT.Business e quero apresentar meu projeto.',
    '',
    `Nome: ${clean(data.nome) || '-'}`,
    `Empresa/projeto: ${clean(data.empresa) || '-'}`,
    `Email: ${clean(data.email) || '-'}`,
    `WhatsApp: ${clean(data.whatsapp) || '-'}`,
    `Solucao: ${clean(data.solucao) || '-'}`,
    `Momento: ${clean(data.momento) || '-'}`,
    `Objetivo: ${clean(data.objetivo) || '-'}`,
    `Faixa de investimento: ${clean(data.orcamento) || '-'}`,
    '',
    'Briefing:',
    clean(data.descricao) || '-',
  ];

  return lines.join('\n');
}

export function buildBriefingWhatsAppUrl(data = {}, targetNumber = '') {
  const message = buildBriefingWhatsAppMessage(data);
  const phone = normalizeWhatsAppNumber(targetNumber);
  const baseUrl = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
