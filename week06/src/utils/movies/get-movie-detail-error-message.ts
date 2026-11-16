import { isHTTPError } from "ky";
export function getMovieDetailErrorMessage(error: unknown) {
  if (isHTTPError(error) && error.response.status === 404) return "영화를 찾을 수 없어요.";
  if (isHTTPError(error) && error.response.status === 401) return "TMDB API 인증 토큰을 확인해 주세요.";
  if (error instanceof Error && error.message.includes(".env.local")) return error.message;
  return "영화 정보를 불러오지 못했어요.";
}
