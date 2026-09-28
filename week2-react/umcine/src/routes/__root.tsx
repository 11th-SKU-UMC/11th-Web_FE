import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_-20%,rgba(37,99,235,0.18),transparent_36rem)] bg-black text-[#f7f8fa] antialiased">
      <Header />
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <main className="grid min-h-[calc(100vh-72px)] place-content-center px-5 text-center text-[#969da8]">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
