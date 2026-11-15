import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FavoriteStatusResult } from "../api/favorites/favorites";
import { createMovieRecord } from "../api/movie-records/create-movie-record";

export function useCreateMovieRecordMutation(movieId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovieRecord,
    onSuccess: (result) => {
      if (result.favorite) {
        queryClient.setQueryData<FavoriteStatusResult>(["favorites", movieId], {
          isFavorite: true,
        });
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      }
      alert("영화 기록을 저장했습니다.");
    },
    onError: () => {
      alert("영화 기록 저장에 실패했어요. 다시 시도해 주세요.");
    },
  });
}