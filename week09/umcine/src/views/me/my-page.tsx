"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { movieQueries } from "../../api/movies/movie-queries";
import { useMeQuery } from "../../hooks/use-me-query";
import { useMyFavoritesQuery } from "../../hooks/use-favorites";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

function FavoriteMovieCard({ movieId }: { movieId: number }) {
  const movieQuery = useQuery(movieQueries.detail(movieId));
  const movie = movieQuery.data;
  const posterUrl = movie ? getTmdbPosterUrl(movie.poster_path) : null;

  return (
    <li>
      <Link href={`/movies/${movieId}`}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie?.title} 포스터`}
            className="aspect-[2/3] w-full rounded-lg object-cover"
          />
        ) : (
          <div className="aspect-[2/3] rounded-lg bg-gray-200" />
        )}
        <p className="mt-2 truncate text-sm font-semibold">
          {movie?.title ?? "불러오는 중"}
        </p>
        <p className="text-xs text-gray-400">{movie?.release_date}</p>
      </Link>
    </li>
  );
}

export function MyPage() {
  const meQuery = useMeQuery();
  const favoritesQuery = useMyFavoritesQuery();
  const me = meQuery.data;
  const favorites = favoritesQuery.data ?? [];

  if (!me) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-sm text-gray-400">
        내 정보를 불러오는 중이에요.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 정보</h1>
        <Link
          href="/me/edit"
          className="rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
        >
          정보 수정
        </Link>
      </div>

      <section className="border-b border-gray-200 pb-8">
        <h2 className="mb-4 text-sm font-semibold">기본 정보</h2>
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-200">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8 text-gray-500">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0z" />
            </svg>
          </div>
          <dl className="grid flex-1 grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-gray-400">닉네임</dt>
              <dd className="mt-1 text-sm font-semibold">{me.nickname}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">이메일</dt>
              <dd className="mt-1 text-sm font-semibold">{me.email}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="pt-8">
        <h2 className="mb-4 text-sm font-semibold">내 즐겨찾기 영화</h2>
        {favoritesQuery.isLoading ? (
          <p className="text-sm text-gray-400">즐겨찾기를 불러오는 중이에요.</p>
        ) : favorites.length === 0 ? (
          <p className="text-sm text-gray-400">아직 즐겨찾기한 영화가 없어요.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {favorites.map((favorite) => (
              <FavoriteMovieCard key={favorite.favoriteId} movieId={favorite.movieId} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}