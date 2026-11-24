import { useAuthStore } from "../stores/auth-store";
import { apiClient } from "./api-client";

export const authApi = apiClient.extend({
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      ({ request, response }) => {
        if (response.status !== 401) return;

        const { accessToken, setAccessToken } = useAuthStore.getState();
        // 이 요청에 실었던 토큰이 지금 토큰과 같을 때만 로그아웃
        if (request.headers.get("Authorization") === `Bearer ${accessToken}`) {
          setAccessToken(null);
        }
      },
    ],
  },
});