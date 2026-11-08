import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Header } from "../components/layout/header";
import { cn } from "../utils/cn";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <main className="grid min-h-[calc(100vh-72px)] place-content-center px-5 text-center text-[#969da8]">
      페이지를 찾을 수 없어요.
    </main>
  ),
});

function RootLayout() {
  const isLightPage = useRouterState({
    select: (state) => ["/signup", "/login", "/mypage", "/mypage/edit"].includes(state.location.pathname),
  });

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col antialiased",
        isLightPage
          ? "bg-[#f7f8fa] text-[#17191d]"
          : "bg-[radial-gradient(circle_at_50%_-20%,rgba(37,99,235,0.18),transparent_36rem)] bg-black text-[#f7f8fa]",
      )}
    >
      <Header light={isLightPage} />
      <div className="flex-1"><Outlet /></div>
      {!isLightPage && (
        <footer className="border-t border-white/10 px-5 py-6 text-xs text-[#969da8] sm:px-7 lg:px-12">
          <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center gap-x-5 gap-y-3">
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" aria-label="TMDB 웹사이트">
              <img className="w-36" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
            </a>
            <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
