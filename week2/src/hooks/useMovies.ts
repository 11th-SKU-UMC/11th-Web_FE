import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export function useMovies() {
  const value = useContext(MovieContext);

  if (!value) {
    throw new Error("useMovies는 MovieProvider 안에서만 쓸 수 있어요.");
  }

  return value;
}
