export default function App() {
  const movieTitle = "오디세이";
  const genre = "모험";
  const releaseDate = "2026-09-21";

  return (
    <>
      <div>{movieTitle}</div>
      <div>장르: {genre}</div>
      <div>개봉일: {releaseDate}</div>
    </>
  );
}
