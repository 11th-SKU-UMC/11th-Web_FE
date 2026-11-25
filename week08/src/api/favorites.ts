import { authApi } from "./auth-api";

export interface FavoriteRecord {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

interface FavoriteStatus {
  isFavorite: boolean;
}

export async function getFavorites(): Promise<FavoriteRecord[]> {
  const response = await authApi
    .get("favorites")
    .json<ApiResponse<FavoriteRecord[]>>();
  return response.result;
}

export async function getFavoriteStatus(movieId: number): Promise<boolean> {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<ApiResponse<FavoriteStatus>>();
  return response.result.isFavorite;
}

export function createFavorite(movieId: number) {
  return authApi
    .post("favorites", { json: { movieId } })
    .json<ApiResponse<FavoriteRecord>>();
}

export function deleteFavorite(movieId: number) {
  return authApi
    .delete(`favorites/${movieId}`)
    .json<ApiResponse<null>>();
}
