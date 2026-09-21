import { useState } from "react";
import { MovieCard } from "./components/MovieCard";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-2xl font-bold">영화 목록</div>

        <div className="flex gap-4">
          <MovieCard
            title="토이 스토리 5"
            releaseDate="2026.06.17"
            isBookmarked={false}
          />
          <MovieCard
            title="오디세이"
            releaseDate="2026.08.05"
            isBookmarked={false}
          />
          <MovieCard
            title="어벤져스: 엔드게임"
            releaseDate="2026.09.23"
            isBookmarked={false}
          />
        </div>

        <div className="mt-8 rounded-xl bg-gray-100 p-6 text-center">
          <div className="text-2xl font-bold">카운터</div>
          <div className="text-4xl font-bold pb-4">{count}</div>
          <div className="flex justify-center gap-2">
            <button
              className="rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium"
              onClick={() => setCount((current) => current + 1)}
              disabled={count === 5}
            >
              +1
            </button>
            <button
              className="rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium"
              onClick={() => setCount((current) => current - 1)}
              disabled={count === 0}
            >
              -1
            </button>
            <button
              className="rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium"
              onClick={() => setCount(0)}
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
