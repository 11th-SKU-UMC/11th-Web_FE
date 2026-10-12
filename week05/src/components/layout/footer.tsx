export function Footer() {
  return (
    <footer
      className="border-t border-[#e3e6eb] bg-white px-5 py-6 sm:px-8 min-[1101px]:px-20"
      aria-labelledby="credits-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="credits-heading"
            className="mb-1 text-sm font-bold text-[#17191e]"
          >
            출처 및 크레딧
          </h2>
          <p className="m-0 text-xs leading-5 text-[#606774]">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
        <a
          className="inline-flex w-fit items-center"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          aria-label="The Movie Database (TMDB) 사이트 열기"
        >
          <img
            className="w-28"
            src="/images/logos/tmdb-logo.svg"
            alt="TMDB"
          />
        </a>
      </div>
    </footer>
  );
}
