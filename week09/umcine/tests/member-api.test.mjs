import assert from 'node:assert/strict';
import { test } from 'node:test';

test('중복 확인 경로를 인코딩하고 회원가입에 필요한 값만 전송한다', async () => {
  const OriginalRequest = globalThis.Request;
  globalThis.Request = class extends OriginalRequest {
    constructor(input, options) {
      super(typeof input === 'string' ? new URL(input, 'http://localhost:3001') : input, options);
    }
  };
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async request => {
    requests.push({ url: request.url, method: request.method, body: request.method === 'POST' ? await request.json() : null });
    return new Response(JSON.stringify({ available: true, isSuccess: true }), { headers: { 'Content-Type': 'application/json' } });
  };
  try {
    const { checkEmailDuplicate } = await import('../src/api/members/check-email-duplicate.ts');
    const { checkNicknameDuplicate } = await import('../src/api/members/check-nickname-duplicate.ts');
    const { signup } = await import('../src/api/members/signup.ts');
    assert.equal((await checkEmailDuplicate('user+test@example.com')).available, true);
    await checkNicknameDuplicate('영화/팬');
    await signup({ email: 'user@example.com', nickname: '영화팬', password: 'Password1!' });
    assert.equal(new URL(requests[0].url).pathname, '/api/members/email/user%2Btest%40example.com');
    assert.equal(new URL(requests[1].url).pathname, '/api/members/nickname/%EC%98%81%ED%99%94%2F%ED%8C%AC');
    assert.equal(requests[2].method, 'POST');
    assert.deepEqual(requests[2].body, { email: 'user@example.com', nickname: '영화팬', password: 'Password1!' });
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.Request = OriginalRequest;
  }
});
