"use client";

import { useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movieQueries } from "../../api/movies/movie-queries";

type CardSize = "small" | "large";

const STORAGE_KEY = "umcine-card-size";
const CARD_SIZE_EVENT = "card-size-change";

// 현재 저장된 카드 크기 조회
function getCardSizeSnapshot(): CardSize {
  const savedCardSize = localStorage.getItem(STORAGE_KEY);

  return savedCardSize === "large" ? "large" : "small";
}

// 서버 렌더링 시 기본 카드 크기
function getServerCardSize(): CardSize {
  return "small";
}

// 카드 크기 변경 구독
function subscribeToCardSize(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CARD_SIZE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CARD_SIZE_EVENT, callback);
  };
}

export function MovieListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams?.get("page") ?? 1);

  const currentPage =
    Number.isInteger(rawPage) && rawPage >= 1 && rawPage <= 5
      ? rawPage
      : 1;

  const moviesQuery = useQuery(movieQueries.list(currentPage));

  const movies = moviesQuery.data?.results ?? [];

  // localStorage의 카드 크기 구독
  const cardSize = useSyncExternalStore(
    subscribeToCardSize,
    getCardSizeSnapshot,
    getServerCardSize
  );

  // 카드 크기 변경 및 저장
  const handleCardSize = (size: CardSize) => {
    localStorage.setItem(STORAGE_KEY, size);
    window.dispatchEvent(new Event(CARD_SIZE_EVENT));
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="mx-auto max-w-[1040px] px-10 pt-8 pb-[60px]">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[22px] font-bold">영화 목록</h1>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleCardSize("small")}
            className={`cursor-pointer rounded border px-3 py-1 text-sm ${
              cardSize === "small"
                ? "border-black bg-black text-white"
                : "border-black bg-white text-black"
            }`}
          >
            작게
          </button>

          <button
            type="button"
            onClick={() => handleCardSize("large")}
            className={`cursor-pointer rounded border px-3 py-1 text-sm ${
              cardSize === "large"
                ? "border-black bg-black text-white"
                : "border-black bg-white text-black"
            }`}
          >
            크게
          </button>
        </div>
      </div>

      {moviesQuery.isPending ? (
        <p>영화 목록을 불러오는 중...</p>
      ) : moviesQuery.isError ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <p className="text-sm text-red-600">
            영화 목록을 불러오지 못했어요.
          </p>

          <button
            type="button"
            onClick={() => moviesQuery.refetch()}
            className="cursor-pointer rounded-[6px] bg-black px-5 py-2 text-sm font-semibold text-white"
          >
            다시 시도
          </button>
        </div>
      ) : movies.length === 0 ? (
        <p>표시할 영화가 없어요.</p>
      ) : (
        <MovieGrid movies={movies} cardSize={cardSize} />
      )}

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
