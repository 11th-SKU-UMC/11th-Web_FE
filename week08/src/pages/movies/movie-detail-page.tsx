import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { getFavoriteStatus } from "../../api/favorites/favorites";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { useCreateMovieRecordMutation } from "../../hooks/use-create-movie-record-mutation";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../hooks/use-favorite-mutations";
import { useAuthStore } from "../../stores/auth-store";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(accessToken);

  const numericId = Number(movieId);
  const isValidMovieId = Number.isInteger(numericId) && numericId > 0;

  const movieQuery = useQuery({
    queryKey: ["movies", "detail", numericId],
    queryFn: () => getMovieDetail(numericId),
    enabled: isValidMovieId,
    staleTime: 30 * 1000,
  });

  // 1. 특정 영화 즐겨찾기 여부 조회 (GET /favorites/{movieId})
  const favoriteStatusQuery = useQuery({
    queryKey: ["favorites", numericId],
    queryFn: () => getFavoriteStatus(numericId),
    enabled: isValidMovieId && isLoggedIn,
  });

  // 2. 즐겨찾기 등록/해제 Mutation (POST /favorites, DELETE /favorites/{movieId})
  const addFavoriteMutation = useAddFavoriteMutation(numericId);
  const removeFavoriteMutation = useRemoveFavoriteMutation(numericId);

  // 3. 영화 기록 저장 상태 및 Mutation (POST /movie-records)
  const [score, setScore] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [addToFavorites, setAddToFavorites] = useState<boolean>(true);
  const createMovieRecordMutation = useCreateMovieRecordMutation(numericId);

  if (!isValidMovieId) {
    return (
      <main className="p-6 text-red-500 text-center">
        유효하지 않은 영화 ID입니다.
      </main>
    );
  }

  if (movieQuery.isLoading) {
    return (
      <main className="p-6 text-white text-center">
        상세 정보를 불러오는 중...
      </main>
    );
  }

  if (movieQuery.isError || !movieQuery.data) {
    return (
      <main className="p-6 text-red-500 text-center">
        영화 상세 정보를 불러오지 못했어요.
      </main>
    );
  }

  const movie = movieQuery.data;
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = movie.backdrop_path
    ? getTmdbPosterUrl(movie.backdrop_path)
    : null;

  const isFavorite = favoriteStatusQuery.data?.isFavorite ?? false;
  const isFavoriteMutating =
    addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const handleToggleFavorite = () => {
    if (!isLoggedIn || isFavoriteMutating) return;

    if (isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  const handleRecordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedComment = comment.trim();
    if (!isLoggedIn || !trimmedComment || createMovieRecordMutation.isPending) {
      return;
    }

    createMovieRecordMutation.mutate(
      {
        movieId: numericId,
        score,
        comment: trimmedComment,
        addToFavorites,
      },
      {
        onSuccess: () => {
          setComment("");
        },
      },
    );
  };

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
              {movie.release_date} · 평점: ⭐ {movie.vote_average.toFixed(1)} (
              {movie.vote_count}명 참여)
            </p>
          </div>
        </div>
      )}

      {/* 본문 상세 정보 */}
      <div className="p-6 max-w-5xl mx-auto -mt-20 relative z-20 space-y-6">
        <div className="flex flex-col md:flex-row gap-8 bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-800">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full md:w-72 rounded-lg object-cover shadow-md aspect-[2/3]"
            />
          ) : (
            <div className="w-full md:w-72 aspect-[2/3] bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
              이미지 없음
            </div>
          )}
          <div className="flex flex-col justify-center flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <h2 className="text-2xl font-bold">{movie.title}</h2>

              {/* 즐겨찾기 토글 버튼 */}
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  disabled={favoriteStatusQuery.isLoading || isFavoriteMutating}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                    isFavorite
                      ? "bg-red-600 border-red-500 text-white hover:bg-red-700"
                      : "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                  } disabled:opacity-50`}
                >
                  {favoriteStatusQuery.isLoading
                    ? "확인 중..."
                    : isFavorite
                      ? "★ 즐겨찾기 해제"
                      : "☆ 즐겨찾기 추가"}
                </button>
              )}
            </div>

            <p className="text-zinc-400 text-sm mb-4">
              {movie.original_title} ({movie.release_date})
            </p>
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-red-600/30 text-red-400 text-xs px-2.5 py-1 rounded-full border border-red-600/40"
                  >
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

        {/* 영화 기록 (평점 + 즐겨찾기 동시 처리) 영역 */}
        <section className="bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">내 영화 기록 남기기</h3>

          {!isLoggedIn ? (
            <p className="text-zinc-400 text-sm">
              즐겨찾기 및 평점 기록을 남기려면{" "}
              <Link to="/login" className="text-red-400 underline">
                로그인
              </Link>
              해 주세요.
            </p>
          ) : (
            <form onSubmit={handleRecordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  평점 선택 (1 ~ 5점)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setScore(value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                        score === value
                          ? "bg-yellow-500 text-black border-yellow-400"
                          : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                      }`}
                    >
                      ⭐ {value}점
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="movie-comment"
                  className="block text-sm text-zinc-300 mb-2"
                >
                  한줄평
                </label>
                <textarea
                  id="movie-comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="영화에 대한 감상평을 입력해 주세요."
                  className="w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addToFavorites}
                  onChange={(e) => setAddToFavorites(e.target.checked)}
                  className="rounded border-zinc-600 bg-zinc-800"
                />
                즐겨찾기에도 함께 등록하기
              </label>

              <button
                type="submit"
                disabled={!comment.trim() || createMovieRecordMutation.isPending}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold disabled:opacity-50"
              >
                {createMovieRecordMutation.isPending
                  ? "저장 중..."
                  : "영화 기록 저장"}
              </button>
            </form>
          )}

          {createMovieRecordMutation.data && (
            <div className="mt-4 p-4 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-200">
              <p className="font-semibold text-yellow-400 mb-1">
                방금 저장된 기록: ⭐ {createMovieRecordMutation.data.rating.score}점
              </p>
              <p>{createMovieRecordMutation.data.rating.comment}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default MovieDetailPage;