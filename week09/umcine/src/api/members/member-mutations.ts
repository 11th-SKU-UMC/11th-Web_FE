import { mutationOptions, type QueryClient } from "@tanstack/react-query";
import type { MemberInfo } from "./me";
import { updateMe } from "./update-me";

export const memberMutations = {
  updateMe: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: ["members", "me", "update"],
      mutationFn: updateMe,
      onSuccess: async (response) => {
        // 진행 중인 내 정보 조회를 먼저 취소해서 옛날 값이 덮어쓰지 못하게
        await queryClient.cancelQueries({ queryKey: ["members", "me"], exact: true });
        queryClient.setQueryData<MemberInfo>(["members", "me"], response.result);
        alert("내 정보 수정에 성공했어요.");
      },
      onError: () => {
        alert("내 정보 수정에 실패했어요. 다시 시도해 주세요.");
      },
    }),
};