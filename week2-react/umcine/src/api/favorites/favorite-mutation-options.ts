import { mutationOptions, type QueryClient } from "@tanstack/react-query";
import { addFavorite, deleteFavorite, type FavoriteStatus } from "./favorites";
import { favoriteKeys } from "./favorite-query-options";

export interface ToggleFavoriteRequest {
  movieId: number;
  isFavorite: boolean;
}

export const favoriteMutationKey = (memberId: number | undefined, movieId: number) =>
  ["favorites", memberId, "toggle", movieId] as const;

export function favoriteMutationOptions(queryClient: QueryClient, memberId: number | undefined, movieId: number) {
  return mutationOptions({
    mutationKey: favoriteMutationKey(memberId, movieId),
    mutationFn: async (body: ToggleFavoriteRequest) => {
      if (!memberId) throw new Error("로그인이 필요해요.");
      if (body.isFavorite) await deleteFavorite(body.movieId);
      else await addFavorite(body.movieId);
      return { movieId: body.movieId, isFavorite: !body.isFavorite };
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["favorites", memberId] });
    },
    onSuccess: async (status) => {
      // 단건 상태는 결과를 이미 알기 때문에 추가 GET 없이 갱신해요.
      queryClient.setQueryData<FavoriteStatus>(favoriteKeys.status(memberId, status.movieId), status);
      // 목록의 정렬·항목 정보는 서버에서 다시 확인해요.
      await queryClient.invalidateQueries({ queryKey: favoriteKeys.list(memberId) });
    },
    onError: async () => {
      await queryClient.invalidateQueries({ queryKey: ["favorites", memberId] });
      alert("즐겨찾기 변경에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
