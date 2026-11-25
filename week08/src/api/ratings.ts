import { authApi } from "./auth-api";

export interface RatingRecord {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string;
}

export interface UpdateRatingRequest {
  score: number;
  comment: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export async function getMemberRatings(memberId: number): Promise<RatingRecord[]> {
  const response = await authApi
    .get(`members/${memberId}/ratings`)
    .json<ApiResponse<RatingRecord[]>>();
  return response.result;
}

export function createRating(body: CreateRatingRequest) {
  return authApi.post("ratings", { json: body }).json<ApiResponse<RatingRecord>>();
}

export function updateRating(ratingId: number, body: UpdateRatingRequest) {
  return authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<ApiResponse<RatingRecord>>();
}

export function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}
