import type { ReactNode } from "react";
import { RootLayout } from "../../components/layout/root-layout";

export default function CinemaLayout({ children }: { children: ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
