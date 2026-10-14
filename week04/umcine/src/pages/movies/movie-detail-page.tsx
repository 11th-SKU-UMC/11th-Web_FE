import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

const STARS = [1, 2, 3, 4, 5];

function MovieDetail({ movie }: { movie: Movie }) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movie.id),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const [rating, setRating] = useState(0);

  return (
    <main>
      <section className="relative h-[220px] overflow-hidden sm:h-[300px]">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-black/10" />
        <div className="absolute inset-0 mx-auto flex max-w-[1120px] flex-col justify-between px-6 py-6 text-white">
          <Link
            to="/"
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
            <p className="mt-1 text-[0.75rem]">{movie.originalTitle}</p>
            <p className="mt-2 text-[0.75rem] font-bold">
              {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-6 py-6 md:grid-cols-[140px_1fr_260px]">
        <img
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          className="aspect-[2/3] w-[140px] rounded-lg object-cover shadow-lg"
        />

        <div className="min-w-0">
          <h2 className="text-[1.05rem] font-bold">{movie.tagline}</h2>
          <p className="mt-3 text-[0.8rem] leading-6 text-[#6b7280]">
            {movie.overview}
          </p>
          <button
            type="button"
            onClick={() => toggleBookmark(movie.id)}
            className={cn(
              "mt-4 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-[0.75rem] font-bold text-white",
              isBookmarked ? "bg-[#2447cc]" : "bg-[#3461ff]",
            )}
          >
            <img
              src={
                isBookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
              className="h-3.5 w-3.5 brightness-0 invert"
            />
            {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
        </div>

        <aside className="md:border-l md:border-[#e5e7eb] md:pl-8">
          <h2 className="text-[1.05rem] font-bold">내 평점</h2>
          <p className="mt-1 text-[0.65rem] text-[#9ca3af]">
            별점은 필수, 후기는 선택이에요.
          </p>
          <div className="mt-3 flex gap-1.5">
            {STARS.map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`${star}점`}
                onClick={() => setRating(star)}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-[#e5e7eb] bg-white"
              >
                <img
                  src="/icons/star.svg"
                  alt=""
                  className={cn("h-4 w-4", star > rating && "opacity-40")}
                />
              </button>
            ))}
          </div>
          <textarea
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="mt-3 h-24 w-full resize-none rounded-md border border-[#e5e7eb] bg-white p-3 text-[0.75rem] outline-none placeholder:text-[#9ca3af]"
          />
          <button
            type="button"
            className="mt-2 w-full cursor-pointer rounded-md bg-[#111] py-2.5 text-[0.75rem] font-bold text-white"
          >
            평점 저장
          </button>
        </aside>
      </section>
    </main>
  );
}

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="mx-auto max-w-[1120px] px-6 py-8">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return <MovieDetail key={movie.id} movie={movie} />;
}