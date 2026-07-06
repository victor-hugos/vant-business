function normalizeText(value = '') {
  return String(value || '').trim();
}

function normalizeEmail(value = '') {
  return normalizeText(value).toLowerCase();
}

function clientKeyForLead(lead = {}) {
  const email = normalizeEmail(lead.email);
  if (email) return `email:${email}`;

  const whatsapp = normalizeText(lead.whatsapp).replace(/\D/g, '');
  if (whatsapp) return `whatsapp:${whatsapp}`;

  return `lead:${lead.id || normalizeText(lead.nome) || 'sem-identificacao'}`;
}

function sortByNewest(a = {}, b = {}) {
  return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
}

function latestResponse(client = {}) {
  return (client.responses || [])[0] || {};
}

function isColdBudget(value = '') {
  const budget = normalizeText(value).toLowerCase();
  return budget.includes('ainda quero entender') || budget.includes('ate r$ 1.500') || budget.includes('até r$ 1.500');
}

function isWarmBudget(value = '') {
  const budget = normalizeText(value).toLowerCase();
  return budget.includes('1.500') || budget.includes('3.000') || budget.includes('6.000') || budget.includes('acima');
}

function hasUnknownSolution(value = '') {
  const solution = normalizeText(value).toLowerCase();
  return !solution || solution.includes('ainda nao sei') || solution.includes('ainda não sei');
}

function getProjectName(client = {}) {
  const lead = latestResponse(client);
  const metadata = lead.metadata || {};
  return normalizeText(metadata.businessName) || normalizeText(lead.product_title) || client.name || 'Projeto sem nome';
}

export const clientJourneyLanes = [
  {
    id: 'new',
    label: 'Entrada',
    description: 'Lead novo com briefing recebido.',
  },
  {
    id: 'triage',
    label: 'Triagem',
    description: 'Falta dado ou validacao antes de decidir rota.',
  },
  {
    id: 'proposal',
    label: 'Proposta',
    description: 'Demanda com fit para preparar proposta.',
  },
  {
    id: 'remarketing',
    label: 'Remarketing',
    description: 'Lead frio, indefinido ou sem prioridade comercial agora.',
  },
  {
    id: 'presentation',
    label: 'Apresentacao',
    description: 'Etapa seguinte apos proposta pronta.',
  },
];

export function getClientJourney(client = {}) {
  const lead = latestResponse(client);
  const metadata = lead.metadata || {};
  const missing = [];

  if (!client.email) missing.push('email');
  if (!client.whatsapp) missing.push('WhatsApp');
  if (!normalizeText(metadata.solutionType)) missing.push('solucao');
  if (!normalizeText(metadata.projectStage)) missing.push('momento');
  if (!normalizeText(metadata.budgetRange)) missing.push('investimento');
  if (!normalizeText(metadata.message)) missing.push('descricao');

  if (missing.length > 0) {
    return {
      lane: 'triage',
      label: 'Triagem',
      tone: 'amber',
      nextAction: `Pedir ${missing.slice(0, 2).join(' e ')} antes de proposta.`,
      missing,
      progress: 40,
    };
  }

  if (isColdBudget(metadata.budgetRange) || hasUnknownSolution(metadata.solutionType)) {
    return {
      lane: 'remarketing',
      label: 'Remarketing',
      tone: 'slate',
      nextAction: 'Nutrir com diagnostico, prova de valor ou conversa curta antes de proposta.',
      missing: [],
      progress: 55,
    };
  }

  if (isWarmBudget(metadata.budgetRange)) {
    return {
      lane: 'proposal',
      label: 'Proposta',
      tone: 'emerald',
      nextAction: 'Preparar proposta e agendar apresentacao.',
      missing: [],
      progress: 75,
    };
  }

  return {
    lane: 'new',
    label: 'Entrada',
    tone: 'cyan',
    nextAction: 'Revisar briefing recebido e confirmar proximo passo.',
    missing: [],
    progress: 25,
  };
}

export function groupBriefingResponsesByClient(leads = []) {
  const serviceLeads = leads
    .filter((lead) => normalizeText(lead.lead_type).toLowerCase() === 'service')
    .sort(sortByNewest);

  const grouped = new Map();

  serviceLeads.forEach((lead) => {
    const key = clientKeyForLead(lead);
    const email = normalizeEmail(lead.email);
    const current = grouped.get(key);

    if (!current) {
      grouped.set(key, {
        key,
        name: normalizeText(lead.nome) || 'Cliente sem nome',
        email,
        whatsapp: normalizeText(lead.whatsapp),
        latestAt: lead.created_at || null,
        responses: [lead],
      });
      return;
    }

    current.responses.push(lead);

    if (sortByNewest(lead, { created_at: current.latestAt }) < 0) {
      current.name = normalizeText(lead.nome) || current.name;
      current.email = email || current.email;
      current.whatsapp = normalizeText(lead.whatsapp) || current.whatsapp;
      current.latestAt = lead.created_at || current.latestAt;
    }
  });

  return [...grouped.values()]
    .map((client) => ({
      ...client,
      responses: client.responses.sort(sortByNewest),
    }))
    .map((client) => ({
      ...client,
      journey: getClientJourney(client),
    }))
    .sort((a, b) => sortByNewest({ created_at: a.latestAt }, { created_at: b.latestAt }));
}

export function buildClientProjectPipeline(clients = []) {
  return clientJourneyLanes.map((lane) => ({
    ...lane,
    clients: clients
      .filter((client) => client.journey?.lane === lane.id)
      .map((client) => ({
        ...client,
        projectName: getProjectName(client),
      })),
  }));
}

export function getPipelineProgressSummary(clients = []) {
  const totalProgress = clients.reduce((sum, client) => sum + (client.journey?.progress || 0), 0);
  const totalProjects = clients.length;

  return {
    totalProjects,
    averageProgress: totalProjects ? Math.round(totalProgress / totalProjects) : 0,
    steps: clientJourneyLanes.map((lane) => ({
      ...lane,
      count: clients.filter((client) => client.journey?.lane === lane.id).length,
    })),
  };
}
