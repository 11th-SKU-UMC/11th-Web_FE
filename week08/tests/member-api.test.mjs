import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'vite';

test('중복 확인 경로를 인코딩하고 회원가입에 필요한 값만 전송한다', async () => {
  const server = await createServer({ server: { middlewareMode: true } });
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async request => {
    requests.push({ url: request.url, method: request.method, body: request.method === 'POST' ? await request.json() : null });
    return new Response(JSON.stringify({ available: true, isSuccess: true }), { headers: { 'Content-Type': 'application/json' } });
  };
  try {
    const { checkEmailDuplicate } = await server.ssrLoadModule('/src/api/members/check-email-duplicate.ts');
    const { checkNicknameDuplicate } = await server.ssrLoadModule('/src/api/members/check-nickname-duplicate.ts');
    const { signup } = await server.ssrLoadModule('/src/api/members/signup.ts');
    assert.equal((await checkEmailDuplicate('user+test@example.com')).available, true);
    await checkNicknameDuplicate('영화/팬');
    await signup({ email: 'user@example.com', nickname: '영화팬', password: 'Password1!' });
    assert.equal(new URL(requests[0].url).pathname, '/members/email/user%2Btest%40example.com');
    assert.equal(new URL(requests[1].url).pathname, '/members/nickname/%EC%98%81%ED%99%94%2F%ED%8C%AC');
    assert.equal(requests[2].method, 'POST');
    assert.deepEqual(requests[2].body, { email: 'user@example.com', nickname: '영화팬', password: 'Password1!' });
  } finally {
    globalThis.fetch = originalFetch;
    await server.close();
  }
});
