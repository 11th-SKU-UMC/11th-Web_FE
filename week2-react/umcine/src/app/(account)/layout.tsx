import type { ReactNode } from "react";
import { RootLayout } from "../../components/layout/root-layout";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <RootLayout light>{children}</RootLayout>;
}
