import { getMoviesWithFetch } from "../api/movies/get-movies-with-fetch";
// [필수] src/main.tsx에서 import를 임시로 켜고 Network 탭 확인 후 다시 주석 처리 가능.
getMoviesWithFetch(1)
  .then((data) => console.log("[fetch] 인기 영화:", data.results))
  .catch((error) => console.error("[fetch] 오류:", error));
