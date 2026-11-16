import { mutationOptions, type QueryClient } from "@tanstack/react-query";
import { addFavorite, removeFavorite, type FavoriteStatus } from "./favorites";

export const favoriteMutations = {
  add: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: ["favorites", "add"],
      mutationFn: addFavorite,
      onSuccess: (_data, movieId) => {
        queryClient.setQueryData<FavoriteStatus>(["favorites", movieId], { isFavorite: true });
        queryClient.invalidateQueries({ queryKey: ["favorites"], exact: true });
      },
      onError: () => {
        alert("즐겨찾기 등록에 실패했어요.");
      },
    }),

  remove: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: ["favorites", "remove"],
      mutationFn: removeFavorite,
      onSuccess: (_data, movieId) => {
        queryClient.setQueryData<FavoriteStatus>(["favorites", movieId], { isFavorite: false });
        queryClient.invalidateQueries({ queryKey: ["favorites"], exact: true });
      },
      onError: () => {
        alert("즐겨찾기 해제에 실패했어요.");
      },
    }),
};