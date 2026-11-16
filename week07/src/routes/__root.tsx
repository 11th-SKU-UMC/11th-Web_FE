import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ProfileProvider } from "../pages/member/profile-provider";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <ProfileProvider>
      <Header />
      <Outlet />
    </ProfileProvider>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
});