import assert from 'node:assert/strict';
import test from 'node:test';

import { buildDefaultSiteSettings, buildSiteSettingsMap } from '../api/_siteSettingsStore.js';
import { getDefaultOfferTriggerCriteria, getOfferTriggerCriteriaFromSettings } from '../src/utils/offerTrigger.js';

test('default site settings expose recommended offer-trigger criteria', () => {
  const settings = buildDefaultSiteSettings();
  const defaults = getDefaultOfferTriggerCriteria();

  assert.equal(settings.offer_trigger_window_days.value, String(defaults.windowDays));
  assert.equal(settings.offer_trigger_service_leads.value, String(defaults.serviceLeadThreshold));
  assert.equal(settings.offer_trigger_repeated_pain.value, String(defaults.repeatedPainThreshold));
  assert.equal(settings.offer_trigger_operational_interest.value, String(defaults.operationalInterestThreshold));
});

test('offer-trigger criteria can be rebuilt from saved site settings overrides', () => {
  const settings = buildSiteSettingsMap(buildDefaultSiteSettings(), [
    { key: 'offer_trigger_window_days', value: '21' },
    { key: 'offer_trigger_service_leads', value: '5' },
    { key: 'offer_trigger_repeated_pain', value: '4' },
    { key: 'offer_trigger_operational_interest', value: '6' },
  ]);

  assert.deepEqual(getOfferTriggerCriteriaFromSettings(settings), {
    windowDays: 21,
    serviceLeadThreshold: 5,
    repeatedPainThreshold: 4,
    operationalInterestThreshold: 6,
  });
});
