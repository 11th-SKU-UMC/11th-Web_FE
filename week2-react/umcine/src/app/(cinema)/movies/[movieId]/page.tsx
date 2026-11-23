import { Suspense } from "react";
import { MovieDetailPage } from "../../../../screens/movies/movie-detail-page";

export default function MoviePage() {
  return <Suspense fallback={<p role="status">영화 정보를 불러오는 중이에요.</p>}><MovieDetailPage /></Suspense>;
}
