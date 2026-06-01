import assert from 'node:assert/strict';
import test from 'node:test';

import { scrollToTopOnRouteChange } from '../src/utils/scrollRestoration.js';

test('scrolls to the top when the route pathname changes', () => {
  const calls = [];
  const win = {
    scrollTo(options) {
      calls.push(options);
    },
  };

  scrollToTopOnRouteChange('/blog', '/recursos', win);

  assert.deepEqual(calls, [{ top: 0, left: 0, behavior: 'auto' }]);
});

test('does not scroll when the pathname stays the same', () => {
  const calls = [];
  const win = {
    scrollTo(options) {
      calls.push(options);
    },
  };

  scrollToTopOnRouteChange('/blog', '/blog', win);

  assert.deepEqual(calls, []);
});
