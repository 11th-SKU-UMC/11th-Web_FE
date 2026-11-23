import { Suspense, type ReactNode } from "react";
import { Header } from "./header";
import { cn } from "../../utils/cn";

export function RootLayout({ children, light = false }: { children: ReactNode; light?: boolean }) {

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col antialiased",
        light
          ? "bg-[#f7f8fa] text-[#17191d]"
          : "bg-[radial-gradient(circle_at_50%_-20%,rgba(37,99,235,0.18),transparent_36rem)] bg-black text-[#f7f8fa]",
      )}
    >
      <Suspense fallback={<header className="min-h-16 border-b border-current/10" />}>
        <Header light={light} />
      </Suspense>
      <div className="flex-1">{children}</div>
      {!light && (
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
