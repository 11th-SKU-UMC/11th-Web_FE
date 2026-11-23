import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginMutationOptions } from "../api/auth/auth-mutation-options";
import { useAuthStore } from "../stores/auth-store";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    ...loginMutationOptions(),
    onSuccess: (response) => {
      // 다른 계정으로 로그인했을 때 이전 회원의 서버 상태를 재사용하지 않아요.
      for (const queryKey of [["members", "me"], ["favorites"], ["ratings"]]) {
        queryClient.cancelQueries({ queryKey });
        queryClient.removeQueries({ queryKey });
      }
      setAccessToken(response.result.accessToken);
      alert("로그인에 성공했어요.");
      queryClient.invalidateQueries({ queryKey: ["members", "me"] });
      router.push("/");
    },
    onError: () => {
      alert("로그인에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
