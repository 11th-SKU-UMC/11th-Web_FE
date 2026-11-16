import { authApi } from "../auth-api";
import type { FavoriteItem } from "../favorites/favorites";

export interface CreateMovieRecordRequest {
  movieId: number;
  score: number;
  comment: string;
  addToFavorites: boolean;
}

export interface MovieRatingResult {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string;
}

export interface CreateMovieRecordResult {
  rating: MovieRatingResult;
  favorite: FavoriteItem | null;
}

export interface CreateMovieRecordResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: CreateMovieRecordResult;
}

export async function createMovieRecord(
  body: CreateMovieRecordRequest,
): Promise<CreateMovieRecordResult> {
  const response = await authApi
    .post("movie-records", { json: body })
    .json<CreateMovieRecordResponse>();
  return response.result;
}