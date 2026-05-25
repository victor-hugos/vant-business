import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const blogPageSource = readFileSync(
  new URL('../src/pages/BlogPage.jsx', import.meta.url),
  'utf8'
);

const recursosPageSource = readFileSync(
  new URL('../src/pages/RecursosPage.jsx', import.meta.url),
  'utf8'
);

test('blog page keeps an editorial curation tone in hero and card CTA copy', () => {
  assert.match(blogPageSource, /Curadoria editorial de IA/);
  assert.match(blogPageSource, /Entrar no grupo do WhatsApp com noticias diarias sobre IA/);
  assert.match(blogPageSource, /Receber ebooks gratuitos e oportunidades por email/);
  assert.match(blogPageSource, /Abrir matéria →/);
});

test('resources page frames the catalog as research and practical reference', () => {
  assert.match(recursosPageSource, /Curadoria para pesquisa e operação/);
  assert.match(recursosPageSource, /Use os filtros para encontrar referências, comparar categorias e abrir a ferramenta certa no momento certo\./);
  assert.match(recursosPageSource, /Abrir referência →/);
});

test('light editorial pass removes overtly commercial copy from resources page', () => {
  assert.doesNotMatch(recursosPageSource, /testar ou vender/);
  assert.doesNotMatch(recursosPageSource, /Acessar →/);
});
