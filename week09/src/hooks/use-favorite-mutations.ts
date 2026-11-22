import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFavorite,
  removeFavorite,
  type FavoriteStatusResult,
} from "../api/favorites/favorites";

export function useAddFavoriteMutation(movieId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addFavorite({ movieId }),
    onSuccess: () => {
      queryClient.setQueryData<FavoriteStatusResult>(["favorites", movieId], {
        isFavorite: true,
      });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      alert("즐겨찾기에 등록했습니다.");
    },
    onError: () => {
      alert("즐겨찾기 등록에 실패했어요. 다시 시도해 주세요.");
    },
  });
}

export function useRemoveFavoriteMutation(movieId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeFavorite(movieId),
    onSuccess: () => {
      queryClient.setQueryData<FavoriteStatusResult>(["favorites", movieId], {
        isFavorite: false,
      });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      alert("즐겨찾기를 해제했습니다.");
    },
    onError: () => {
      alert("즐겨찾기 해제에 실패했어요. 다시 시도해 주세요.");
    },
  });
}