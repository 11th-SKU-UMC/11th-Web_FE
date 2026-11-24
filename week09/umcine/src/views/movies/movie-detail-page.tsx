"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { movieQueries } from "../../api/movies/movie-queries";
import type { TmdbMovieDetail } from "../../api/movies/models";
import {
  useAddFavoriteMutation,
  useFavoriteStatusQuery,
  useRemoveFavoriteMutation,
} from "../../hooks/use-favorites";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useMyRatingQuery,
  useUpdateRatingMutation,
} from "../../hooks/use-ratings";
import { useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

const STARS = [1, 2, 3, 4, 5];

function formatRuntime(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}

function MovieDetail({ movie }: { movie: TmdbMovieDetail }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(accessToken);

  // 즐겨찾기
  const favoriteStatusQuery = useFavoriteStatusQuery(movie.id);
  const addFavoriteMutation = useAddFavoriteMutation();
  const removeFavoriteMutation = useRemoveFavoriteMutation();
  const isFavorite = favoriteStatusQuery.data?.isFavorite ?? false;
  const isFavoritePending =
    addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (isFavoritePending) return;

    if (isFavorite) {
      removeFavoriteMutation.mutate(movie.id);
    } else {
      addFavoriteMutation.mutate(movie.id);
    }
  };

  // 평점
  const myRatingQuery = useMyRatingQuery(movie.id);
  const myRating = myRatingQuery.data ?? null;
  const createRatingMutation = useCreateRatingMutation();
  const updateRatingMutation = useUpdateRatingMutation();
  const deleteRatingMutation = useDeleteRatingMutation();

  // 아직 손대지 않았으면 null, 그때는 서버의 내 평점을 보여줌
  const [draftScore, setDraftScore] = useState<number | null>(null);
  const [draftComment, setDraftComment] = useState<string | null>(null);
  const score = draftScore ?? myRating?.score ?? 0;
  const comment = draftComment ?? myRating?.comment ?? "";

  const isRatingPending =
    createRatingMutation.isPending ||
    updateRatingMutation.isPending ||
    deleteRatingMutation.isPending;
  const canSaveRating = isLoggedIn && myRatingQuery.isSuccess && score >= 1 && !isRatingPending;

  const resetDraft = () => {
    setDraftScore(null);
    setDraftComment(null);
  };

  const handleSaveRating = () => {
    if (!canSaveRating) return;
    const trimmedComment = comment.trim() || undefined;

    if (myRating) {
      // 수정은 comment를 안 보내면 지워지므로 현재 후기를 항상 함께 보냄
      updateRatingMutation.mutate(
        { ratingId: myRating.ratingId, score, comment: trimmedComment },
        { onSuccess: resetDraft },
      );
    } else {
      createRatingMutation.mutate(
        { movieId: movie.id, score, comment: trimmedComment },
        { onSuccess: resetDraft },
      );
    }
  };

  const handleDeleteRating = () => {
    if (!myRating || isRatingPending) return;
    if (!confirm("평점을 삭제할까요?")) return;
    deleteRatingMutation.mutate(myRating.ratingId, { onSuccess: resetDraft });
  };

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const genreText = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <main>
      <section className="relative h-[220px] overflow-hidden bg-[#e5e7eb] sm:h-[300px]">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[0.8rem] text-[#9ca3af]">
            이미지 없음
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-black/10" />
        <div className="absolute inset-0 mx-auto flex max-w-[1120px] flex-col justify-between px-6 py-6 text-white">
          <Link
            href="/"
            className="flex w-fit items-center gap-1 text-[0.75rem]"
          >
            <img
              src="/icons/chevron-left.svg"
              alt=""
              className="h-4 w-4 brightness-0 invert"
            />
            영화 목록
          </Link>
          <div>
            <h1 className="text-[1.6rem] font-extrabold leading-tight sm:text-[2.25rem]">
              {movie.title}
            </h1>
            <p className="mt-1 text-[0.75rem]">{movie.original_title}</p>
            <p className="mt-2 text-[0.75rem] font-bold">
              {movie.release_date} · {genreText} · {formatRuntime(movie.runtime)}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-6 py-6 md:grid-cols-[140px_1fr_260px]">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} 포스터`}
            className="aspect-[2/3] w-[140px] rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className="flex aspect-[2/3] w-[140px] items-center justify-center rounded-lg bg-[#e5e7eb] text-[0.75rem] text-[#9ca3af]">
            이미지 없음
          </div>
        )}

        <div className="min-w-0">
          <h2 className="text-[1.05rem] font-bold">{movie.tagline}</h2>
          <p className="mt-3 text-[0.8rem] leading-6 text-[#6b7280]">
            {movie.overview}
          </p>
          <button
            type="button"
            onClick={handleToggleFavorite}
            disabled={isFavoritePending}
            className={cn(
              "mt-4 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-[0.75rem] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60",
              isFavorite ? "bg-[#2447cc]" : "bg-[#3461ff]",
            )}
          >
            <img
              src={isFavorite ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
              alt=""
              className="h-3.5 w-3.5 brightness-0 invert"
            />
            {isFavorite ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
        </div>

        <aside className="md:border-l md:border-[#e5e7eb] md:pl-8">
          <h2 className="text-[1.05rem] font-bold">내 평점</h2>

          {!isLoggedIn ? (
            <p className="mt-3 text-[0.75rem] text-[#6b7280]">
              <Link href="/login" className="font-bold text-[#3461ff]">
                로그인
              </Link>
              하면 평점을 남길 수 있어요.
            </p>
          ) : (
            <>
              <p className="mt-1 text-[0.65rem] text-[#9ca3af]">
                별점은 필수, 후기는 선택이에요.
              </p>
              {myRatingQuery.isError && (
                <p className="mt-2 text-[0.7rem] text-[#ef4444]">
                  내 평점을 불러오지 못했어요.{" "}
                  <button
                    type="button"
                    onClick={() => myRatingQuery.refetch()}
                    className="cursor-pointer font-bold underline"
                  >
                    다시 시도
                  </button>
                </p>
              )}
              <div className="mt-3 flex gap-1.5">
                {STARS.map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`${star}점`}
                    disabled={isRatingPending}
                    onClick={() => setDraftScore(star)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-[#e5e7eb] bg-white disabled:cursor-not-allowed"
                  >
                    <img
                      src="/icons/star.svg"
                      alt=""
                      className={cn("h-4 w-4", star > score && "opacity-40")}
                    />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="영화를 보고 느낀 점을 남겨보세요."
                value={comment}
                maxLength={500}
                disabled={isRatingPending}
                onChange={(e) => setDraftComment(e.target.value)}
                className="mt-3 h-24 w-full resize-none rounded-md border border-[#e5e7eb] bg-white p-3 text-[0.75rem] outline-none placeholder:text-[#9ca3af]"
              />
              <button
                type="button"
                onClick={handleSaveRating}
                disabled={!canSaveRating}
                className="mt-2 w-full cursor-pointer rounded-md bg-[#111] py-2.5 text-[0.75rem] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isRatingPending ? "저장 중" : myRating ? "평점 수정" : "평점 저장"}
              </button>
              {myRating && (
                <button
                  type="button"
                  onClick={handleDeleteRating}
                  disabled={isRatingPending}
                  className="mt-2 w-full cursor-pointer rounded-md border border-[#e5e7eb] bg-white py-2.5 text-[0.75rem] font-bold text-[#ef4444] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  평점 삭제
                </button>
              )}
            </>
          )}
        </aside>
      </section>
    </main>
  );
}

export function MovieDetailPage({ movieId }: { movieId: string }) {
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const movieDetailQuery = useQuery(movieQueries.detail(parsedMovieId));

  if (!isValidMovieId) {
    return (
      <main className="mx-auto max-w-[1120px] px-6 py-8">
        올바르지 않은 영화 번호예요.
      </main>
    );
  }

  if (movieDetailQuery.isPending) {
    return (
      <main className="mx-auto max-w-[1120px] px-6 py-8 text-[#6b7280]">
        영화 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (movieDetailQuery.isError) {
    return (
      <main className="mx-auto max-w-[1120px] px-6 py-8 text-[#ef4444]">
        {getMovieDetailErrorMessage(movieDetailQuery.error)}
      </main>
    );
  }

  return <MovieDetail key={movieDetailQuery.data.id} movie={movieDetailQuery.data} />;
}