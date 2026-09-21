import { useState } from "react";
import { Icon } from "../components/Icon";
import { SearchResultCard } from "../components/SearchResultCard";
import { movies } from "../data/movies";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // 검색어가 없으면 결과 X
  const results =
    searchedQuery === ""
      ? []
      : movies.filter((movie) => movie.title.includes(searchedQuery));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 검색 전 화면에서 검색어가 있어야 결과 화면으로 넘어감
    if (!hasSearched && query.trim() === "") return;

    setSearchedQuery(query.trim());
    setHasSearched(true);
  }

  // 검색 전
  if (!hasSearched) {
    return (
      <main className="flex flex-col items-center px-[72px] pt-[209px] pb-[210px]">
        <div className="flex w-[790px] max-w-full flex-col items-center gap-9">
          <h1 className="text-[46px] leading-[52.44px] font-bold tracking-[-2.3px] text-primary">
            어떤 영화를 찾고 있나요?
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex h-[74px] w-full items-center gap-[14px] rounded-xl border-2 border-primary bg-surface pr-[17px] pl-[21px] shadow-[0_12px_17px_rgba(17,19,24,0.08)]"
          >
            <Icon name="search" className="size-6 text-secondary" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="예: 스파이더맨"
              aria-label="영화 제목"
              className="min-w-0 flex-1 px-0.5 py-px text-[17px] text-primary outline-none placeholder:text-tertiary"
            />

            <button
              type="submit"
              className="flex h-[42px] items-center justify-center rounded-lg border border-primary bg-primary px-4 text-center text-sm font-bold text-surface"
            >
              검색
            </button>
          </form>
        </div>
      </main>
    );
  }

  // 검색 후
  return (
    <main className="flex flex-col px-20 py-6">
      <div className="flex flex-col gap-[17px]">
        <h1 className="text-[38px] leading-11 font-bold tracking-[-1.71px] text-primary">
          영화 검색
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex h-[54px] items-center gap-[18px] rounded-[9px] border border-border bg-surface pr-2.5 pl-[15px]"
        >
          <Icon name="search" className="size-6 text-secondary" />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="검색어"
            className="min-w-0 flex-1 px-0.5 py-px text-sm font-bold text-primary outline-none [&::-webkit-search-cancel-button]:hidden"
          />

          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => setQuery("")}
          >
            <Icon name="close" className="size-6 text-secondary" />
          </button>

          <button
            type="submit"
            className="flex h-[42px] items-center justify-center rounded-lg border border-surface bg-primary px-4 text-center text-sm font-bold text-surface"
          >
            다시 검색
          </button>
        </form>
      </div>

      <div className="flex h-[54px] items-center justify-between border-y border-border">
        <h2 className="text-lg font-bold text-primary">
          {searchedQuery === "" ? "검색 결과" : `‘${searchedQuery}’ 검색 결과`}
        </h2>

        <span className="text-xs text-tertiary">
          영화 {results.length}편 · 1페이지
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-10">
        {results.map((movie) => (
          <SearchResultCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
