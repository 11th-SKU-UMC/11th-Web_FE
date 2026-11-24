import { GuestOnly } from "../../components/auth/guest-only";
import { LoginPage } from "../../views/auth/login-page";

export default function LoginRoute() {
  return (
    <GuestOnly>
      <LoginPage />
    </GuestOnly>
  );
}