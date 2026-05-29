import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizeSubscribePayload } from '../api/subscribe.js';

test('normalizes service leads with digital solution metadata', () => {
  const payload = normalizeSubscribePayload(
    {
      nome: '  Cliente VANT  ',
      email: 'CLIENTE@EXEMPLO.COM ',
      whatsapp: ' (11) 99999-9999 ',
      leadType: 'service',
      ebook: '',
      productTitle: 'Identidade digital e soluções digitais',
      source: 'digital-solutions-page',
      metadata: {
        businessName: 'Studio Exemplo',
        solutionType: 'Identidade digital',
        budgetRange: 'R$ 1.500 a R$ 3.000',
        projectStage: 'Preciso começar do zero',
        message: 'Quero organizar minha presença digital.',
      },
    },
    {
      userAgent: 'node-test',
      referer: 'https://vant.business/automatize',
    }
  );

  assert.equal(payload.cleanName, 'Cliente VANT');
  assert.equal(payload.cleanEmail, 'cliente@exemplo.com');
  assert.equal(payload.cleanWhatsapp, '(11) 99999-9999');
  assert.equal(payload.cleanLeadType, 'service');
  assert.equal(payload.cleanEbook, 'solucoes-digitais');
  assert.equal(payload.cleanProductTitle, 'Identidade digital e soluções digitais');
  assert.equal(payload.wantsNewsletter, false);
  assert.deepEqual(payload.metadata, {
    businessName: 'Studio Exemplo',
    solutionType: 'Identidade digital',
    budgetRange: 'R$ 1.500 a R$ 3.000',
    projectStage: 'Preciso começar do zero',
    message: 'Quero organizar minha presença digital.',
    userAgent: 'node-test',
    referer: 'https://vant.business/automatize',
  });
});

test('normalizes newsletter leads from blog signup into recurring newsletter recipients', () => {
  const payload = normalizeSubscribePayload(
    {
      nome: '  Leitora IA ',
      email: 'LEITORA@EXEMPLO.COM ',
      whatsapp: ' 11988887777 ',
      ebook: 'daily-ai-news',
      productTitle: 'Canal diario de noticias de IA',
      leadType: 'newsletter',
      newsletterOptIn: true,
      source: 'blog-hero',
    },
    {
      userAgent: 'node-test',
      referer: 'https://vant.business/blog',
    }
  );

  assert.equal(payload.cleanName, 'Leitora IA');
  assert.equal(payload.cleanEmail, 'leitora@exemplo.com');
  assert.equal(payload.cleanWhatsapp, '11988887777');
  assert.equal(payload.cleanLeadType, 'newsletter');
  assert.equal(payload.cleanEbook, 'daily-ai-news');
  assert.equal(payload.cleanProductTitle, 'Canal diario de noticias de IA');
  assert.equal(payload.wantsNewsletter, true);
  assert.deepEqual(payload.metadata, {
    userAgent: 'node-test',
    referer: 'https://vant.business/blog',
  });
});

test('normalizes newsletter leads without requiring whatsapp for editorial capture', () => {
  const payload = normalizeSubscribePayload(
    {
      nome: '  Leitora Email ',
      email: 'EMAIL@EXEMPLO.COM ',
      whatsapp: ' ',
      ebook: 'daily-ai-news',
      productTitle: 'Canal diario de noticias de IA',
      leadType: 'newsletter',
      newsletterOptIn: true,
      source: 'blog-hero',
    },
    {
      userAgent: 'node-test',
      referer: 'https://vant.business/blog',
    }
  );

  assert.equal(payload.cleanLeadType, 'newsletter');
  assert.equal(payload.cleanEmail, 'email@exemplo.com');
  assert.equal(payload.cleanWhatsapp, '');
  assert.equal(payload.wantsNewsletter, true);
});

import {
  buildBriefingWhatsAppMessage,
  buildBriefingWhatsAppUrl,
  normalizeWhatsAppNumber,
} from '../src/utils/briefingWhatsApp.js';

test('builds a WhatsApp briefing message from the service form fields', () => {
  const message = buildBriefingWhatsAppMessage({
    nome: 'Cliente VANT',
    empresa: 'Studio Exemplo',
    email: 'cliente@example.com',
    whatsapp: '(11) 99999-9999',
    solucao: 'Site profissional',
    momento: 'Ja tenho algo, mas preciso melhorar',
    objetivo: 'Gerar mais contatos e oportunidades',
    orcamento: 'R$ 1.500 a R$ 3.000',
    descricao: 'Preciso organizar minha presenca digital.',
  });

  assert.match(message, /VANT\.Business/);
  assert.match(message, /Nome: Cliente VANT/);
  assert.match(message, /Empresa\/projeto: Studio Exemplo/);
  assert.match(message, /Solucao: Site profissional/);
  assert.match(message, /Briefing:\nPreciso organizar minha presenca digital\./);
});

test('builds a WhatsApp URL with an optional target number and encoded briefing', () => {
  const url = buildBriefingWhatsAppUrl(
    {
      nome: 'Cliente VANT',
      empresa: 'Studio Exemplo',
      descricao: 'Quero conversar sobre o projeto.',
    },
    '+55 (11) 99999-0000'
  );

  assert.equal(normalizeWhatsAppNumber('+55 (11) 99999-0000'), '5511999990000');
  assert.ok(url.startsWith('https://wa.me/5511999990000?text='));
  assert.ok(decodeURIComponent(url).includes('Empresa/projeto: Studio Exemplo'));
});
