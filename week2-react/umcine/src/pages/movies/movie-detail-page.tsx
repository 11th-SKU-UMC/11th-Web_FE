import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;
  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isValidMovieId) return;

    let ignore = false;

    async function loadMovie() {
      setIsLoading(true);
      setErrorMessage(null);
      setMovie(null);

      try {
        const response = await getMovieDetail(parsedMovieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovie();

    return () => {
      ignore = true;
    };
  }, [isValidMovieId, parsedMovieId, retryCount]);

  if (!isValidMovieId || isLoading || errorMessage || !movie || movie.id !== parsedMovieId) {
    const message = !isValidMovieId
      ? "올바르지 않은 영화 번호예요."
      : errorMessage || "영화 정보를 불러오는 중이에요.";

    return (
      <main className="grid min-h-[calc(100vh-72px)] place-content-center gap-4 px-5 text-center text-[#969da8]">
        <p role={errorMessage || !isValidMovieId ? "alert" : "status"}>{message}</p>
        {isValidMovieId && errorMessage && (
          <button
            className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-white hover:border-blue-500"
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            다시 시도
          </button>
        )}
      </main>
    );
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <main className="relative isolate min-h-[calc(100vh-64px)] overflow-hidden px-5 py-9 sm:min-h-[calc(100vh-72px)] md:px-7 md:py-12 lg:px-8 lg:py-[70px]">
      {backdropUrl ? (
        <img
          className="absolute inset-0 -z-20 h-full w-full scale-[1.02] object-cover opacity-[0.42]"
          src={backdropUrl}
          alt=""
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 -z-20 grid place-items-center bg-[#30343c] text-[#c3c8d0]" aria-hidden="true">
          이미지 없음
        </div>
      )}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_8%,rgba(0,0,0,0.76)_48%,rgba(0,0,0,0.76)),linear-gradient(0deg,#000_0%,transparent_55%)]"
        aria-hidden="true"
      />

      <section className="mx-auto grid w-full max-w-[1120px] gap-8 md:grid-cols-[190px_minmax(0,1fr)] md:items-center lg:grid-cols-[280px_minmax(0,640px)] lg:gap-[54px]">
        {posterUrl ? (
          <img
            className="aspect-[2/3] w-[min(62vw,250px)] rounded-xl object-cover shadow-[0_24px_70px_rgba(0,0,0,0.55)] md:w-full"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="grid aspect-[2/3] w-[min(62vw,250px)] place-items-center rounded-xl bg-[#30343c] text-sm text-[#c3c8d0] md:w-full">
            이미지 없음
          </div>
        )}

        <div>
          <Link
            className="mb-7 inline-block text-sm font-bold text-[#c3c8d0] no-underline hover:text-white md:mb-10"
            to="/"
          >
            ← 영화 목록
          </Link>
          <p className="mb-2 text-[13px] font-extrabold tracking-[0.04em] text-[#7ba3ff] uppercase">
            {movie.original_title}
          </p>
          <h1 className="text-[clamp(38px,5vw,64px)] leading-[1.08] font-extrabold tracking-[-0.045em] text-white">
            {movie.title}
          </h1>
          {movie.tagline && (
            <h2 className="mt-3.5 mb-7 text-lg font-medium text-[#d6d9df]">
              {movie.tagline}
            </h2>
          )}
          <div className="mb-7">
            <BookmarkButton movieId={movie.id} movieTitle={movie.title} />
          </div>

          <dl className="mb-7 flex flex-wrap gap-x-9 gap-y-6">
            <div className="grid gap-1">
              <dt className="text-[11px] font-extrabold tracking-[0.08em] text-[#777f8c]">
                개봉
              </dt>
              <dd className="m-0 text-sm font-semibold text-white">
                {movie.release_date || "개봉일 미정"}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-[11px] font-extrabold tracking-[0.08em] text-[#777f8c]">
                장르
              </dt>
              <dd className="m-0 text-sm font-semibold text-white">
                {movie.genres.map((genre) => genre.name).join(" · ") || "정보 없음"}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-[11px] font-extrabold tracking-[0.08em] text-[#777f8c]">
                상영 시간
              </dt>
              <dd className="m-0 text-sm font-semibold text-white">
                {movie.runtime === null ? "정보 없음" : `${movie.runtime}분`}
              </dd>
            </div>
          </dl>

          <p className="max-w-[600px] text-base leading-7 text-[#c3c8d0]">
            {movie.overview || "줄거리 정보가 없어요."}
          </p>
        </div>
      </section>
    </main>
  );
}
