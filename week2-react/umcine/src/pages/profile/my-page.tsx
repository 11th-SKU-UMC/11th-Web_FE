import { Link } from "@tanstack/react-router";
import { useQueries, useQuery } from "@tanstack/react-query";
import { movieDetailQueryOptions } from "../../api/movies/movie-query-options";
import { favoritesQueryOptions } from "../../api/favorites/favorite-query-options";
import { getMe } from "../../api/members/me";
import { BookmarkButton } from "../../components/bookmark-button";
import { useAuthStore } from "../../stores/auth-store";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function MyPage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const favoritesQuery = useQuery(favoritesQueryOptions(accessToken ? meQuery.data?.memberId : undefined));
  const bookmarkedMovieIds = favoritesQuery.data?.map((favorite) => favorite.movieId) ?? [];
  const bookmarkedMovies = useQueries({
    queries: bookmarkedMovieIds.map(movieDetailQueryOptions),
  });

  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1200px] px-5 py-8 sm:px-8">
      {accessToken && meQuery.data && (
        <div className="flex justify-end">
          <Link className="rounded-md bg-[#4169e1] px-4 py-2 text-sm font-bold text-white no-underline hover:bg-[#3159d4]" to="/mypage/edit">정보 수정</Link>
        </div>
      )}
      <section className="mt-12 border-b border-[#e1e4e8] pb-7">
        {!accessToken ? (
          <Link className="text-sm font-bold text-[#4169e1]" to="/login">로그인 후 내 정보를 확인해 주세요.</Link>
        ) : meQuery.isLoading ? (
          <p className="text-sm text-[#969da8]" role="status">내 정보를 불러오는 중이에요.</p>
        ) : meQuery.isError ? (
          <p className="text-sm text-red-600" role="alert">내 정보를 불러오지 못했어요. 다시 시도해 주세요.</p>
        ) : (
          <>
            <p className="text-sm text-[#969da8]">{meQuery.data?.nickname}</p>
            <h1 className="mt-1 text-xl font-bold">{meQuery.data?.email}</h1>
          </>
        )}
      </section>
      <section className="py-8" aria-label="관심 영화">
        <h2 className="mb-5 text-lg font-bold">관심 영화</h2>
        {meQuery.isLoading || favoritesQuery.isLoading ? (
          <p className="py-10 text-center text-sm text-[#777f8c]" role="status">관심 영화를 불러오는 중이에요.</p>
        ) : favoritesQuery.isError ? (
          <div className="py-10 text-center text-sm text-[#777f8c]">
            <p role="alert">관심 영화를 불러오지 못했어요.</p>
            <button className="mt-2 cursor-pointer text-[#4169e1] underline" type="button" onClick={() => favoritesQuery.refetch()}>다시 시도</button>
          </div>
        ) : bookmarkedMovieIds.length === 0 ? (
          <p className="rounded-lg border border-[#e1e4e8] bg-white px-5 py-10 text-center text-sm text-[#777f8c]">저장한 영화가 없어요.</p>
        ) : (
          <ul className="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 lg:grid-cols-5">
            {bookmarkedMovieIds.map((movieId, index) => {
              const movie = bookmarkedMovies[index]?.data;
              const posterUrl = getTmdbPosterUrl(movie?.poster_path ?? null);
              return <li key={movieId}>
                <Link className="block text-sm font-semibold text-[#17191d] no-underline hover:text-[#4169e1]" to="/movies/$movieId" params={{ movieId: String(movieId) }}>
                  <div className="mb-2 aspect-[2/3] overflow-hidden rounded-lg bg-[#e1e4e8]">
                    {posterUrl ? (
                      <img className="h-full w-full object-cover" src={posterUrl} alt={`${movie?.title ?? "영화"} 포스터`} />
                    ) : (
                      <span className="grid h-full place-items-center text-[#777f8c]">이미지 없음</span>
                    )}
                  </div>
                  {movie?.title ?? `영화 #${movieId}`}
                </Link>
                <div className="mt-2"><BookmarkButton movieId={movieId} movieTitle={movie?.title} /></div>
              </li>;
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
