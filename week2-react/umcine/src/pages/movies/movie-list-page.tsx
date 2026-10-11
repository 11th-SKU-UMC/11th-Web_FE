import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieGrid } from "../../components/movies/movie-grid";
import { MovieSortControl } from "../../components/movies/movie-sort-control";
import { Pagination } from "../../components/movies/pagination";
import { useMoviePreferenceStore } from "../../stores/movie-preference-store";

export function MovieListPage() {
  const { page = 1 } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const sortOrder = useMoviePreferenceStore((state) => state.sortOrder);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);
      setMovies([]);

      try {
        const response = await getMovies({ page });
        if (!ignore) {
          setMovies(response.results);
          setTotalPages(Math.min(response.total_pages, 500));
        }
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [page, retryCount]);

  const visibleMovies =
    sortOrder === "title"
      ? [...movies].sort((first, second) =>
          first.title.localeCompare(second.title, "ko"),
        )
      : movies;

  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] w-full max-w-[1440px] px-5 py-9 sm:min-h-[calc(100vh-72px)] sm:px-7 sm:py-12 lg:px-12 xl:px-20">
      <div className="mb-6">
        <p className="mb-1 text-[11px] font-extrabold tracking-[0.14em] text-[#4f83ff]">
          UMCINE COLLECTION
        </p>
        <h1 className="text-[28px] leading-10 font-extrabold tracking-[-0.04em] text-white sm:text-[34px] lg:text-[40px] lg:leading-12">
          영화 목록
        </h1>
      </div>
      {isLoading ? (
        <p className="my-12 text-center text-[#969da8]" role="status">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : errorMessage ? (
        <div className="my-12 grid justify-items-center gap-4 text-[#969da8]" role="alert">
          <p>{errorMessage}</p>
          <button
            className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-white hover:border-blue-500"
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            다시 시도
          </button>
        </div>
      ) : (
        <>
          {movies.length > 0 && <MovieSortControl />}
          <MovieGrid movies={visibleMovies} />
          {movies.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(nextPage) =>
                navigate({ search: { page: nextPage } })
              }
            />
          )}
        </>
      )}
    </main>
  );
}
