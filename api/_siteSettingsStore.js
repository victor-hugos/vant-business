import { getSupabaseAdmin } from './_supabaseAdmin.js';
import { getDefaultOfferTriggerCriteria } from '../src/utils/offerTrigger.js';

export function buildDefaultSiteSettings() {
  const offerTrigger = getDefaultOfferTriggerCriteria();

  return {
    whatsapp_news_group_url: {
      key: 'whatsapp_news_group_url',
      label: 'Grupo de noticias no WhatsApp',
      description: 'Link do grupo ou canal usado na captura da pagina de noticias.',
      value: process.env.WHATSAPP_NEWS_GROUP_URL || 'https://chat.whatsapp.com/HFCVesJ5SZW8SfkP4WTvWo?mode=gi_t',
    },
    offer_trigger_window_days: {
      key: 'offer_trigger_window_days',
      label: 'Janela do gatilho em dias',
      description: 'Quantos dias olhar para os sinais da oferta WhatsApp + leads.',
      value: String(offerTrigger.windowDays),
    },
    offer_trigger_service_leads: {
      key: 'offer_trigger_service_leads',
      label: 'Leads service para o gatilho',
      description: 'Quantidade recomendada de leads comerciais para considerar recorrencia.',
      value: String(offerTrigger.serviceLeadThreshold),
    },
    offer_trigger_repeated_pain: {
      key: 'offer_trigger_repeated_pain',
      label: 'Dores repetidas para o gatilho',
      description: 'Quantidade recomendada de briefs com dor repetida de atendimento/captacao.',
      value: String(offerTrigger.repeatedPainThreshold),
    },
    offer_trigger_operational_interest: {
      key: 'offer_trigger_operational_interest',
      label: 'Interesse operacional para o gatilho',
      description: 'Quantidade recomendada de sinais de clique/interesse operacional.',
      value: String(offerTrigger.operationalInterestThreshold),
    },
  };
}

export function buildSiteSettingsMap(defaults = {}, overrides = []) {
  const merged = { ...defaults };

  for (const override of overrides) {
    if (!override?.key) continue;
    const current = merged[override.key] || { key: override.key };
    merged[override.key] = {
      ...current,
      ...override,
      value: typeof override.value === 'string' ? override.value.trim() : override.value || '',
    };
  }

  return merged;
}

export function getSiteSettingValue(settings = {}, key, fallback = '') {
  const value = settings?.[key]?.value;
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  return fallback;
}

function normalizeSiteSettingRow(row = {}) {
  return {
    key: row.key,
    label: row.label || row.key,
    description: row.description || '',
    value: typeof row.value === 'string' ? row.value.trim() : row.value || '',
    updatedAt: row.updated_at || null,
  };
}

export async function getSiteSettings() {
  const defaults = buildDefaultSiteSettings();
  const supabase = getSupabaseAdmin();
  const warnings = [];

  if (!supabase) {
    return {
      items: Object.values(defaults),
      map: defaults,
      warnings,
    };
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('key,label,description,value,updated_at');

  if (error) {
    warnings.push(error.message);
    return {
      items: Object.values(defaults),
      map: defaults,
      warnings,
    };
  }

  const map = buildSiteSettingsMap(defaults, (data || []).map(normalizeSiteSettingRow));

  return {
    items: Object.values(map),
    map,
    warnings,
  };
}

export async function upsertSiteSetting(setting = {}) {
  const supabase = getSupabaseAdmin();
  const normalized = {
    key: String(setting.key || '').trim(),
    label: String(setting.label || setting.key || '').trim(),
    description: String(setting.description || '').trim(),
    value: String(setting.value || '').trim(),
  };

  if (!normalized.key) {
    throw new Error('Configuracao invalida');
  }

  if (!supabase) {
    return { stored: false, item: normalized };
  }

  const { data, error } = await supabase
    .from('site_settings')
    .upsert(
      {
        key: normalized.key,
        label: normalized.label,
        description: normalized.description,
        value: normalized.value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    )
    .select('key,label,description,value,updated_at')
    .single();

  if (error) throw error;

  return {
    stored: true,
    item: normalizeSiteSettingRow(data),
  };
}
