import type { ReactNode } from "react";
import Providers from "./providers";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import "../index.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 pb-20">
              {children}
            </main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
