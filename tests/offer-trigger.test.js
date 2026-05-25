import assert from 'node:assert/strict';
import test from 'node:test';

import { evaluateOfferTrigger, getDefaultOfferTriggerCriteria, getOfferTriggerCriteriaFromSettings } from '../src/utils/offerTrigger.js';

test('marks trigger as hit when service leads, repeated pain, and operational interest all meet recommended thresholds', () => {
  const criteria = getDefaultOfferTriggerCriteria();
  const now = '2026-05-25T12:00:00.000Z';
  const subscribers = [
    {
      id: 'lead-1',
      lead_type: 'service',
      source: 'digital-solutions-page',
      created_at: '2026-05-24T09:00:00.000Z',
      metadata: {
        message: 'Nosso atendimento no WhatsApp esta lento e varios contatos se perdem sem follow-up.',
        solutionType: 'Sistema ou integracao',
      },
    },
    {
      id: 'lead-2',
      lead_type: 'service',
      source: 'digital-solutions-page',
      created_at: '2026-05-23T09:00:00.000Z',
      metadata: {
        message: 'Temos perguntas repetidas e falta triagem no WhatsApp.',
        solutionType: 'Sistema ou integracao',
      },
    },
    {
      id: 'lead-3',
      lead_type: 'service',
      source: 'digital-solutions-page',
      created_at: '2026-05-22T09:00:00.000Z',
      metadata: {
        message: 'Precisamos organizar melhor os leads e o atendimento.',
        solutionType: 'Sistema ou integracao',
      },
    },
  ];

  const clicks = [
    {
      id: 'click-1',
      item_title: 'Checklist de automacao de leads',
      source: 'blog-operacao',
      path: '/blog/automacao-de-leads',
      target_url: 'https://vant.business/ebook/checklist-automacao',
      created_at: '2026-05-24T15:00:00.000Z',
    },
    {
      id: 'click-2',
      item_title: 'Fluxo de WhatsApp para atendimento',
      source: 'home-operacao',
      path: '/blog/fluxo-whatsapp',
      target_url: 'https://vant.business/blog/fluxo-whatsapp',
      created_at: '2026-05-23T15:00:00.000Z',
    },
    {
      id: 'click-3',
      item_title: 'Captura de leads para negocios locais',
      source: 'ebook-operacao',
      path: '/ebook/captura-leads',
      target_url: 'https://vant.business/ebook/captura-leads',
      created_at: '2026-05-22T15:00:00.000Z',
    },
  ];

  const result = evaluateOfferTrigger({ criteria, subscribers, clicks, now });

  assert.equal(result.status, 'gatilho_batido');
  assert.equal(result.summary.metSignals, 3);
  assert.equal(result.signals.serviceLeads.met, true);
  assert.equal(result.signals.repeatedPain.met, true);
  assert.equal(result.signals.operationalInterest.met, true);
});

test('keeps trigger as almost ready when only two core signals are met', () => {
  const criteria = getDefaultOfferTriggerCriteria();
  const now = '2026-05-25T12:00:00.000Z';
  const subscribers = [
    {
      id: 'lead-1',
      lead_type: 'service',
      source: 'digital-solutions-page',
      created_at: '2026-05-24T09:00:00.000Z',
      metadata: {
        message: 'Atendimento lento no WhatsApp e perda de contatos.',
      },
    },
    {
      id: 'lead-2',
      lead_type: 'service',
      source: 'digital-solutions-page',
      created_at: '2026-05-23T09:00:00.000Z',
      metadata: {
        message: 'Falta follow-up e triagem.',
      },
    },
    {
      id: 'lead-3',
      lead_type: 'service',
      source: 'digital-solutions-page',
      created_at: '2026-05-22T09:00:00.000Z',
      metadata: {
        message: 'Quero organizar melhor o atendimento.',
      },
    },
  ];

  const clicks = [
    {
      id: 'click-1',
      item_title: 'Home institucional',
      source: 'home',
      path: '/',
      target_url: 'https://vant.business/solucoes-digitais',
      created_at: '2026-05-24T15:00:00.000Z',
    },
  ];

  const result = evaluateOfferTrigger({ criteria, subscribers, clicks, now });

  assert.equal(result.status, 'quase_pronto');
  assert.equal(result.summary.metSignals, 2);
  assert.equal(result.signals.operationalInterest.met, false);
});


test('ignores editorial clicks that mention leads but do not show commercial or operational intent', () => {
  const criteria = {
    ...getDefaultOfferTriggerCriteria(),
    operationalInterestThreshold: 1,
  };
  const now = '2026-05-25T12:00:00.000Z';

  const result = evaluateOfferTrigger({
    criteria,
    now,
    subscribers: [],
    clicks: [
      {
        id: 'click-editorial-1',
        item_title: 'Como usar IA para gerar mais leads',
        source: 'blog-hero',
        path: '/blog/como-usar-ia-para-gerar-leads',
        target_url: 'https://vant.business/blog/como-usar-ia-para-gerar-leads',
        created_at: '2026-05-24T15:00:00.000Z',
      },
    ],
  });

  assert.equal(result.signals.operationalInterest.met, false);
  assert.equal(result.signals.operationalInterest.value, 0);
});

test('counts commercial clicks into digital solutions even when the CTA copy is generic', () => {
  const criteria = {
    ...getDefaultOfferTriggerCriteria(),
    operationalInterestThreshold: 1,
  };
  const now = '2026-05-25T12:00:00.000Z';

  const result = evaluateOfferTrigger({
    criteria,
    now,
    subscribers: [],
    clicks: [
      {
        id: 'click-commercial-1',
        item_title: 'Apresentar meu projeto',
        source: 'home-hero-primary-cta',
        path: '/',
        target_url: 'https://vant.business/solucoes-digitais',
        created_at: '2026-05-24T15:00:00.000Z',
      },
    ],
  });

  assert.equal(result.signals.operationalInterest.met, true);
  assert.equal(result.signals.operationalInterest.value, 1);
});

test('reads offer trigger criteria from saved site settings', () => {
  const criteria = getOfferTriggerCriteriaFromSettings({
    offer_trigger_window_days: { value: '21' },
    offer_trigger_service_leads: { value: '5' },
    offer_trigger_repeated_pain: { value: '4' },
    offer_trigger_operational_interest: { value: '6' },
  });

  assert.deepEqual(criteria, {
    windowDays: 21,
    serviceLeadThreshold: 5,
    repeatedPainThreshold: 4,
    operationalInterestThreshold: 6,
  });
});
