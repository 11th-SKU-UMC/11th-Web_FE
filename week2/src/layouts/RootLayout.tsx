import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <Outlet />
    </div>
  );
}
