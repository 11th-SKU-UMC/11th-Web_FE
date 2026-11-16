import { authApi } from "../auth-api";
import type { ApiResponse } from "../models";

export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

export interface FavoriteStatus {
  movieId: number;
  isFavorite: boolean;
}

export async function getFavorites(signal?: AbortSignal) {
  const response = await authApi.get("favorites", { signal }).json<ApiResponse<Favorite[]>>();
  return response.result;
}

export async function getFavoriteStatus(movieId: number, signal?: AbortSignal) {
  const response = await authApi.get(`favorites/${movieId}`, { signal }).json<ApiResponse<FavoriteStatus>>();
  return response.result;
}

export async function addFavorite(movieId: number) {
  const response = await authApi.post("favorites", { json: { movieId } }).json<ApiResponse<Favorite>>();
  return response.result;
}

export async function deleteFavorite(movieId: number) {
  await authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
}
