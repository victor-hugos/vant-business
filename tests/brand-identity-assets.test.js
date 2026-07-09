import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const asset = (path) => new URL(`../public/assets/brand/${path}`, import.meta.url);

const logoSource = readFileSync(
  new URL('../src/components/VantLogo.jsx', import.meta.url),
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

const homeSource = readFileSync(
  new URL('../src/pages/HomePage.jsx', import.meta.url),
  'utf8'
);

const cssSource = readFileSync(
  new URL('../src/index.css', import.meta.url),
  'utf8'
);

test('VANT 2026 identity assets are organized under the brand asset folder', () => {
  [
    'vant-identity-2026-green-board.png',
    'vant-logo-primary.png',
    'vant-logo-reversed.png',
    'vant-symbol-reversed.png',
    'vant-favicon.png',
  ].forEach((fileName) => {
    assert.equal(existsSync(asset(fileName)), true, `${fileName} should exist`);
  });
});

test('VANT logo component exposes the new identity variants from one source of truth', () => {
  assert.match(logoSource, /primary:\s*'\/assets\/brand\/vant-logo-primary\.png'/);
  assert.match(logoSource, /reversed:\s*'\/assets\/brand\/vant-logo-reversed\.png'/);
  assert.match(logoSource, /symbolReversed:\s*'\/assets\/brand\/vant-symbol-reversed\.png'/);
  assert.doesNotMatch(logoSource, /symbolHero/);
});

test('public brand surfaces use the green identity language', () => {
  assert.match(cssSource, /--vant-accent:\s*#9bdc00/);
  assert.match(headerSource, /Automate\. Intelligently\. Grow\./);
  assert.match(footerSource, /Automate\. Intelligently\. Grow\./);
  assert.match(homeSource, /Automate\. Intelligently\. Grow\./);
  assert.match(homeSource, /variant="symbolReversed"/);
});
