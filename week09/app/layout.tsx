import type { Metadata } from 'next';
import Link from 'next/link';
import Providers from '../components/providers';
import './globals.css';
export const metadata: Metadata = {title:{default:'UMCine',template:'%s | UMCine'},description:'영화 목록과 상세 정보를 탐색하는 서비스'};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ko"><body><Providers><header><Link href="/">UMCine</Link><nav><Link href="/movies">영화</Link><Link href="/favorites">즐겨찾기</Link><Link href="/login">로그인</Link></nav></header><main>{children}</main><footer>UMCine · Next.js migration</footer></Providers></body></html>;
}
