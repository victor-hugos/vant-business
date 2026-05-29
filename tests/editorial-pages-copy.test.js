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
  assert.match(blogPageSource, /Curadoria · IA · Oportunidades/);
  assert.match(blogPageSource, /Seu cadastro vira acesso a curadoria aplicada/);
  assert.match(blogPageSource, /transformar novidades em ideias, automacoes e oportunidades praticas/);
  assert.match(blogPageSource, /Usaremos o WhatsApp apenas para contato futuro/);
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
