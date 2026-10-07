import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  const [isBookmarked, setIsBookmarked] = useState(
    movie?.isBookmarked ?? false,
  );

  if (!movie) {
    return (
      <main className="mx-auto max-w-[1040px] px-5 py-8 sm:px-10">
        <p>영화를 찾을 수 없어요.</p>
      </main>
    );
  }

  return (
    <main className="bg-[#f5f6f8]">
      <section className="relative h-[280px] overflow-hidden sm:h-[330px]">
        <img
          className="h-full w-full object-cover"
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 mx-auto flex max-w-[1040px] flex-col justify-between px-5 py-6 sm:px-10">
          <Link
            className="w-fit text-sm text-white no-underline"
            to="/"
          >
            ‹ 영화 목록
          </Link>

          <div className="pb-2 text-white">
            <h1 className="mb-1 text-[24px] font-bold sm:text-[30px]">
              {movie.title}
            </h1>

            <p className="mb-1 text-sm">
              {movie.originalTitle}
            </p>

            <p className="text-xs">
              {movie.releaseDate} · {movie.genres.join(" · ")} ·{" "}
              {movie.runtime}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1040px] grid-cols-1 gap-6 px-5 py-6 sm:px-10 lg:grid-cols-[155px_1fr_250px]">
        <img
          className="h-[230px] w-[155px] rounded-[6px] object-cover"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <div className="min-w-0">
          <h2 className="mb-3 text-lg font-bold">
            {movie.tagline}
          </h2>

          <p className="text-sm leading-7 text-[#666666]">
            {movie.overview}
          </p>

          <button
            type="button"
            className={cn(
              "mt-5 flex cursor-pointer items-center gap-2 rounded-[6px] border-0 px-4 py-2 text-sm font-semibold text-white",
              isBookmarked ? "bg-blue-700" : "bg-blue-600",
            )}
            onClick={() =>
              setIsBookmarked((current) => !current)
            }
          >
            <img
              className="h-4 w-4 brightness-0 invert"
              src={
                isBookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
            />

            {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
        </div>

        <aside className="border-t border-[#e5e7eb] pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <h2 className="mb-1 text-lg font-bold">
            내 평점
          </h2>

          <p className="mb-3 text-xs text-[#9ca3af]">
            별점을 선택하고 평가를 남겨보세요.
          </p>

          <div className="mb-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#e5e7eb] bg-white text-xl text-[#9ca3af]"
                aria-label={`${star}점`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="mb-3 h-[90px] w-full resize-none rounded-[6px] border border-[#e5e7eb] bg-white p-3 text-xs outline-none"
            placeholder="영화에 남기고 싶은 평을 남겨보세요."
          />

          <button
            type="button"
            className="w-full rounded-[6px] border-0 bg-[#111111] py-2 text-sm font-semibold text-white"
          >
            평점 저장
          </button>
        </aside>
      </section>
    </main>
  );
}