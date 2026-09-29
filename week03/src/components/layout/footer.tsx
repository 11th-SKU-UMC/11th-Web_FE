export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-center gap-2 px-4 text-center text-[10px] text-slate-500 sm:justify-end sm:px-6">
        <img className="w-12" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p>This product uses the TMDB API but is not endorsed or certified by <u>TMDB</u>.</p>
      </div>
    </footer>
  );
}
