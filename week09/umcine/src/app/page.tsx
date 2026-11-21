import { Suspense } from "react";
import { MovieListPage } from "../features/movies/movie-list-page";

export default function HomePage() {
  return (
    <Suspense fallback={<p>영화 목록을 불러오는 중...</p>}>
      <MovieListPage />
    </Suspense>
  );
}