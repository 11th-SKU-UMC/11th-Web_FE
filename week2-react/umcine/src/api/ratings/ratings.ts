import { authApi } from "../auth-api";
import { apiClient } from "../api-client";
import type { ApiResponse } from "../models";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RatingPage {
  content: Rating[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface RatingRequest {
  score: number;
  comment: string;
}

export async function getMemberRatings(memberId: number, signal?: AbortSignal): Promise<Rating[]> {
  const ratings: Rating[] = [];
  let page = 0;
  let totalPages: number;
  // BE의 조회 응답은 ApiResponse 래퍼 없이 페이지 정보를 직접 반환해요.
  // 첫 페이지만 검사하면 오래된 영화의 평점을 놓치므로 마지막 페이지까지 확인해요.
  do {
    const response = await apiClient.get(`members/${memberId}/ratings`, {
      searchParams: { page, size: 100 }, signal,
    }).json<RatingPage>();
    ratings.push(...response.content);
    totalPages = response.totalPages;
    page += 1;
  } while (page < totalPages);
  return ratings;
}

export async function createRating(body: RatingRequest & { movieId: number }) {
  const response = await authApi.post("ratings", { json: body }).json<ApiResponse<Rating>>();
  return response.result;
}

export async function updateRating(ratingId: number, body: RatingRequest) {
  const response = await authApi.patch(`ratings/${ratingId}`, { json: body }).json<ApiResponse<Rating>>();
  return response.result;
}

export async function deleteRating(ratingId: number) {
  await authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}
