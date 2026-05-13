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
