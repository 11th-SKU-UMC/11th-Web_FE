function Header() {
  return <div className="text-2xl font-bold">영화 카드</div>;
}

function MovieTitle() {
  return <div className="text-lg font-semibold">오디세이</div>;
}

function MovieCard() {
  return (
    <div className="flex-1 rounded-lg bg-gray-100 p-5">
      <MovieTitle />
      <p className="mt-2 text-sm text-gray-500">2026.09.21</p>
    </div>
  );
}

function MovieList() {
  return (
    <div className="flex gap-4">
      <MovieCard />
      <MovieCard />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="mx-auto max-w-xl space-y-6 rounded-xl bg-white p-8 shadow-xl">
        <Header />
        <MovieList />
      </div>
    </div>
  );
}
