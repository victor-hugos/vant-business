const DEFAULT_CRITERIA = {
  windowDays: 14,
  serviceLeadThreshold: 3,
  repeatedPainThreshold: 2,
  operationalInterestThreshold: 3,
};

const painKeywords = [
  'whatsapp',
  'atendimento',
  'contato',
  'contatos',
  'lead',
  'leads',
  'triagem',
  'follow-up',
  'follow up',
  'perda de contatos',
  'perde contato',
  'perdem contatos',
  'pergunta repetida',
  'perguntas repetidas',
];

const interestKeywords = [
  'whatsapp',
  'lead',
  'leads',
  'automacao',
  'automação',
  'captura',
  'atendimento',
  'triagem',
  'follow-up',
  'follow up',
];

const commercialRouteHints = [
  'solucoes-digitais',
  'automatize',
  'digital-solutions',
  'briefing',
  'projeto',
  'project',
  'service',
];

const explicitOperationalContextHints = [
  'operacao',
  'operacional',
  'whatsapp',
  'leadflow',
  'triagem',
  'follow-up',
  'follow up',
];

function toTimestamp(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function isWithinWindow(value, now, windowDays) {
  const timestamp = toTimestamp(value);
  const end = toTimestamp(now) || Date.now();
  if (!timestamp) return false;
  return timestamp >= end - windowDays * 24 * 60 * 60 * 1000;
}

function includesKeyword(text, keywords) {
  const normalized = normalizeText(text);
  return keywords.some((keyword) => normalized.includes(normalizeText(keyword)));
}

function getLeadPainText(lead = {}) {
  return [
    lead.product_title,
    lead.ebook,
    lead.source,
    lead.metadata?.solutionType,
    lead.metadata?.message,
  ]
    .filter(Boolean)
    .join(' ');
}

function getClickInterestText(click = {}) {
  return [
    click.item_title,
    click.item_id,
    click.source,
    click.path,
    click.target_url,
  ]
    .filter(Boolean)
    .join(' ');
}

function getClickContextText(click = {}) {
  return [
    click.source,
    click.path,
    click.target_url,
  ]
    .filter(Boolean)
    .join(' ');
}

function isCommercialIntentClick(click = {}) {
  return includesKeyword(getClickContextText(click), commercialRouteHints);
}

function isOperationalContextClick(click = {}) {
  return includesKeyword(getClickContextText(click), explicitOperationalContextHints);
}

export function getDefaultOfferTriggerCriteria() {
  return { ...DEFAULT_CRITERIA };
}

export function getOfferTriggerCriteriaFromSettings(settings = {}) {
  const defaults = getDefaultOfferTriggerCriteria();
  const toNumber = (value, fallback) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) && numeric > 0 ? numeric : fallback;
  };

  return {
    windowDays: toNumber(settings.offer_trigger_window_days?.value, defaults.windowDays),
    serviceLeadThreshold: toNumber(settings.offer_trigger_service_leads?.value, defaults.serviceLeadThreshold),
    repeatedPainThreshold: toNumber(settings.offer_trigger_repeated_pain?.value, defaults.repeatedPainThreshold),
    operationalInterestThreshold: toNumber(settings.offer_trigger_operational_interest?.value, defaults.operationalInterestThreshold),
  };
}

export function evaluateOfferTrigger({
  criteria = DEFAULT_CRITERIA,
  subscribers = [],
  clicks = [],
  now = new Date().toISOString(),
} = {}) {
  const mergedCriteria = {
    ...DEFAULT_CRITERIA,
    ...criteria,
  };

  const recentServiceLeads = subscribers.filter((lead) => {
    return lead.lead_type === 'service' && isWithinWindow(lead.created_at, now, mergedCriteria.windowDays);
  });

  const repeatedPainLeads = recentServiceLeads.filter((lead) => includesKeyword(getLeadPainText(lead), painKeywords));
  const recentOperationalClicks = clicks.filter((click) => {
    if (!isWithinWindow(click.created_at, now, mergedCriteria.windowDays)) {
      return false;
    }

    if (isCommercialIntentClick(click)) {
      return true;
    }

    return isOperationalContextClick(click)
      && includesKeyword(getClickInterestText(click), interestKeywords);
  });

  const signals = {
    serviceLeads: {
      label: 'Leads comerciais recorrentes',
      value: recentServiceLeads.length,
      threshold: mergedCriteria.serviceLeadThreshold,
      met: recentServiceLeads.length >= mergedCriteria.serviceLeadThreshold,
      details: recentServiceLeads.slice(0, 5).map((lead) => ({
        id: lead.id,
        source: lead.source,
        createdAt: lead.created_at,
      })),
    },
    repeatedPain: {
      label: 'Dor repetida de atendimento/captacao',
      value: repeatedPainLeads.length,
      threshold: mergedCriteria.repeatedPainThreshold,
      met: repeatedPainLeads.length >= mergedCriteria.repeatedPainThreshold,
      details: repeatedPainLeads.slice(0, 5).map((lead) => ({
        id: lead.id,
        summary: getLeadPainText(lead),
        createdAt: lead.created_at,
      })),
    },
    operationalInterest: {
      label: 'Interesse em operacao',
      value: recentOperationalClicks.length,
      threshold: mergedCriteria.operationalInterestThreshold,
      met: recentOperationalClicks.length >= mergedCriteria.operationalInterestThreshold,
      details: recentOperationalClicks.slice(0, 5).map((click) => ({
        id: click.id,
        title: click.item_title || click.item_id,
        source: click.source,
        createdAt: click.created_at,
      })),
    },
  };

  const metSignals = Object.values(signals).filter((signal) => signal.met).length;
  const totalSignals = Object.values(signals).length;

  let status = 'ainda_nao';
  if (metSignals === totalSignals) status = 'gatilho_batido';
  else if (metSignals >= totalSignals - 1) status = 'quase_pronto';

  return {
    status,
    criteria: mergedCriteria,
    summary: {
      metSignals,
      totalSignals,
      windowDays: mergedCriteria.windowDays,
    },
    signals,
  };
}
