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

const solutionsPageSource = readFileSync(
  new URL("../src/pages/AutomatizePage.jsx", import.meta.url),
  "utf8"
);

test("solutions page keeps the desktop sales layout with accessible lead capture", () => {
  assert.match(solutionsPageSource, /VANT\.BUSINESS/);
  assert.match(solutionsPageSource, /Estrategia · Conexao · Resultados/);
  assert.match(solutionsPageSource, /Estruture uma presenca digital/);
  assert.match(solutionsPageSource, /com percepcao premium/);
  assert.match(solutionsPageSource, /Posicionamento digital/);
  assert.match(solutionsPageSource, /Percepcao premium/);
  assert.doesNotMatch(solutionsPageSource, /Empresas que confiam na VANT/);
  assert.match(solutionsPageSource, /Vamos conversar sobre seu projeto/);
  assert.match(solutionsPageSource, /id="briefing-form"/);
  assert.match(solutionsPageSource, /Solicitar analise/);
  assert.match(solutionsPageSource, /O que muda depois da VANT/);
  assert.doesNotMatch(solutionsPageSource, /A PRIMEIRA VENDA/);
  assert.doesNotMatch(solutionsPageSource, /Sua empresa sofre com isso/);
});
