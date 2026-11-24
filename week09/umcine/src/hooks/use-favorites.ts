import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getFavoriteStatus, getMyFavorites } from "../api/favorites/favorites";
import { favoriteMutations } from "../api/favorites/favorite-mutations";
import { useAuthStore } from "../stores/auth-store";

// 내 즐겨찾기 목록 (마이페이지)
export function useMyFavoritesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getMyFavorites,
    enabled: Boolean(accessToken),
  });
}

// 이 영화를 즐겨찾기했는지 (영화 상세)
export function useFavoriteStatusQuery(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["favorites", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken),
  });
}

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();
  return useMutation(favoriteMutations.add(queryClient));
}

export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient();
  return useMutation(favoriteMutations.remove(queryClient));
}

// 목록 화면용: 즐겨찾기한 영화 ID 목록 + 토글 함수
export function useFavoriteToggle() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoritesQuery = useMyFavoritesQuery();
  const addFavoriteMutation = useAddFavoriteMutation();
  const removeFavoriteMutation = useRemoveFavoriteMutation();

  const favoriteMovieIds = favoritesQuery.data?.map((favorite) => favorite.movieId) ?? [];
  const isPending = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const toggleFavorite = (movieId: number) => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    if (isPending) return;

    if (favoriteMovieIds.includes(movieId)) {
      removeFavoriteMutation.mutate(movieId);
    } else {
      addFavoriteMutation.mutate(movieId);
    }
  };

  return { favoriteMovieIds, toggleFavorite, isPending };
}