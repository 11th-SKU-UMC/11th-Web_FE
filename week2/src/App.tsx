import { createContext, useContext, useState } from "react";
import { initialMovies } from "./data/movies";
import { MovieCard } from "./components/MovieCard";

type StudyMode = "focus" | "break";

const StudyModeContext = createContext<StudyMode>("focus");

function StudyModeStatus() {
  const studyMode = useContext(StudyModeContext);
  return <p>현재 모드: {studyMode}</p>;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState(initialMovies);
  const [studyMode, setStudyMode] = useState<StudyMode>("focus");

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  function handleToggleStudyMode() {
    setStudyMode((currentStudyMode) =>
      currentStudyMode === "focus" ? "break" : "focus",
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-xl">
        <StudyModeContext.Provider value={studyMode}>
          <div className="mb-6 flex items-center justify-between">
            <StudyModeStatus />

            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium"
              onClick={handleToggleStudyMode}
            >
              모드 변경
            </button>
          </div>
        </StudyModeContext.Provider>

        <div className="mb-6 text-2xl font-bold">영화 목록</div>

        <div className="flex gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleBookmark={() => handleToggleBookmark(movie.id)}
            />
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-gray-100 p-6 text-center">
          <div className="text-2xl font-bold">카운터</div>
          <div className="pb-4 text-4xl font-bold">{count}</div>

          <div className="flex justify-center gap-2">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium disabled:opacity-40"
              onClick={() => setCount((current) => current + 1)}
              disabled={count === 5}
            >
              +1
            </button>

            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium disabled:opacity-40"
              onClick={() => setCount((current) => current - 1)}
              disabled={count === 0}
            >
              -1
            </button>

            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium"
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
