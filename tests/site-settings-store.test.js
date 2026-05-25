import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSiteSettingsMap, getSiteSettingValue } from '../api/_siteSettingsStore.js';

test('buildSiteSettingsMap keeps default settings and lets saved values override fallbacks', () => {
  const settings = buildSiteSettingsMap(
    {
      whatsapp_news_group_url: {
        key: 'whatsapp_news_group_url',
        label: 'Grupo de noticias no WhatsApp',
        value: 'https://chat.whatsapp.com/fallback',
      },
    },
    [
      {
        key: 'whatsapp_news_group_url',
        label: 'Grupo de noticias no WhatsApp',
        value: 'https://chat.whatsapp.com/admin-value',
      },
    ]
  );

  assert.equal(settings.whatsapp_news_group_url.value, 'https://chat.whatsapp.com/admin-value');
  assert.equal(settings.whatsapp_news_group_url.label, 'Grupo de noticias no WhatsApp');
});

test('getSiteSettingValue falls back when the saved setting is missing or empty', () => {
  const settings = buildSiteSettingsMap(
    {
      whatsapp_news_group_url: {
        key: 'whatsapp_news_group_url',
        label: 'Grupo de noticias no WhatsApp',
        value: 'https://chat.whatsapp.com/fallback',
      },
    },
    [
      {
        key: 'whatsapp_news_group_url',
        label: 'Grupo de noticias no WhatsApp',
        value: '',
      },
    ]
  );

  assert.equal(
    getSiteSettingValue(settings, 'whatsapp_news_group_url', 'https://chat.whatsapp.com/fallback'),
    'https://chat.whatsapp.com/fallback'
  );
});
