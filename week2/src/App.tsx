interface MovieCardProps {
  title: string;
  releaseDate: string;
  isBookmarked: boolean;
}

function MovieCard({ title, releaseDate, isBookmarked }: MovieCardProps) {
  return (
    <div className="flex-1 rounded-lg bg-gray-100 p-5">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-gray-500">{releaseDate}</div>
      <div className="mt-4 text-sm font-medium">
        {isBookmarked ? "★ 북마크 됨" : "☆ 북마크 안 됨"}
      </div>
    </div>
  );
}

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
