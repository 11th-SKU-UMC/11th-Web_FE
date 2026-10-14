import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies } from "../../data/movies";

export function MovieListPage() {
  const [cardSize, setCardSize] = useState<"small" | "large">(() => {
    const savedCardSize = localStorage.getItem("umcine-card-size");
    return savedCardSize === "large" ? "large" : "small";
  });

  const handleCardSize = (size: "small" | "large") => {
    setCardSize(size);
    localStorage.setItem("umcine-card-size", size);
  };

  return (
    <main className="mx-auto max-w-[1040px] px-10 pt-8 pb-[60px]">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[22px] font-bold">영화 목록</h1>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleCardSize("small")}
            className={`cursor-pointer rounded border px-3 py-1 text-sm ${
              cardSize === "small"
                ? "border-black bg-black text-white"
                : "border-black bg-white text-black"
            }`}
          >
            작게
          </button>

          <button
            type="button"
            onClick={() => handleCardSize("large")}
            className={`cursor-pointer rounded border px-3 py-1 text-sm ${
              cardSize === "large"
                ? "border-black bg-black text-white"
                : "border-black bg-white text-black"
            }`}
          >
            크게
          </button>
        </div>
      </div>

      <MovieGrid movies={movies} cardSize={cardSize} />

      <Pagination />
    </main>
  );
}