import { Outlet } from "react-router-dom";
import { MovieProvider } from "../contexts/MovieContext";
import Header from "./Header";

export default function RootLayout() {
  return (
    <MovieProvider>
      <div className="flex min-h-screen flex-col bg-page">
        <Header />

        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </MovieProvider>
  );
}
