import { Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { useProfileStore } from "../../stores/profile-store";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function MyPage() {
  const email = useProfileStore((state) => state.email);
  const nickname = useProfileStore((state) => state.nickname);
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const bookmarkedMovies = useQueries({
    queries: bookmarkedMovieIds.map((movieId) => ({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
    })),
  });

  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1200px] px-5 py-8 sm:px-8">
      <div className="flex justify-end">
        <Link className="rounded-md bg-[#4169e1] px-4 py-2 text-sm font-bold text-white no-underline hover:bg-[#3159d4]" to="/mypage/edit">정보 수정</Link>
      </div>
      <section className="mt-12 border-b border-[#e1e4e8] pb-7">
        <p className="text-sm text-[#969da8]">{nickname || "닉네임을 설정해 주세요"}</p>
        <h1 className="mt-1 text-xl font-bold">{email || "이메일을 입력해 주세요"}</h1>
      </section>
      <section className="py-8" aria-label="관심 영화">
        <h2 className="mb-5 text-lg font-bold">관심 영화</h2>
        {bookmarkedMovieIds.length === 0 ? (
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
              </li>;
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
