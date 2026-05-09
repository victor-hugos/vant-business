import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { isAdminRequest } from './_adminAuth.js';
import { getSupabaseAdmin } from './_supabaseAdmin.js';
import { getNewsItems } from './_newsStore.js';
import { affiliateTools, agentSchedule, ebookTools } from '../src/data/aiPipeline.js';

export const agentWorkflow = [
  {
    id: 'pesquisa',
    name: 'Agente de Pesquisa',
    goal: 'Atualiza o lote de IAs e remove duplicidade antes de qualquer producao.',
  },
  {
    id: 'afiliados',
    name: 'Agente de Afiliados',
    goal: 'Confere quais ferramentas tem link ativo, link pendente ou sem afiliado configurado.',
  },
  {
    id: 'ebook',
    name: 'Agente de Ebook',
    goal: 'Transforma ferramentas sem link configurado em ideias de ebook para captura.',
  },
  {
    id: 'roteiro',
    name: 'Agente de Roteiro',
    goal: 'Gera roteiro apenas para ferramentas com potencial de afiliado.',
  },
  {
    id: 'noticias',
    name: 'Agente de Noticias',
    goal: 'Mostra as noticias coletadas e o que esta aguardando aprovacao.',
  },
  {
    id: 'sincronizador',
    name: 'Agente Sincronizador',
    goal: 'Consolida respostas, cliques e proximas acoes antes da publicacao.',
  },
];

async function loadSeedAgentResponses() {
  try {
    const file = await readFile(path.resolve(process.cwd(), 'public/data/admin-agent-seed.json'), 'utf8');
    return JSON.parse(file);
  } catch {
    return [];
  }
}

async function fetchAdminRows(req) {
  const supabase = getSupabaseAdmin();
  const news = await getNewsItems(req);
  const seedResponses = await loadSeedAgentResponses();

  if (!supabase) {
    return {
      clicks: [],
      agentResponses: seedResponses,
      newsItems: news.items,
      warnings: ['Supabase ainda nao configurado no ambiente.'],
    };
  }

  const [clicksResult, subscribersResult, responsesResult] = await Promise.all([
    supabase
      .from('analytics_events')
      .select('id,event_type,item_type,item_id,item_title,target_url,source,path,created_at')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('subscribers')
      .select('id,nome,email,whatsapp,ebook,product_title,lead_type,newsletter_opt_in,source,created_at')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('ai_agent_reviews')
      .select('id,agent_name,item_id,title,status,payload,created_at,updated_at')
      .eq('item_type', 'agent_response')
      .order('created_at', { ascending: false })
      .limit(100),
  ]);

  const agentResponses = (responsesResult.data || []).length > 0 ? responsesResult.data : seedResponses;

  return {
    clicks: clicksResult.data || [],
    subscribers: subscribersResult.data || [],
    agentResponses,
    newsItems: news.items,
    warnings: [clicksResult.error?.message, subscribersResult.error?.message, responsesResult.error?.message, ...(news.warnings || [])].filter(Boolean),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const rows = await fetchAdminRows(req);
    return res.status(200).json({
      ok: true,
      pipeline: {
        affiliateTools,
        ebookTools,
        agentSchedule,
      },
      agentWorkflow,
      ...rows,
    });
  } catch (error) {
    console.error('Admin data error:', error);
    return res.status(500).json({ error: 'Falha ao carregar area administrativa' });
  }
}
