import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => <><Header /><Outlet /><Footer /></>,
  notFoundComponent: () => <main className="grid min-h-[calc(100vh-137px)] place-items-center bg-[#f5f6f8] text-lg font-bold">페이지를 찾을 수 없어요.</main>,
});
