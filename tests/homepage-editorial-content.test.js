import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const homePageSource = readFileSync(
  new URL('../src/pages/HomePage.jsx', import.meta.url),
  'utf8'
);

test('homepage frames tools, ebooks, and news as editorial discovery content', () => {
  assert.match(homePageSource, /Ferramentas para pesquisa aplicada/);
  assert.match(homePageSource, /Ebooks e guias para aprofundar a prática/);
  assert.match(homePageSource, /Notícias para acompanhar sem ruído/);
  assert.match(homePageSource, /Abrir análise/);
  assert.match(homePageSource, /Ler guia/);
  assert.match(homePageSource, /Ler curadoria/);
});

test('homepage no longer uses direct-sales microcopy in editorial sections', () => {
  assert.doesNotMatch(homePageSource, /Ver detalhes/);
  assert.doesNotMatch(homePageSource, /Receber guia/);
  assert.doesNotMatch(homePageSource, /Saiba mais/);
});


test('homepage hero bridges solutions and editorial content', () => {
  assert.match(homePageSource, /<span>Presença\.<\/span>/);
  assert.match(homePageSource, /<span>IA\.<\/span>/);
  assert.match(homePageSource, /<span>Crescimento\.<\/span>/);
  assert.match(homePageSource, /A VANT transforma presenca digital, tecnologia e IA em crescimento real\./);
  assert.match(homePageSource, /Apresentar meu projeto/);
  assert.match(homePageSource, /Explorar notícias/);
  assert.match(homePageSource, /Explorar ferramentas/);
  assert.match(homePageSource, /Explorar ebooks/);
});
