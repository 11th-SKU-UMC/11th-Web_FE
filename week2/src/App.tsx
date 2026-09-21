import { MovieCard } from "./components/MovieCard";

export default function App() {
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
            isBookmarked={true}
          />
          <MovieCard
            title="어벤져스: 엔드게임"
            releaseDate="2026.09.23"
            isBookmarked={true}
          />
        </div>
      </div>
    </div>
  );
}
