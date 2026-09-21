import { createBrowserRouter } from "react-router-dom";
import MoviePage from "../pages/MoviePage";
import MyPage from "../pages/MyPage";
import SearchPage from "../pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MoviePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
]);
