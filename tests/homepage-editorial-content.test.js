import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const homePageSource = readFileSync(
  new URL('../src/pages/HomePage.jsx', import.meta.url),
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

test('homepage no longer carries the editorial tools and news blocks after the pillars', () => {
  assert.doesNotMatch(homePageSource, /Ferramentas para pesquisa aplicada/);
  assert.doesNotMatch(homePageSource, /Ebooks e guias para aprofundar a prática/);
  assert.doesNotMatch(homePageSource, /Notícias para acompanhar sem ruído/);
  assert.doesNotMatch(homePageSource, /Abrir análise/);
  assert.doesNotMatch(homePageSource, /Ler guia/);
  assert.doesNotMatch(homePageSource, /Ler curadoria/);
});

test('homepage no longer uses direct-sales microcopy in editorial sections', () => {
  assert.doesNotMatch(homePageSource, /Ver detalhes/);
  assert.doesNotMatch(homePageSource, /Receber guia/);
  assert.doesNotMatch(homePageSource, /Saiba mais/);
});


test('homepage hero is focused on lead conversion and digital growth', () => {
  assert.match(homePageSource, /<span>Presença\.<\/span>/);
  assert.match(homePageSource, /<span>IA\.<\/span>/);
  assert.match(homePageSource, /<span>Crescimento\.<\/span>/);
  assert.match(homePageSource, /A VANT transforma presença digital, tecnologia e IA em estrutura de captação, atendimento e conversão/);
  assert.match(homePageSource, /Conhecer soluções/);
  assert.match(homePageSource, /Ver soluções digitais/);
  assert.doesNotMatch(homePageSource, /Explore ferramentas/);
  assert.doesNotMatch(homePageSource, /noticias e guias/);
  assert.doesNotMatch(homePageSource, /Conhecer a VANT/);
  assert.doesNotMatch(homePageSource, /to="\/sobre"/);
});

test('homepage pillars explain VANT growth structure clearly', () => {
  assert.match(homePageSource, /A VANT conecta presença digital, automação e crescimento/);
  assert.match(homePageSource, /Criamos estruturas digitais para empresas que querem ser mais profissionais/);
  assert.match(homePageSource, /Presença Digital Premium/);
  assert.match(homePageSource, /Atendimento Inteligente/);
  assert.match(homePageSource, /IA e Automações/);
  assert.match(homePageSource, /Estrutura de Crescimento/);
  assert.match(homePageSource, /não entrega apenas sites/);
});

test('homepage pillars CTA routes to the v2 solutions path instead of a dedicated attendance screen', () => {
  assert.match(homePageSource, /to="\/solucoes" className="reference-pillars-link"/);
  assert.match(homePageSource, /Conhecer soluções/);
  assert.doesNotMatch(homePageSource, /to="\/atendimento-digital"/);
  assert.doesNotMatch(homePageSource, /Ver como transformamos atendimento/);
  assert.doesNotMatch(appSource, /AtendimentoDigitalPage/);
  assert.doesNotMatch(appSource, /path="\/atendimento-digital"/);
  assert.doesNotMatch(headerSource, /label: 'Atendimento'/);
});

const cssSource = readFileSync(
  new URL('../src/index.css', import.meta.url),
  'utf8'
);

test('homepage first viewport is framed without clipping the hero content', () => {
  assert.match(cssSource, /\.reference-hero\s*{[^}]*min-height:\s*clamp\(560px, calc\(100svh - 116px\), 720px\)/s);
  assert.match(cssSource, /\.reference-hero\s*{[^}]*max-height:\s*calc\(100svh - 88px\)/s);
  assert.match(cssSource, /\.reference-hero\s*{[^}]*overflow:\s*clip/s);
  assert.match(cssSource, /\.reference-hero-copy\s*{[^}]*align-self:\s*center/s);
  assert.match(cssSource, /\.reference-hero-mark\s*{[^}]*min-height:\s*min\(48vw, 430px\)/s);
  assert.match(cssSource, /\.reference-hero-mark img\s*{[^}]*max-height:\s*min\(48vh, 430px\)/s);
  assert.match(cssSource, /\.reference-pillars\s*{[^}]*margin-top:\s*clamp\(1rem, 2vw, 1\.5rem\)/s);
});
