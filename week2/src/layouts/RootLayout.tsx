import { Outlet } from "react-router-dom";
import { MovieProvider } from "../contexts/MovieContext";
import Header from "./Header";

export default function RootLayout() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-page">
        <Header />
        <Outlet />
      </div>
    </MovieProvider>
  );
}
