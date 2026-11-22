import { authApi } from "../auth-api";

export interface FavoriteItem {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

export interface AddFavoriteRequest {
  movieId: number;
}

export interface AddFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FavoriteItem;
}

export interface GetFavoritesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FavoriteItem[];
}

export interface FavoriteStatusResult {
  isFavorite: boolean;
}

export interface GetFavoriteStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FavoriteStatusResult;
}

export interface RemoveFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export async function addFavorite(body: AddFavoriteRequest): Promise<FavoriteItem> {
  const response = await authApi.post("favorites", { json: body }).json<AddFavoriteResponse>();
  return response.result;
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  const response = await authApi.get("favorites").json<GetFavoritesResponse>();
  return response.result;
}

export async function getFavoriteStatus(movieId: number): Promise<FavoriteStatusResult> {
  const response = await authApi.get(`favorites/${movieId}`).json<GetFavoriteStatusResponse>();
  return response.result;
}

export async function removeFavorite(movieId: number): Promise<void> {
  await authApi.delete(`favorites/${movieId}`).json<RemoveFavoriteResponse>();
}