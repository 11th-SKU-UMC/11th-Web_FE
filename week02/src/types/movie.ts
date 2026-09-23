export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  genres: string[];
  runtime: string;
  tagline: string;
  overview: string;
  isBookmarked: boolean;
}

export interface MovieSearchResult {
  id: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  posterPath: string | null;
}
