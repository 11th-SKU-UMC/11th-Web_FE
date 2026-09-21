import { useState } from "react";
import { Icon } from "../components/Icon";
import { MovieGrid } from "../components/MovieGrid";
import { Pagination } from "../components/Pagination";
import { useMovies } from "../hooks/useMovies";

const PROFILE = {
  nickname: "나룬",
  email: "test@test.com",
};

export default function MyPage() {
  const { movies } = useMovies();
  const [page, setPage] = useState(1);

  const bookmarkedMovies = movies.filter((movie) => movie.isBookmarked);

  return (
    <main className="flex flex-1 flex-col gap-7 px-20 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[31px] font-bold tracking-[-1.24px] text-primary">
          내 정보
        </h1>

        <button
          type="button"
          className="flex h-[42px] items-center justify-center rounded-lg border border-surface bg-action px-4 text-center text-sm font-bold text-surface"
        >
          정보 수정
        </button>
      </div>

      <section className="flex flex-col gap-4 border-y border-border py-3">
        <h2 className="text-[17px] font-bold text-primary">기본 정보</h2>

        <div className="flex items-center gap-7">
          <span className="flex size-[82px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-border">
            <Icon name="person" className="size-12 text-primary" />
          </span>

          <div className="flex w-[760px] max-w-full items-start justify-center gap-7">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <p className="text-[11px] text-tertiary">닉네임</p>
              <strong className="text-sm font-bold text-primary">
                {PROFILE.nickname}
              </strong>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <p className="text-[11px] text-tertiary">이메일</p>
              <strong className="text-sm font-bold text-primary">
                {PROFILE.email}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[17px] font-bold text-primary">내 즐겨찾기</h2>

        <MovieGrid movies={bookmarkedMovies} />

        <Pagination page={page} totalPages={1} onChange={setPage} />
      </section>
    </main>
  );
}
