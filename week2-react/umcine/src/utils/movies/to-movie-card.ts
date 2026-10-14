import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "./tmdb-image";

export interface MovieCardView {
  id: number;
  title: string;
  releaseDate: string;
  posterUrl: string | null;
}

export function toMovieCard(movie: TmdbMovieListItem): MovieCardView {
  return {
    id: movie.id,
    title: movie.title,
    releaseDate: movie.release_date,
    posterUrl: getTmdbPosterUrl(movie.poster_path),
  };
}
