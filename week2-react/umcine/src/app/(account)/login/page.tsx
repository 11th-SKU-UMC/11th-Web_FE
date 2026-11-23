import type { Metadata } from "next";
import { AuthBoundary } from "../../../components/layout/auth-boundary";
import { LoginPage } from "../../../screens/auth/login-page";

export const metadata: Metadata = { title: "로그인" };

export default function Login() {
  return <AuthBoundary authenticated={false}><LoginPage /></AuthBoundary>;
}
