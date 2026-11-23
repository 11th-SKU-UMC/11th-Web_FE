import { Suspense } from "react";
import { MovieListPage } from "../../screens/movies/movie-list-page";

export default function HomePage() {
  return <Suspense fallback={<p role="status">영화 목록을 불러오는 중이에요.</p>}><MovieListPage /></Suspense>;
}
