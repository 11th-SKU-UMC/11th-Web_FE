import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'vite';

test('로그인, 토큰 저장, 인증 헤더, 닉네임 수정과 401 처리를 확인한다', async () => {
  const saved = new Map();
  globalThis.localStorage = {
    getItem: key => saved.get(key) ?? null,
    setItem: (key, value) => saved.set(key, value),
    removeItem: key => saved.delete(key),
  };
  const server = await createServer({ server: { middlewareMode: true } });
  const originalFetch = globalThis.fetch;
  const requests = [];
  const member = { email: 'test@example.com', nickname: '영화팬', createdAt: '2026-11-12' };
  let status = 200;
  let success = true;
  globalThis.fetch = async request => {
    const body = request.method === 'GET' ? null : await request.json();
    requests.push({ method: request.method, path: new URL(request.url).pathname, token: request.headers.get('Authorization'), body });
    const result = request.url.endsWith('auth/login') ? { nickname: member.nickname, accessToken: 'test-token' } : { ...member, ...body };
    return new Response(JSON.stringify({ isSuccess: success, message: 'test', result }), { status, headers: { 'Content-Type': 'application/json' } });
  };
  try {
    const { login } = await server.ssrLoadModule('/src/api/auth/login.ts');
    const { useAuthStore } = await server.ssrLoadModule('/src/stores/auth-store.ts');
    const { getMe } = await server.ssrLoadModule('/src/api/members/me.ts');
    const { updateMe } = await server.ssrLoadModule('/src/api/members/update-me.ts');
    const response = await login({ email: member.email, password: 'Password1!' });
    assert.equal(requests[0].token, null);
    assert.equal(requests[0].path, '/auth/login');
    useAuthStore.getState().setAccessToken(response.result.accessToken);
    assert.equal(JSON.parse(saved.get('umcine-auth-store')).state.accessToken, 'test-token');
    assert.deepEqual(await getMe(), member);
    assert.equal(requests[1].token, 'Bearer test-token');
    assert.equal((await updateMe({ nickname: '새닉네임' })).result.nickname, '새닉네임');
    assert.equal(requests[2].method, 'PATCH');
    assert.deepEqual(requests[2].body, { nickname: '새닉네임' });
    success = false;
    await assert.rejects(login({ email: member.email, password: 'wrong' }));
    await assert.rejects(updateMe({ nickname: '실패' }));
    status = 401;
    await assert.rejects(getMe());
    assert.equal(useAuthStore.getState().accessToken, null);
    assert.equal(JSON.parse(saved.get('umcine-auth-store')).state.accessToken, null);
  } finally {
    globalThis.fetch = originalFetch;
    delete globalThis.localStorage;
    await server.close();
  }
});
