import { movies } from "../../data/movies";
import MovieGrid from "../../components/movies/movie-grid";

export function MovieListPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">영화 목록</h1>
      
      {/* 영화 카드 그리드 */}
      <MovieGrid movies={movies} />

      {/* 피그마 하단 페이지네이션 UI */}
      <div className="flex justify-center items-center gap-2 mt-8 text-sm">
        <button type="button" className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">&lt;</button>
        <button type="button" className="px-3 py-1 rounded bg-black text-white font-medium">1</button>
        <button type="button" className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
        <button type="button" className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
        <button type="button" className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">4</button>
        <button type="button" className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">5</button>
        <button type="button" className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">&gt;</button>
      </div>
    </main>
  );
}