import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  
  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const numericId = Number(movieId);

    if (isNaN(numericId)) {
      setErrorMessage("유효하지 않은 영화 ID입니다.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    getMovieDetail(numericId)
      .then((data) => {
        if (!ignore) setMovie(data);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("영화 상세 정보를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [movieId]);

  if (isLoading) {
    return <main className="p-6 text-white text-center">상세 정보를 불러오는 중...</main>;
  }

  if (errorMessage || !movie) {
    return <main className="p-6 text-red-500 text-center">{errorMessage || "해당 영화를 찾을 수 없습니다."}</main>;
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = movie.backdrop_path ? getTmdbPosterUrl(movie.backdrop_path) : null;

  return (
    <main className="min-h-screen bg-black text-white pb-16">
      {/* 백드롭(배경) 배너 영역 */}
      {backdropUrl && (
        <div className="relative w-full h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute bottom-6 left-6 z-20 max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-zinc-300 text-sm">
              {movie.release_date} · 평점: ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count}명 참여)
            </p>
          </div>
        </div>
      )}

      {/* 본문 상세 정보 */}
      <div className="p-6 max-w-5xl mx-auto -mt-20 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-800">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} className="w-full md:w-72 rounded-lg object-cover shadow-md aspect-[2/3]" />
          ) : (
            <div className="w-full md:w-72 aspect-[2/3] bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
              이미지 없음
            </div>
          )}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-zinc-400 text-sm mb-4">
              {movie.original_title} ({movie.release_date})
            </p>
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-red-600/30 text-red-400 text-xs px-2.5 py-1 rounded-full border border-red-600/40">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
              {movie.overview || "등록된 줄거리가 없습니다."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetailPage;