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

test('normalizes content leads with email ebooks and whatsapp news preferences at the same time', () => {
  const payload = normalizeSubscribePayload(
    {
      nome: '  Radar IA ',
      email: 'RADAR@EXEMPLO.COM ',
      whatsapp: ' 11 98888-7777 ',
      ebook: 'vant-news-access',
      productTitle: 'Noticias diarias no WhatsApp + ebooks gratuitos por email',
      leadType: 'content',
      emailEbooksOptIn: true,
      whatsappNewsOptIn: true,
      source: 'blog-dual-signup',
    },
    {
      userAgent: 'node-test',
      referer: 'https://vant.business/blog',
    }
  );

  assert.equal(payload.cleanLeadType, 'content');
  assert.equal(payload.cleanEmail, 'radar@exemplo.com');
  assert.equal(payload.cleanWhatsapp, '11 98888-7777');
  assert.equal(payload.wantsNewsletter, false);
  assert.equal(payload.wantsEmailEbooks, true);
  assert.equal(payload.wantsWhatsappNews, true);
});

test('allows whatsapp-only content leads without forcing an email address', () => {
  const payload = normalizeSubscribePayload(
    {
      nome: '  Grupo IA ',
      email: ' ',
      whatsapp: ' 11977776666 ',
      ebook: 'vant-news-access',
      productTitle: 'Grupo de WhatsApp com noticias diarias sobre IA',
      leadType: 'content',
      whatsappNewsOptIn: true,
      source: 'blog-dual-signup',
    },
    {
      userAgent: 'node-test',
      referer: 'https://vant.business/blog',
    }
  );

  assert.equal(payload.cleanLeadType, 'content');
  assert.equal(payload.cleanEmail, '');
  assert.equal(payload.cleanWhatsapp, '11977776666');
  assert.equal(payload.wantsEmailEbooks, false);
  assert.equal(payload.wantsWhatsappNews, true);
});
