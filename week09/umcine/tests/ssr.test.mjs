import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Providers } from '../src/app/providers.tsx';
import { useAuthStore } from '../src/stores/auth-store.ts';
import { useBookmarkStore } from '../src/stores/bookmark-store.ts';

test('서버 렌더링은 브라우저 저장소 없이 실행된다', () => {
  assert.equal(typeof window, 'undefined');
  assert.equal(useAuthStore.getState().accessToken, null);
  assert.deepEqual(useBookmarkStore.getState().bookmarkedMovieIds, []);
  assert.match(renderToString(createElement(Providers, null, createElement('p', null, 'SSR OK'))), /SSR OK/);
});
