"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "../../src/views/auth/login-page";
import { useAuthStore } from "../../src/stores/auth-store";

export default function LoginRoutePage() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      router.replace("/");
    }
  }, [accessToken, router]);

  return <LoginPage />;
}

