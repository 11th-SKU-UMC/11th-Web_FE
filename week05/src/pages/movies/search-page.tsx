import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";
import { useBookmarkStore } from "../../stores/bookmark-store";
import type { Movie } from "../../types/movie";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";

function toMovie(movie: TmdbMovieListItem, isBookmarked: boolean): Movie {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: getTmdbPosterUrl(movie.poster_path),
    backdropPath: getTmdbBackdropUrl(movie.backdrop_path),
    genres: movie.genre_ids.map(String),
    runtime: "상영 시간 정보가 없어요.",
    tagline: "",
    overview: movie.overview,
    isBookmarked,
  };
}

export function SearchPage() {
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [results, setResults] = useState<TmdbMovieListItem[]>([]);
  const [resultQuery, setResultQuery] = useState("");
  const [loadingQuery, setLoadingQuery] = useState("");
  const [error, setError] = useState<{ query: string; message: string } | null>(null);

  const normalizedQuery = query?.trim() ?? "";

  useEffect(() => {
    let ignore = false;
    queueMicrotask(() => {
      if (ignore || !normalizedQuery) return;
      setLoadingQuery(normalizedQuery);
      setError(null);
      searchMovies({ query: normalizedQuery })
        .then((response) => { if (!ignore) { setResults(response.results); setResultQuery(normalizedQuery); } })
        .catch((requestError: unknown) => {
          if (!ignore) setError({ query: normalizedQuery, message: requestError instanceof Error && requestError.message.includes("Access Token") ? requestError.message : "검색 결과를 불러오지 못했어요." });
        })
        .finally(() => { if (!ignore) setLoadingQuery(""); });
    });
    return () => { ignore = true; };
  }, [normalizedQuery]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = String(new FormData(event.currentTarget).get("query") ?? "").trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main>
      <h1>영화 검색</h1>
      <form onSubmit={handleSubmit}>
        <input
          key={query ?? ""}
          name="query"
          aria-label="검색어"
          defaultValue={query ?? ""}
        />
        <button type="submit">검색</button>
      </form>

      {!normalizedQuery ? (
        <p>검색어를 입력해 주세요.</p>
      ) : (
        <>
          <h2>‘{query}’ 검색 결과</h2>
          {loadingQuery === normalizedQuery ? <p role="status">검색 결과를 불러오는 중이에요.</p> : error?.query === normalizedQuery ? <p role="alert">{error.message}</p> : resultQuery !== normalizedQuery || results.length === 0 ? (
            <p>검색 결과가 없어요.</p>
          ) : (
            <>
            <p>영화 {results.length}편</p>
            <MovieGrid
              movies={results.map((movie) => toMovie(movie, bookmarkedMovieIds.includes(movie.id)))}
              onToggleBookmark={toggleBookmark}
            />
            </>
          )}
        </>
      )}
    </main>
  );
}
