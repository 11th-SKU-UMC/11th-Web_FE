import type { ReactNode } from 'react';
import { AuthGuard } from '../../components/auth-guard';

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <AuthGuard><div className="account-ui">{children}</div></AuthGuard>;
}
