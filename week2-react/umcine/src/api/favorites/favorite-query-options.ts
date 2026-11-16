import { queryOptions } from "@tanstack/react-query";
import { getFavorites, getFavoriteStatus } from "./favorites";

export const favoriteKeys = {
  list: (memberId: number | undefined) => ["favorites", memberId, "list"] as const,
  status: (memberId: number | undefined, movieId: number) => ["favorites", memberId, "status", movieId] as const,
};

export const favoritesQueryOptions = (memberId: number | undefined) => queryOptions({
  queryKey: favoriteKeys.list(memberId),
  queryFn: ({ signal }) => getFavorites(signal),
  enabled: Boolean(memberId),
  staleTime: 5 * 60 * 1000,
  retry: false,
});

export const favoriteStatusQueryOptions = (memberId: number | undefined, movieId: number) => queryOptions({
  queryKey: favoriteKeys.status(memberId, movieId),
  queryFn: ({ signal }) => getFavoriteStatus(movieId, signal),
  enabled: Boolean(memberId) && Number.isInteger(movieId) && movieId > 0,
  staleTime: 5 * 60 * 1000,
  retry: false,
});
