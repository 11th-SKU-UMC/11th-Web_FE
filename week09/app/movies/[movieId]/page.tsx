import { Suspense } from "react";
import { MovieDetailPage } from "../../../src/views/movies/movie-detail-page";

export default function MovieDetailRoutePage() {
  return (
    <Suspense fallback={<div className="p-6 text-white text-center">상세 정보를 불러오는 중...</div>}>
      <MovieDetailPage />
    </Suspense>
  );
}

