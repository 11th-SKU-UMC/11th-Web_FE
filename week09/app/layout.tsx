import type { Metadata } from "next";
import { Header } from "../src/components/layout/header";
import { QueryProvider } from "../src/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMCine",
  description: "영화 탐색 및 평점·즐겨찾기 서비스 UMCine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-black text-white">
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
