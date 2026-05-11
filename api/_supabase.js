export function requiredStorageEnv() {
  return Boolean(process.env.SUPABASE_URL && serviceKey());
}

function serviceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
}

export async function storeLead(lead) {
  if (!requiredStorageEnv()) {
    throw new Error('Banco nao configurado. Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.');
  }

  const key = serviceKey();
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao armazenar lead: ${errorText}`);
  }
}

export async function getNewsletterSubscribers() {
  if (!requiredStorageEnv()) {
    throw new Error('Banco nao configurado. Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.');
  }

  const key = serviceKey();
  const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/leads`);
  url.searchParams.set('product_id', 'eq.daily-ai-news');
  url.searchParams.set('select', 'name,email,whatsapp,product_id,created_at');
  url.searchParams.set('order', 'created_at.desc');

  const response = await fetch(url, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao buscar inscritos: ${errorText}`);
  }

  const rows = await response.json();
  const deduped = new Map();
  for (const row of rows) {
    if (row.email && !deduped.has(row.email.toLowerCase())) {
      deduped.set(row.email.toLowerCase(), row);
    }
  }
  return Array.from(deduped.values());
}
