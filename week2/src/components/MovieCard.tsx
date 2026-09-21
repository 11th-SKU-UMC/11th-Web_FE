import { useState } from "react";

interface MovieCardProps {
  title: string;
  releaseDate: string;
  isBookmarked: boolean;
}

export function MovieCard({
  title,
  releaseDate,
  isBookmarked,
}: MovieCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  return (
    <div className="flex-1 rounded-lg bg-gray-100 p-5">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-gray-500">{releaseDate}</div>
      <button
        className="mt-4 text-sm font-medium"
        onClick={() => setBookmarked((current) => !current)}
      >
        {bookmarked ? "★ 북마크 됨" : "☆ 북마크 안 됨"}
      </button>
    </div>
  );
}
