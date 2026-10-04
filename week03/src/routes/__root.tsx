import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
  notFoundComponent: () => (
    <main className="mx-auto min-h-screen max-w-[1126px] px-5 py-16">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
