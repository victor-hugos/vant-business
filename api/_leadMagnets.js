export const leadMagnets = {
  'daily-ai-news': {
    id: 'daily-ai-news',
    type: 'newsletter',
    title: '10 melhores noticias de IA por dia',
    emailSubject: 'Voce entrou na lista das melhores noticias de IA',
    deliveryUrl: '',
  },
  'ebook-ia-tools-starter': {
    id: 'ebook-ia-tools-starter',
    type: 'ebook',
    title: 'Guia inicial de ferramentas de IA para ganhar tempo',
    emailSubject: 'Seu ebook: Guia inicial de ferramentas de IA',
    deliveryUrl: process.env.EBOOK_IA_TOOLS_URL || '',
  },
  'ebook-automacao-leads': {
    id: 'ebook-automacao-leads',
    type: 'ebook',
    title: 'Checklist de automacao de leads para pequenos negocios',
    emailSubject: 'Seu ebook: Checklist de automacao de leads',
    deliveryUrl: process.env.EBOOK_AUTOMACAO_LEADS_URL || '',
  },
};

export function getLeadMagnet(productId) {
  return leadMagnets[productId] || null;
}
