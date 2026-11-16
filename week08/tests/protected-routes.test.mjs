import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'vite';

test('마이페이지 두 경로가 공통 인증 Layout을 사용한다', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false } });
  try {
    const { Route } = await server.ssrLoadModule('/src/routes/(authenticated)/_auth.tsx');
    const { useAuthStore } = await server.ssrLoadModule('/src/stores/auth-store.ts');
    const { routeTree } = await server.ssrLoadModule('/src/routeTree.gen.ts');
    const { createRouter, createMemoryHistory, isRedirect } = await server.ssrLoadModule('@tanstack/react-router');
    const router = createRouter({ routeTree, history: createMemoryHistory() });
    for (const path of ['/mypage', '/mypage/edit']) {
      const matches = router.matchRoutes(path);
      assert.ok(matches.some(match => match.routeId === '/(authenticated)/_auth'));
      assert.equal(matches.at(-1).pathname, path);
    }
    useAuthStore.setState({ accessToken: null });
    assert.throws(() => Route.options.beforeLoad(), error => isRedirect(error) && error.options.to === '/login');
    useAuthStore.setState({ accessToken: 'test-token' });
    assert.doesNotThrow(() => Route.options.beforeLoad());
  } finally {
    await server.close();
  }
});
