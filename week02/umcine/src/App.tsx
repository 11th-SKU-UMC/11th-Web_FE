import { useState } from "react";
import { MovieGrid } from "./components/movie-grid";
import { movies } from "./data/movies";

function App() {
  const [bookmarkedMovieIds, setBookmarkedMovieIds] = useState<number[]>([]);

  const toggleBookmark = (movieId: number) => {
    setBookmarkedMovieIds((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <main>
      <MovieGrid
        movies={movies}
        bookmarkedMovieIds={bookmarkedMovieIds}
        onToggleBookmark={toggleBookmark}
      />
    </main>
  );
}

export default App;