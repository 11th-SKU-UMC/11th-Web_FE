import { useState, type FormEvent } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  if (!movie) {
    return <main className="mx-auto flex w-full flex-1 items-center justify-center px-6 py-24 text-center text-lg font-semibold text-[#454c56]">영화를 찾을 수 없어요.</main>;
  }

  function handleRatingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <>
      <section className="relative isolate min-h-[260px] overflow-hidden bg-[#171b22] text-white sm:min-h-[300px]">
        <img className="absolute inset-0 -z-20 size-full object-cover object-center" src={movie.backdropPath} alt="" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
        <div className="mx-auto flex min-h-[260px] w-[calc(100%-48px)] max-w-[1280px] flex-col justify-end py-8 sm:min-h-[300px] sm:py-10 max-sm:w-[calc(100%-36px)]">
          <Link className="mb-5 inline-flex w-fit items-center gap-2 text-sm text-white/80 transition hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-white" to="/">
            <span aria-hidden="true">←</span> 영화 목록
          </Link>
          <h1 className="text-3xl leading-tight font-bold tracking-[-0.8px] sm:text-[40px]">{movie.title}</h1>
          <p className="mt-1 text-base text-white/75 sm:text-lg">{movie.originalTitle}</p>
          <p className="mt-4 text-sm text-white/80">{movie.releaseDate}<span className="mx-2 text-white/50">·</span>{movie.genres.join(" · ")}<span className="mx-2 text-white/50">·</span>{movie.runtime}</p>
        </div>
      </section>

      <main className="mx-auto grid w-[calc(100%-48px)] max-w-[1280px] flex-1 grid-cols-1 gap-8 py-8 md:grid-cols-[200px_minmax(0,1fr)_300px] md:gap-8 lg:gap-12 max-sm:w-[calc(100%-36px)]">
        <img className="mx-auto aspect-[5/7] w-[200px] rounded-lg bg-[#e6e8ec] object-cover shadow-sm md:mx-0" src={movie.posterPath} alt={movie.title + " 포스터"} />
        <section className="min-w-0">
          <h2 className="text-xl leading-snug font-bold tracking-[-0.35px] text-[#20242a]">{movie.tagline}</h2>
          <p className="mt-4 text-[15px] leading-7 text-[#59616c]">{movie.overview}</p>
          <button className={cn(
            "mt-6 inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
            movie.isBookmarked ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700" : "border-[#d8dde5] bg-white text-[#343b45] hover:bg-[#f1f4f8]",
          )} type="button" aria-pressed={movie.isBookmarked}>
            <img className="size-4" src={"/icons/movie-icons/bookmark" + (movie.isBookmarked ? "" : "-outline") + ".svg"} alt="" />
            {movie.isBookmarked ? "북마크됨" : "북마크"}
          </button>
        </section>

        <form className="rounded-xl border border-[#e6e8ec] bg-white p-5 shadow-sm" onSubmit={handleRatingSubmit}>
          <h2 className="text-base font-bold text-[#20242a]">내 평점</h2>
          <div className="mt-4 flex items-center gap-1" role="group" aria-label="평점 선택">
            {[1, 2, 3, 4, 5].map((value) => (
              <button className="rounded-sm p-0.5 focus-visible:outline-2 focus-visible:outline-blue-600" key={value} type="button" aria-label={value + "점"} aria-pressed={rating === value} onClick={() => { setRating(value); setSaved(false); }}>
                <img className="size-7" src={value <= rating ? "/icons/movie-icons/star.svg" : "/icons/movie-icons/star-outline.svg"} alt="" />
              </button>
            ))}
          </div>
          <label className="mt-5 block text-sm font-semibold text-[#404751]" htmlFor="movie-comment">한줄평</label>
          <textarea className="mt-2 min-h-[112px] w-full resize-y rounded-md border border-[#dfe3e9] bg-white p-3 text-sm leading-6 text-[#303640] outline-none placeholder:text-[#a0a6af] focus:border-blue-500 focus:ring-2 focus:ring-blue-100" id="movie-comment" placeholder="이 영화에 대한 감상을 남겨 주세요." value={comment} onChange={(event) => { setComment(event.target.value); setSaved(false); }} />
          <button className="mt-3 w-full rounded-md bg-[#20242a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3c434d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#20242a]" type="submit">평점 저장</button>
          {saved && <p className="mt-3 text-center text-xs text-[#23734d]" role="status">평점을 저장했어요.</p>}
        </form>
      </main>
      <footer className="mx-auto flex min-h-[34px] w-[calc(100%-48px)] max-w-[1280px] items-center justify-end gap-1.5 border-t border-[#e8eaee] text-[9px] text-[#9299a2] max-sm:w-[calc(100%-36px)] max-sm:justify-center">
        <img className="h-auto w-[42px]" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
      </footer>
    </>
  );
}
