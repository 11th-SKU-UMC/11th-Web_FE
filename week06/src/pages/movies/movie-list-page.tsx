import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMovies } from "../../api/movies/get-movies";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import Pagination from "../../components/movies/pagination";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  if (moviesQuery.isPending) {
    return (
      <div className="p-6 text-center text-white">
        영화를 불러오는 중이에요...
      </div>
    );
  }

  if (moviesQuery.isError) {
    return (
      <div className="p-6 text-center text-red-500">
        {moviesQuery.error.message}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="p-6 text-center text-white">
        표시할 영화가 없어요.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">
        인기 영화 목록
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => {
          const posterUrl = getTmdbPosterUrl(movie.poster_path);

          return (
            <Link
              key={movie.id}
              to="/movies/$movieId"
              params={{ movieId: String(movie.id) }}
              className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full h-auto object-cover aspect-[2/3]"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-700 flex items-center justify-center text-gray-400">
                  이미지 없음
                </div>
              )}

              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-white font-semibold text-sm truncate">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  {movie.release_date}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default MovieListPage;