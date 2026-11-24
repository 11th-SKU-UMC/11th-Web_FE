import { AuthGuard } from "../../components/auth/auth-guard";
import { LoginPage } from "../../features/auth/login-page";

export default function Page() {
  return (
    <AuthGuard requireAuth={false}>
      <LoginPage />
    </AuthGuard>
  );
}
