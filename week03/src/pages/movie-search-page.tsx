import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/icon";

function MovieSearchPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = query.trim();
    if (!keyword) return;
    navigate(`/search/results?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <main className="flex w-full flex-col items-center px-[72px] pt-[209px] pb-[210px]">
      <div className="flex w-[790px] flex-col items-center gap-9">
        <h1 className="text-[46px] leading-[52px] font-bold tracking-[-2.3px]">
          어떤 영화를 찾고 있나요?
        </h1>

        <form
          id="movie-search-form"
          onSubmit={handleSubmit}
          className="flex h-[74px] w-full items-center gap-3.5 rounded-xl border-2 border-ink bg-white pr-[17px] pl-[21px] shadow-[0_12px_34px_rgba(17,19,24,0.08)]"
        >
          <span className="text-gray-600">
            <Icon name="search" />
          </span>
          <input
            type="search"
            aria-label="영화 제목"
            placeholder="예: 스파이더맨"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent px-0.5 py-px text-[17px] outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="flex h-[42px] items-center justify-center rounded-lg border border-ink bg-ink px-4 text-sm font-extrabold text-white"
          >
            검색
          </button>
        </form>
      </div>
    </main>
  );
}

export default MovieSearchPage;
