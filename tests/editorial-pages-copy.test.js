import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

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

const cssSource = readFileSync(
  new URL('../src/index.css', import.meta.url),
  'utf8'
);

test('app keeps only the three primary public screens in navigation', () => {
  assert.doesNotMatch(appSource, /path="\/sobre"/);
  assert.doesNotMatch(appSource, /SobrePage/);
  assert.doesNotMatch(headerSource, /label: 'Sobre'/);
  assert.doesNotMatch(headerSource, /label: 'Ferramentas'/);
  assert.doesNotMatch(footerSource, /to="\/sobre"/);
  assert.doesNotMatch(footerSource, /Ferramentas IA/);
  assert.match(headerSource, /label: 'Início'/);
  assert.doesNotMatch(headerSource, /label: 'Conversão'/);
  assert.match(headerSource, /label: 'Soluções'/);
  assert.match(headerSource, /to: '\/solucoes'/);
  assert.match(headerSource, /label: 'Diagnóstico'/);
  assert.match(headerSource, /to: '\/diagnostico'/);
  assert.match(appSource, /path="\/solucoes"/);
  assert.match(appSource, /path="\/diagnostico"/);
});

test('resources page is fully focused on VANT solution conversion', () => {
  assert.match(recursosPageSource, /Sua empresa não precisa de mais ferramentas/);
  assert.match(recursosPageSource, /Precisa de uma estrutura que faça tudo trabalhar junto/);
  assert.match(recursosPageSource, /Muitas empresas não têm um problema de vendas/);
  assert.match(recursosPageSource, /entre o interesse e a venda/);
  assert.match(recursosPageSource, /Nós organizamos a jornada inteira/);
  assert.match(recursosPageSource, /Captar/);
  assert.match(recursosPageSource, /Atender/);
  assert.match(recursosPageSource, /Converter/);
  assert.match(recursosPageSource, /O que muda na prática/);
  assert.match(recursosPageSource, /Antes/);
  assert.match(recursosPageSource, /Com a VANT/);
  assert.match(recursosPageSource, /Solicitar análise da operação/);
  assert.match(recursosPageSource, /Solicitar uma análise da minha operação/);
  assert.match(recursosPageSource, /Sem pacote genérico/);
  assert.match(recursosPageSource, /className="conversion-system"/);
  assert.match(recursosPageSource, /className="conversion-path-grid"/);
  assert.match(recursosPageSource, /className="conversion-path-card"/);
  assert.match(recursosPageSource, /A VANT organiza/);
  assert.match(recursosPageSource, /id="como-resolvemos"/);
  assert.doesNotMatch(recursosPageSource, /className="conversion-problem"/);
  assert.doesNotMatch(recursosPageSource, /className="conversion-solutions"/);
  assert.doesNotMatch(recursosPageSource, /className="conversion-system-head"/);
  assert.doesNotMatch(recursosPageSource, /className="conversion-pillar-grid"/);
  assert.doesNotMatch(recursosPageSource, /conversion-hero-proof/);
  assert.doesNotMatch(recursosPageSource, /Diagnóstico antes da ferramenta/);
  assert.doesNotMatch(recursosPageSource, /Captação, atendimento e follow-up conectados/);
  assert.doesNotMatch(recursosPageSource, /Solução criada a partir do gargalo real/);
  assert.doesNotMatch(recursosPageSource, /A solução depende do gargalo/);
  assert.doesNotMatch(recursosPageSource, /Não começamos pela ferramenta/);
  assert.doesNotMatch(recursosPageSource, /Veja como uma operação pode funcionar/);
  assert.doesNotMatch(recursosPageSource, /function ConversionIcon/);
  assert.doesNotMatch(recursosPageSource, /conversion-icon-frame/);
  assert.doesNotMatch(recursosPageSource, /icon: 'nodes'/);
  assert.doesNotMatch(recursosPageSource, /icon: 'doc'/);
  assert.doesNotMatch(recursosPageSource, /Lead sem contexto/);
  assert.match(recursosPageSource, /Qualificação/);
  assert.match(recursosPageSource, /Atendimento/);
  assert.doesNotMatch(recursosPageSource, /Roteiro de atendimento padronizado/);
  assert.doesNotMatch(recursosPageSource, /Diagnóstico e implementação/);
  assert.doesNotMatch(recursosPageSource, /Solicitar diagnóstico da entrada de leads/);
  assert.doesNotMatch(recursosPageSource, /Criar uma solucao para minha empresa/);
  assert.doesNotMatch(recursosPageSource, /trackedToolHref/);
  assert.doesNotMatch(recursosPageSource, /ToolCard/);
  assert.doesNotMatch(recursosPageSource, /Abrir referência →/);
  assert.doesNotMatch(recursosPageSource, /Escolha o filtro certo/);
});

test('light editorial pass removes overtly commercial copy from resources page', () => {
  assert.doesNotMatch(recursosPageSource, /testar ou vender/);
  assert.doesNotMatch(recursosPageSource, /Acessar →/);
});

test('conversion page has a mobile-first compact layout pass', () => {
  assert.match(cssSource, /@media \(max-width: 640px\)/);
  assert.match(cssSource, /\.conversion-hero\s*{[^}]*flex-direction:\s*column/s);
  assert.match(cssSource, /\.conversion-hero-copy\s*{[^}]*order:\s*1/s);
  assert.match(cssSource, /\.conversion-hero-copy\s*{[^}]*min-height:\s*auto/s);
  assert.match(cssSource, /\.conversion-hero-copy\s*{[^}]*justify-content:\s*flex-start/s);
  assert.match(cssSource, /\.conversion-visual\s*{[^}]*order:\s*2/s);
  assert.match(cssSource, /\.conversion-brand-board\s*{[^}]*display:\s*none/s);
  assert.match(cssSource, /\.conversion-hero-line\s*{[^}]*display:\s*none/s);
  assert.match(cssSource, /\.conversion-hero-copy\s*{[^}]*padding:\s*1\.35rem 0\.95rem/s);
  assert.match(cssSource, /\.conversion-title\s*{[^}]*max-width:\s*680px/s);
  assert.match(cssSource, /\.conversion-title\s*{[^}]*font-size:\s*clamp\(2\.05rem, 3\.45vw, 3\.65rem\)/s);
  assert.match(cssSource, /\.conversion-title\s*{[^}]*font-size:\s*clamp\(1\.82rem, 8\.6vw, 2\.28rem\)/s);
  assert.match(cssSource, /\.conversion-system\s*{[^}]*display:\s*grid/s);
  assert.doesNotMatch(cssSource, /\.conversion-hero-proof/);
  assert.match(cssSource, /\.conversion-outcome-row\s*{[^}]*grid-template-columns:\s*28px 1fr/s);
  assert.match(cssSource, /\.conversion-compare-row\s*{[^}]*grid-template-columns:\s*1fr/s);
});

const solutionsPageSource = readFileSync(
  new URL("../src/pages/AutomatizePage.jsx", import.meta.url),
  "utf8"
);

test("diagnosis page keeps the v2 commercial diagnosis layout with accessible lead capture", () => {
  assert.match(solutionsPageSource, /VANT\.BUSINESS/);
  assert.match(solutionsPageSource, /Estruture \. Organize \. Conecte\./);
  assert.match(solutionsPageSource, /Diagnostico VANT/);
  assert.match(solutionsPageSource, /Onde sua empresa perde oportunidades hoje/);
  assert.match(solutionsPageSource, /presenca, captacao, atendimento, follow-up, automacao ou conversao/);
  assert.match(solutionsPageSource, /Gargalo principal/);
  assert.match(solutionsPageSource, /diagnosis-page/);
  assert.doesNotMatch(solutionsPageSource, /Empresas que confiam na VANT/);
  assert.match(solutionsPageSource, /Vamos diagnosticar sua operacao/);
  assert.match(solutionsPageSource, /id="briefing-form"/);
  assert.match(solutionsPageSource, /Solicitar diagnostico/);
  assert.match(solutionsPageSource, /O que a VANT analisa primeiro/);
  assert.doesNotMatch(solutionsPageSource, /Solução desejada/);
  assert.doesNotMatch(solutionsPageSource, /source: 'digital-solutions-page'/);
  assert.doesNotMatch(solutionsPageSource, /A PRIMEIRA VENDA/);
  assert.doesNotMatch(solutionsPageSource, /Sua empresa sofre com isso/);
});
