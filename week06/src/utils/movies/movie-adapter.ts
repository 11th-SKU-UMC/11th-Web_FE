import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "./tmdb-image";
// [선택 3] 외부 API 스키마를 화면 전용 UI 타입으로 변환하는 adapter
export interface MovieCardViewModel {
  id: number;
  title: string;
  year: string;
  posterUrl: string | null;
  ratingText: string;
  description: string;
}
export function toMovieCard(movie: TmdbMovieListItem): MovieCardViewModel {
  return {
    id: movie.id,
    title: movie.title || movie.original_title,
    year: movie.release_date?.slice(0, 4) || "개봉일 미정",
    posterUrl: getTmdbPosterUrl(movie.poster_path),
    ratingText: movie.vote_average.toFixed(1),
    description: movie.overview || "줄거리 정보가 없습니다.",
  };
}
