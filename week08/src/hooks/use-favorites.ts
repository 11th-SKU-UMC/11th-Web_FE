import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFavorite, deleteFavorite, getFavoriteStatus, getFavorites } from "../api/favorites";
import { useAuthStore } from "../stores/auth-store";

export const favoriteStatusQueryKey = (movieId: number) => ["favorites", movieId] as const;

export function useFavoritesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });
}

export function useFavoriteStatusQuery(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: favoriteStatusQueryKey(movieId),
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken) && Number.isInteger(movieId) && movieId > 0,
    retry: false,
  });
}

export function useToggleFavoriteMutation(movieId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isFavorite: boolean) => {
      if (isFavorite) {
        await deleteFavorite(movieId);
      } else {
        await createFavorite(movieId);
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["favorites"] }),
        queryClient.invalidateQueries({ queryKey: favoriteStatusQueryKey(movieId) }),
      ]);
    },
    onError: () => {
      alert("즐겨찾기를 변경하지 못했어요. 다시 시도해 주세요.");
    },
  });
}
