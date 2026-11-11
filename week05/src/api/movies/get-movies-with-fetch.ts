import { assertTmdbConfig, env } from "../../config/env";
import type { TmdbMovieListResponse } from "./models";

// [필수] ky 없이 fetch를 직접 사용한 실습. 브라우저 개발자 도구 Network에서 확인.
export async function getMoviesWithFetch(page = 1): Promise<TmdbMovieListResponse> {
  assertTmdbConfig();
  const searchParams = new URLSearchParams({ language: "ko-KR", page: String(page) });
  const response = await fetch(`${env.tmdbApiBaseUrl}/movie/popular?${searchParams}`, {
    headers: { Authorization: `Bearer ${env.tmdbAccessToken}` },
  });
  // fetch는 HTTP 4xx/5xx 응답만으로 reject되지 않으므로 직접 확인한다.
  if (!response.ok) throw new Error(`인기 영화 요청 실패: HTTP ${response.status}`);
  return (await response.json()) as TmdbMovieListResponse;
}
