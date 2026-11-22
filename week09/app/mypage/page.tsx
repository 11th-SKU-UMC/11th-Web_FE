"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MyPage } from "../../src/views/auth/mypage-page";
import { useAuthStore } from "../../src/stores/auth-store";

export default function MyRoutePage() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null;
  }

  return <MyPage />;
}

