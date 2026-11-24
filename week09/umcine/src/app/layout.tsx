import type { Metadata } from "next";
import { Header } from "../components/layout/header";
import { TmdbAttribution } from "../components/tmdb-attribution";
import { Providers } from "./providers";
import "../index.css";

export const metadata: Metadata = {
  title: "UMCine",
  description: "TMDB 영화 정보를 탐색하는 UMCine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          {children}
          <TmdbAttribution />
        </Providers>
      </body>
    </html>
  );
}