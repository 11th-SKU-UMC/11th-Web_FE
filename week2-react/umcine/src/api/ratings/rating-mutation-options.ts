import { mutationOptions, type QueryClient } from "@tanstack/react-query";
import { createRating, deleteRating, updateRating, type RatingRequest } from "./ratings";
import { ratingKeys } from "./rating-query-options";

export type RatingMutationRequest =
  | { action: "create"; movieId: number; body: RatingRequest }
  | { action: "update"; ratingId: number; body: RatingRequest }
  | { action: "delete"; ratingId: number };

export function ratingMutationOptions(queryClient: QueryClient, memberId: number | undefined) {
  return mutationOptions({
    mutationKey: ["ratings", "write", memberId],
    mutationFn: async (request: RatingMutationRequest) => {
      if (!memberId) throw new Error("로그인이 필요해요.");
      switch (request.action) {
        case "create": return createRating({ movieId: request.movieId, ...request.body });
        case "update": return updateRating(request.ratingId, request.body);
        case "delete": return deleteRating(request.ratingId);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ratingKeys.member(memberId) });
    },
    onSuccess: async () => {
      // 등록·삭제로 페이지 구성도 달라질 수 있으므로 서버 목록을 다시 조회해요.
      await queryClient.invalidateQueries({ queryKey: ratingKeys.member(memberId) });
    },
    onError: async () => {
      await queryClient.invalidateQueries({ queryKey: ratingKeys.member(memberId) });
      alert("평점 변경에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
