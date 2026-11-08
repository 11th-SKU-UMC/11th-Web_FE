import { queryOptions } from "@tanstack/react-query";
import { getMovies } from "./get-movies";
import { searchMovies } from "./search-movies";
import { getMovieDetail } from "./get-movie-detail";

// [선택 미션] queryKey와 queryFn을 하나의 옵션으로 묶어 관리합니다.
export const movieQueries = {
  list: (page: number) => queryOptions({
    queryKey: ["movies", "list", { page }] as const,
    queryFn: () => getMovies({ page }),
  }),
  search: (query: string, page: number) => queryOptions({
    queryKey: ["movies", "search", { query, page }] as const,
    queryFn: () => searchMovies({ query, page }),
    enabled: query.length > 0,
  }),
  detail: (movieId: number) => queryOptions({
    queryKey: ["movies", "detail", movieId] as const,
    queryFn: () => getMovieDetail(movieId),
    enabled: Number.isSafeInteger(movieId) && movieId > 0,
    staleTime: 30 * 1000, // 상세 데이터는 30초 동안 fresh
  }),
};
