import { useAuthStore } from '../stores/auth-store';
import { apiClient } from './api-client';

export const authApi = apiClient.extend({
  hooks: {
    beforeRequest: [({ request }) => {
      const token = useAuthStore.getState().accessToken;
      if (token) request.headers.set('Authorization', `Bearer ${token}`);
    }],
    afterResponse: [({ request, response }) => {
      const { accessToken, setAccessToken } = useAuthStore.getState();
      // 이전 로그인 요청의 응답이 새 로그인 토큰을 지우지 않도록 해요.
      if (response.status === 401 && request.headers.get('Authorization') === `Bearer ${accessToken}`) {
        setAccessToken(null);
      }
    }],
  },
});
