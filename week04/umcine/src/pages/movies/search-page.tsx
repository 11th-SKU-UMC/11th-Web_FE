import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  large?: boolean;
}

function SearchForm({ value, onChange, onSubmit, large = false }: SearchFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full items-center gap-3 bg-white py-2 pl-4 pr-2",
        large
          ? "max-w-[560px] rounded-xl border-2 border-[#111] shadow-lg"
          : "rounded-lg border border-[#e5e7eb]",
      )}
    >
      <img src="/icons/search.svg" alt="" className="h-4 w-4 shrink-0" />
      <input
        aria-label="검색어"
        placeholder={large ? "예: 스파이더맨" : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-[0.85rem] outline-none placeholder:text-[#9ca3af]"
      />
      {!large && value && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={() => onChange("")}
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
        >
          <img src="/icons/close.svg" alt="" className="h-3.5 w-3.5" />
        </button>
      )}
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-[#111] px-4 py-2 text-[0.75rem] font-bold text-white"
      >
        {large ? "검색" : "다시 검색"}
      </button>
    </form>
  );
}

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  if (!normalizedQuery) {
    return (
      <main className="mx-auto flex max-w-[1120px] flex-col items-center px-6 pt-32">
        <h1 className="mb-8 text-center text-[2rem] font-extrabold">
          어떤 영화를 찾고 있나요?
        </h1>
        <p className="sr-only">검색어를 입력해 주세요.</p>
        <SearchForm
          large
          value={searchText}
          onChange={setSearchText}
          onSubmit={handleSubmit}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1120px] px-6 py-8">
      <h1 className="mb-4 text-[1.8rem] font-extrabold">영화 검색</h1>
      <SearchForm
        value={searchText}
        onChange={setSearchText}
        onSubmit={handleSubmit}
      />

      <div className="mb-4 mt-5 flex items-baseline justify-between">
        <h2 className="text-[0.85rem] font-bold">‘{query}’ 검색 결과</h2>
        <p className="text-[0.7rem] text-[#9ca3af]">
          영화 {searchResults.length}편
        </p>
      </div>

      {searchResults.length === 0 ? (
        <p className="border-t border-[#e5e7eb] py-16 text-center text-[0.85rem] text-[#9ca3af]">
          검색 결과가 없어요.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {searchResults.map((movie) => (
            <li
              key={movie.id}
              className="flex gap-4 border-t border-[#e5e7eb] py-5"
            >
              <img
                src={movie.posterPath}
                alt={`${movie.title} 포스터`}
                className="aspect-[2/3] w-24 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0">
                <h3 className="text-[0.95rem] font-bold">{movie.title}</h3>
                <p className="mt-1 text-[0.7rem] text-[#9ca3af]">
                  {movie.originalTitle} · {movie.releaseDate}
                </p>
                <p className="mt-2 line-clamp-2 text-[0.75rem] leading-5 text-[#6b7280]">
                  {movie.overview}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="inline-block text-[0.7rem] font-bold text-[#3461ff]"
                  >
                    상세 보기 →
                  </Link>
                  <BookmarkButton movieId={movie.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}