"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useStorageHydration } from "../../app/providers";
import { useAuthStore } from "../../stores/auth-store";

export function AuthBoundary({ children, authenticated }: {
  children: ReactNode;
  authenticated: boolean;
}) {
  const router = useRouter();
  const hydrated = useStorageHydration();
  const accessToken = useAuthStore((state) => state.accessToken);
  const shouldRedirect = hydrated && Boolean(accessToken) !== authenticated;

  useEffect(() => {
    if (shouldRedirect) router.replace(authenticated ? "/login" : "/");
  }, [authenticated, router, shouldRedirect]);

  if (!hydrated || shouldRedirect) {
    return <main className="grid min-h-[calc(100vh-72px)] place-content-center" role="status">로그인 상태를 확인하는 중이에요.</main>;
  }

  return children;
}
