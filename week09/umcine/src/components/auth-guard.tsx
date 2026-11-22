"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth-store';

function subscribeHydration(onChange: () => void) {
  return useAuthStore.persist.onFinishHydration(onChange);
}

export function AuthGuard({ children, guestOnly = false }: { children: ReactNode; guestOnly?: boolean }) {
  const router = useRouter();
  const accessToken = useAuthStore(state => state.accessToken);
  const hydrated = useSyncExternalStore(subscribeHydration, () => useAuthStore.persist.hasHydrated(), () => false);
  const redirectTo = guestOnly ? (accessToken ? '/' : null) : (accessToken ? null : '/login');
  useEffect(() => {
    if (hydrated && redirectTo) router.replace(redirectTo);
  }, [hydrated, redirectTo, router]);
  if (!hydrated || redirectTo) return <main role="status">로그인 상태를 확인하는 중이에요.</main>;
  return children;
}
