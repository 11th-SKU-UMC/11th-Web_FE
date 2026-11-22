"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchPage } from "../../src/views/movies/search-page";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  return <SearchPage query={query} />;
}

export default function SearchRoutePage() {
  return (
    <Suspense fallback={<div className="p-6 text-white text-center">검색 화면 준비 중...</div>}>
      <SearchContent />
    </Suspense>
  );
}

