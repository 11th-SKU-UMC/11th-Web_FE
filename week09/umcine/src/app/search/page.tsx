import { Suspense } from 'react';
import { SearchPage } from '../../screens/movies/search-page';

export default function Page() {
  return <Suspense fallback={<main role="status">검색 화면을 불러오는 중이에요.</main>}><SearchPage /></Suspense>;
}
