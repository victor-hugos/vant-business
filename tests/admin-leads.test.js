import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildClientProjectPipeline,
  clientJourneyProgressPoints,
  getClientJourney,
  getNextJourneyStatus,
  getPreviousJourneyStatus,
  getPipelineProgressSummary,
  groupBriefingResponsesByClient,
} from '../src/utils/adminLeads.js';

test('defines the visible progress points for the client journey ruler', () => {
  assert.deepEqual(
    clientJourneyProgressPoints.map((point) => [point.id, point.progress]),
    [
      ['new', 0],
      ['triage', 33],
      ['proposal', 66],
      ['presentation', 100],
    ]
  );
});

test('groups service briefing responses by client without dropping repeated answers', () => {
  const grouped = groupBriefingResponsesByClient([
    {
      id: 'lead-older',
      nome: 'Cliente VANT',
      email: 'cliente@exemplo.com',
      whatsapp: '11999999999',
      lead_type: 'service',
      product_title: 'Site profissional',
      metadata: { message: 'Primeira resposta' },
      created_at: '2026-05-01T10:00:00.000Z',
    },
    {
      id: 'lead-newsletter',
      nome: 'Cliente VANT',
      email: 'cliente@exemplo.com',
      lead_type: 'newsletter',
      created_at: '2026-05-01T09:00:00.000Z',
    },
    {
      id: 'lead-newer',
      nome: 'Cliente Atualizado',
      email: 'CLIENTE@EXEMPLO.COM',
      whatsapp: '11999999999',
      lead_type: 'service',
      product_title: 'Identidade digital',
      metadata: { message: 'Segunda resposta' },
      created_at: '2026-05-03T10:00:00.000Z',
    },
  ]);

  assert.equal(grouped.length, 1);
  assert.equal(grouped[0].name, 'Cliente Atualizado');
  assert.equal(grouped[0].email, 'cliente@exemplo.com');
  assert.equal(grouped[0].responses.length, 2);
  assert.deepEqual(
    grouped[0].responses.map((response) => response.id),
    ['lead-newer', 'lead-older']
  );
});

test('classifies clients into proposal, triage, and remarketing journey lanes', () => {
  const [proposalClient, remarketingClient, triageClient] = groupBriefingResponsesByClient([
    {
      id: 'proposal',
      nome: 'Cliente Proposta',
      email: 'proposta@exemplo.com',
      whatsapp: '11999999999',
      lead_type: 'service',
      metadata: {
        solutionType: 'Site profissional',
        projectStage: 'Tenho uma demanda urgente',
        budgetRange: 'R$ 3.000 a R$ 6.000',
        message: 'Preciso apresentar melhor minha empresa.',
      },
      created_at: '2026-05-04T10:00:00.000Z',
    },
    {
      id: 'remarketing',
      nome: 'Cliente Remarketing',
      email: 'remarketing@exemplo.com',
      whatsapp: '11888888888',
      lead_type: 'service',
      metadata: {
        solutionType: 'Ainda nao sei',
        projectStage: 'Preciso comecar do zero',
        budgetRange: 'Ainda quero entender valores',
        message: 'Quero conhecer as possibilidades.',
      },
      created_at: '2026-05-03T10:00:00.000Z',
    },
    {
      id: 'triage',
      nome: 'Cliente Triagem',
      email: 'triagem@exemplo.com',
      lead_type: 'service',
      metadata: {
        solutionType: 'Presenca digital e identidade',
        budgetRange: 'R$ 1.500 a R$ 3.000',
      },
      created_at: '2026-05-02T10:00:00.000Z',
    },
  ]);

  assert.equal(getClientJourney(proposalClient).lane, 'proposal');
  assert.equal(getClientJourney(remarketingClient).lane, 'remarketing');
  assert.equal(getClientJourney(triageClient).lane, 'triage');
});

test('builds a project pipeline with clients grouped under journey lanes', () => {
  const clients = groupBriefingResponsesByClient([
    {
      id: 'proposal',
      nome: 'Cliente Proposta',
      email: 'proposta@exemplo.com',
      whatsapp: '11999999999',
      lead_type: 'service',
      metadata: {
        businessName: 'Studio Proposta',
        solutionType: 'Site profissional',
        projectStage: 'Tenho uma demanda urgente',
        budgetRange: 'R$ 3.000 a R$ 6.000',
        message: 'Preciso apresentar melhor minha empresa.',
      },
      created_at: '2026-05-04T10:00:00.000Z',
    },
    {
      id: 'triage',
      nome: 'Cliente Triagem',
      email: 'triagem@exemplo.com',
      lead_type: 'service',
      metadata: {
        solutionType: 'Presenca digital e identidade',
        budgetRange: 'R$ 1.500 a R$ 3.000',
      },
      created_at: '2026-05-02T10:00:00.000Z',
    },
  ]);

  const pipeline = buildClientProjectPipeline(clients);

  assert.equal(pipeline.find((lane) => lane.id === 'proposal').clients[0].projectName, 'Studio Proposta');
  assert.equal(pipeline.find((lane) => lane.id === 'triage').clients[0].projectName, 'Cliente Triagem');
  assert.deepEqual(
    pipeline.map((lane) => lane.id),
    ['new', 'triage', 'proposal', 'remarketing', 'presentation']
  );
});

test('summarizes project journey progress for the admin progress bar', () => {
  const clients = groupBriefingResponsesByClient([
    {
      id: 'proposal',
      nome: 'Cliente Proposta',
      email: 'proposta@exemplo.com',
      whatsapp: '11999999999',
      lead_type: 'service',
      metadata: {
        solutionType: 'Site profissional',
        projectStage: 'Tenho uma demanda urgente',
        budgetRange: 'R$ 3.000 a R$ 6.000',
        message: 'Preciso apresentar melhor minha empresa.',
      },
      created_at: '2026-05-04T10:00:00.000Z',
    },
    {
      id: 'triage',
      nome: 'Cliente Triagem',
      email: 'triagem@exemplo.com',
      lead_type: 'service',
      metadata: {
        solutionType: 'Presenca digital e identidade',
        budgetRange: 'R$ 1.500 a R$ 3.000',
      },
      created_at: '2026-05-02T10:00:00.000Z',
    },
  ]);

  const summary = getPipelineProgressSummary(clients);

  assert.equal(summary.averageProgress, 50);
  assert.equal(summary.totalProjects, 2);
  assert.equal(summary.steps.find((step) => step.id === 'proposal').count, 1);
  assert.equal(summary.steps.find((step) => step.id === 'triage').count, 1);
});

test('uses a manual admin status before automatic journey classification', () => {
  const [client] = groupBriefingResponsesByClient([
    {
      id: 'manual',
      nome: 'Cliente Manual',
      email: 'manual@exemplo.com',
      whatsapp: '11999999999',
      lead_type: 'service',
      metadata: {
        adminJourneyStatus: 'presentation',
        adminNote: 'Proposta ja foi apresentada por WhatsApp.',
        solutionType: 'Ainda nao sei',
        projectStage: 'Preciso comecar do zero',
        budgetRange: 'Ainda quero entender valores',
        message: 'Quero entender possibilidades.',
      },
      created_at: '2026-05-04T10:00:00.000Z',
    },
  ]);

  assert.equal(client.journey.lane, 'presentation');
  assert.equal(client.journey.progress, 100);
  assert.equal(client.journey.note, 'Proposta ja foi apresentada por WhatsApp.');
});

test('moves leads forward and backward through the sales funnel stages', () => {
  assert.equal(getNextJourneyStatus('new'), 'triage');
  assert.equal(getNextJourneyStatus('proposal'), 'remarketing');
  assert.equal(getNextJourneyStatus('presentation'), 'presentation');

  assert.equal(getPreviousJourneyStatus('proposal'), 'triage');
  assert.equal(getPreviousJourneyStatus('new'), 'new');
});
