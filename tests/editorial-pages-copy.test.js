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

const appSource = readFileSync(
  new URL('../src/App.jsx', import.meta.url),
  'utf8'
);

const headerSource = readFileSync(
  new URL('../src/components/Header.jsx', import.meta.url),
  'utf8'
);

const footerSource = readFileSync(
  new URL('../src/components/Footer.jsx', import.meta.url),
  'utf8'
);

test('blog page keeps an editorial curation tone in hero and card CTA copy', () => {
  assert.match(blogPageSource, /Curadoria · IA · Oportunidades/);
  assert.match(blogPageSource, /Seu cadastro vira acesso a curadoria aplicada/);
  assert.match(blogPageSource, /transformar novidades em ideias, automacoes e oportunidades praticas/);
  assert.match(blogPageSource, /Usaremos o WhatsApp apenas para contato futuro/);
  assert.match(blogPageSource, /Abrir matéria →/);
});

test('app keeps only the three primary public screens in navigation', () => {
  assert.doesNotMatch(appSource, /path="\/sobre"/);
  assert.doesNotMatch(appSource, /SobrePage/);
  assert.doesNotMatch(headerSource, /label: 'Sobre'/);
  assert.doesNotMatch(headerSource, /label: 'Ferramentas'/);
  assert.doesNotMatch(footerSource, /to="\/sobre"/);
  assert.doesNotMatch(footerSource, /Ferramentas IA/);
  assert.match(headerSource, /label: 'Início'/);
  assert.match(headerSource, /label: 'Conversão'/);
  assert.match(headerSource, /to: '\/conversao'/);
  assert.match(headerSource, /label: 'Soluções'/);
  assert.match(appSource, /path="\/conversao"/);
});

test('resources page is fully focused on VANT solution conversion', () => {
  assert.match(recursosPageSource, /Soluções digitais que transformam operação em crescimento/);
  assert.match(recursosPageSource, /A VANT estrutura captação, atendimento, automação e escala digital/);
  assert.match(recursosPageSource, /Lead sem contexto/);
  assert.match(recursosPageSource, /Entrada/);
  assert.match(recursosPageSource, /Qualificação/);
  assert.match(recursosPageSource, /Atendimento/);
  assert.match(recursosPageSource, /Conversão/);
  assert.match(recursosPageSource, /Antes da VANT/);
  assert.match(recursosPageSource, /Depois da VANT/);
  assert.match(recursosPageSource, /Roteiro de atendimento padronizado/);
  assert.match(recursosPageSource, /Diagnóstico e implementação/);
  assert.match(recursosPageSource, /Solicitar diagnóstico da entrada de leads/);
  assert.match(recursosPageSource, /Criar uma solucao para minha empresa/);
  assert.doesNotMatch(recursosPageSource, /ferramentas/i);
  assert.doesNotMatch(recursosPageSource, /ferramenta/i);
  assert.doesNotMatch(recursosPageSource, /trackedToolHref/);
  assert.doesNotMatch(recursosPageSource, /ToolCard/);
  assert.doesNotMatch(recursosPageSource, /Abrir referência →/);
  assert.doesNotMatch(recursosPageSource, /Escolha o filtro certo/);
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
