"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/auth-store";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreAuth = async () => {
      await useAuthStore.persist?.rehydrate();
      setIsReady(true);
    };

    void restoreAuth();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (requireAuth && !accessToken) {
      router.replace("/login");
    } else if (!requireAuth && accessToken) {
      router.replace("/");
    }
  }, [isReady, accessToken, requireAuth, router]);

  if (!isReady) return null;

  if (requireAuth && !accessToken) return null;

  if (!requireAuth && accessToken) return null;

  return <>{children}</>;
}
