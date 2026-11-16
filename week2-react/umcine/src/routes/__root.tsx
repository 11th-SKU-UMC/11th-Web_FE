import { createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "../components/layout/root-layout";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <main className="grid min-h-[calc(100vh-72px)] place-content-center px-5 text-center text-[#969da8]">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
