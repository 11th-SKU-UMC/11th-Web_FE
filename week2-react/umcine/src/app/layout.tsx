import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "../index.css";

export const metadata: Metadata = {
  title: { default: "UMCINE", template: "%s | UMCINE" },
  description: "영화를 검색하고 관심 영화와 평점을 관리해 보세요.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
