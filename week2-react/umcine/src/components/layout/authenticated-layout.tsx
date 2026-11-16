import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

export function AuthenticatedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);

  // 페이지를 보는 중 401 응답으로 토큰이 지워져도 보호해요.
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
