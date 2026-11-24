"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/auth-store";
import { useIsClient } from "../../hooks/use-is-client";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isClient = useIsClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (isClient && !accessToken) {
      router.replace("/login");
    }
  }, [isClient, accessToken, router]);

  if (!isClient || !accessToken) return null;
  return children;
}