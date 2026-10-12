import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

function formatRuntime(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}

export function MovieDetailPage() {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId =
    Number.isInteger(parsedMovieId) && parsedMovieId > 0;
  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    if (!isValidMovieId) {
      setMovie(null);
      setErrorMessage("올바르지 않은 영화 번호예요.");
      setIsLoading(false);

      return () => {
        ignore = true;
      };
    }

    async function loadMovie() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovieDetail(parsedMovieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) {
          setErrorMessage(getMovieDetailErrorMessage(error));
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovie();

    return () => {
      ignore = true;
    };
  }, [isValidMovieId, parsedMovieId]);

  if (!isValidMovieId) {
    return (
      <main className="grid min-h-[calc(100vh-91px)] place-items-center bg-[#f5f6f8] px-5 text-lg font-bold text-[#606774]">
        올바르지 않은 영화 번호예요.
      </main>
    );
  }

  if (isLoading) {
    return (
      <main
        className="grid min-h-[calc(100vh-91px)] place-items-center bg-[#f5f6f8] px-5 text-lg font-bold text-[#606774]"
        role="status"
      >
        영화 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (errorMessage || !movie) {
    return (
      <main
        className="grid min-h-[calc(100vh-91px)] place-items-center bg-[#f5f6f8] px-5 text-lg font-bold text-[#606774]"
        role="alert"
      >
        {errorMessage ?? "영화 정보를 불러오지 못했어요."}
      </main>
    );
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#f5f6f8]">
      <section className="relative min-h-[560px] overflow-hidden bg-[#17191e]">
        {backdropUrl && (
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            src={backdropUrl}
            alt=""
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17191e] via-[#17191e]/80 to-[#17191e]/20" />
        <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <Link
            className="mb-8 inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-white/10"
            to="/"
          >
            ← 영화 목록
          </Link>
          <div className="grid items-center gap-8 sm:grid-cols-[220px_1fr] sm:gap-10">
            {posterUrl ? (
              <img
                className="w-40 rounded-xl shadow-2xl sm:w-full"
                src={posterUrl}
                alt={`${movie.title} 포스터`}
              />
            ) : (
              <div className="grid aspect-[2/3] w-40 place-items-center rounded-xl bg-white/10 text-sm text-white/70 sm:w-full">
                이미지 없음
              </div>
            )}
            <div className="max-w-2xl text-white">
              <p className="mb-2 text-sm font-semibold text-white/70">
                {movie.original_title}
              </p>
              <h1 className="mb-4 text-3xl leading-tight font-black sm:text-5xl">
                {movie.title}
              </h1>
              <p className="mb-5 text-sm text-white/80">
                {movie.release_date} <span className="px-2">·</span>
                {movie.genres.map((genre) => genre.name).join(" · ")} <span className="px-2">·</span>
                {formatRuntime(movie.runtime)}
              </p>
              {movie.tagline && (
                <h2 className="mb-3 text-xl font-bold">{movie.tagline}</h2>
              )}
              <p className="text-sm leading-7 text-white/85">{movie.overview}</p>
              <button
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-bold text-white"
                type="button"
                aria-pressed={bookmarkedMovieIds.includes(movie.id)}
                onClick={() => toggleBookmark(movie.id)}
              >
                {bookmarkedMovieIds.includes(movie.id) ? "북마크 해제" : "북마크"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
