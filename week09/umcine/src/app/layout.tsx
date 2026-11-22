import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import { Header } from '../components/layout/header';
import '../index.css';
import '../account.css';

export const metadata: Metadata = { title: 'UMCINE', description: '영화를 검색하고 나만의 취향을 기록하세요.' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ko"><body>
    <Providers><Header />{children}</Providers>
  </body></html>;
}
