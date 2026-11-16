import { apiClient } from "../api-client";
import { authApi } from "../auth-api";
import type { ApiResponse } from "../types";

// ===== 타입 (BE DTO 번역) =====
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
  hasNext: boolean;
}

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment?: string;
}

export interface UpdateRatingRequest {
  ratingId: number;
  score: number;
  comment?: string;
}

// ===== 요청 함수 =====

// 공개 API → apiClient, 감싸기 없이 RatingPage가 바로 옴
export function getMemberRatings(memberId: number) {
  return apiClient
    .get(`members/${memberId}/ratings`, { searchParams: { page: 0, size: 50 } })
    .json<RatingPage>();
}

// 로그인 필요 → authApi
export function createRating(body: CreateRatingRequest) {
  return authApi.post("ratings", { json: body }).json<ApiResponse<Rating>>();
}

export function updateRating({ ratingId, ...body }: UpdateRatingRequest) {
  return authApi.patch(`ratings/${ratingId}`, { json: body }).json<ApiResponse<Rating>>();
}

export function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}