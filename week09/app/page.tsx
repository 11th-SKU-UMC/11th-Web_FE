import type { Metadata } from "next";
import { MovieListPage } from "../src/views/movies/movie-list-page";

export const metadata: Metadata = {
  title: "인기 영화 목록 | UMCine",
  description: "지금 인기 있는 영화를 확인해 보세요.",
};

export default function HomePage() {
  return <MovieListPage />;
}

