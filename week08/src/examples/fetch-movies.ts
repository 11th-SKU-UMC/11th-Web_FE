import { getMoviesWithFetch } from "../api/movies/get-movies-with-fetch";

getMoviesWithFetch(1)
  .then((response) => console.log("TMDB popular movies:", response.results))
  .catch((error) => console.error(error));