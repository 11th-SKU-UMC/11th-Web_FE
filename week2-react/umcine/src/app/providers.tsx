"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "../stores/auth-store";
import { useBookmarkStore } from "../stores/bookmark-store";
import { useMoviePreferenceStore } from "../stores/movie-preference-store";
import { useProfileStore } from "../stores/profile-store";

const StorageHydrationContext = createContext(false);

export function useStorageHydration() {
  return useContext(StorageHydrationContext);
}

export function Providers({ children }: { children: ReactNode }) {
  // 서버 요청 사이에 인증 정보와 쿼리 캐시를 공유하지 않아요.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  }));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      useAuthStore.persist.rehydrate(),
      useBookmarkStore.persist.rehydrate(),
      useMoviePreferenceStore.persist.rehydrate(),
      useProfileStore.persist.rehydrate(),
    ]).then(() => {
      if (active) setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StorageHydrationContext.Provider value={hydrated}>
        {children}
      </StorageHydrationContext.Provider>
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
