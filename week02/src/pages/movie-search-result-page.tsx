import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchResults } from "../data/search-results";
import Footer from "../components/footer";
import Icon from "../components/icon";

function MovieSearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(keyword);

  const results = searchResults.filter(
    ({ title, originalTitle }) =>
      title.includes(keyword) ||
      originalTitle.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = query.trim();
    if (!next) return;
    setSearchParams({ q: next });
  };

  return (
    <>
      <main className="flex w-full flex-col items-start px-20 py-6">
        <div className="flex w-full flex-col gap-[17px]">
          <h1 className="text-[38px] leading-11 font-bold tracking-[-1.71px]">
            영화 검색
          </h1>

          <form
            id="results-search-form"
            onSubmit={handleSubmit}
            className="flex h-[54px] w-full items-center gap-[18px] rounded-[9px] border border-gray-200 bg-white pr-2.5 pl-[15px]"
          >
            <span className="text-gray-600">
              <Icon name="search" />
            </span>
            <input
              type="search"
              aria-label="검색어"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent px-0.5 py-px text-sm font-bold outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              type="button"
              aria-label="검색어 지우기"
              onClick={() => setQuery("")}
              className="text-gray-600"
            >
              <Icon name="close" />
            </button>
            <button
              type="submit"
              className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-ink px-4 text-sm font-extrabold text-white"
            >
              다시 검색
            </button>
          </form>
        </div>

        <div className="flex h-[54px] w-full items-center justify-between border-y border-gray-200">
          <h2 id="results-title" className="text-lg font-bold">
            ‘{keyword}’ 검색 결과
          </h2>
          <span className="text-xs text-gray-400">
            영화 {results.length}편 · 1페이지
          </span>
        </div>

        {results.length === 0 ? (
          <p className="w-full py-20 text-center text-sm text-gray-600">
            검색 결과가 없어요.
          </p>
        ) : (
          <div className="grid w-full grid-cols-2 gap-x-10">
            {results.map((movie) => (
              <article key={movie.id} className="flex items-start gap-[18px] py-5">
                <div className="h-[190px] w-[126px] shrink-0 overflow-hidden rounded-[10px] bg-gray-200">
                  {movie.posterPath && (
                    <img
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                      className="size-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col items-start gap-2 pt-1">
                  <h3 className="text-lg leading-6 font-bold">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{movie.originalTitle}</span>
                    <span>{movie.releaseDate}</span>
                  </div>
                  <p className="text-[12.5px] leading-5 text-gray-600">
                    {movie.overview}
                  </p>
                  <Link
                    to={`/movies/${movie.id}`}
                    className="flex items-center gap-1 text-xs font-extrabold text-primary"
                  >
                    상세 보기
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default MovieSearchResultPage;
