import { useState } from "react";
import { Icon } from "./Icon";

const STARS = [1, 2, 3, 4, 5];

interface SavedRating {
  rating: number;
  review: string;
}

function storageKey(movieId: number) {
  return `umcine:rating:${movieId}`;
}

function loadRating(movieId: number): SavedRating {
  try {
    const saved = localStorage.getItem(storageKey(movieId));
    if (saved) return JSON.parse(saved) as SavedRating;
  } catch {
    // 저장된 값을 읽지 못하면 0점으로 시작
  }
  return { rating: 0, review: "" };
}

interface RatingPanelProps {
  movieId: number;
}

export function RatingPanel({ movieId }: RatingPanelProps) {
  const [saved] = useState(() => loadRating(movieId));
  const [rating, setRating] = useState(saved.rating);
  const [review, setReview] = useState(saved.review);
  const [isSaved, setIsSaved] = useState(saved.rating > 0 || saved.review !== "");

  function handleSave() {
    localStorage.setItem(
      storageKey(movieId),
      JSON.stringify({ rating, review }),
    );
    setIsSaved(true);
  }

  function handleReset() {
    localStorage.removeItem(storageKey(movieId));
    setRating(0);
    setReview("");
    setIsSaved(false);
  }

  // 저장한 뒤 값을 고치면 다시 저장할 수 있게 되돌린다.
  function handleChangeRating(score: number) {
    setRating(score);
    setIsSaved(false);
  }

  function handleChangeReview(nextReview: string) {
    setReview(nextReview);
    setIsSaved(false);
  }

  return (
    <aside className="flex w-[360px] shrink-0 flex-col gap-2 border-l border-border pb-[41px] pl-[30px]">
      <h2 className="text-[21px] font-bold tracking-[-0.63px] text-primary">
        내 평점
      </h2>

      <p className="text-xs text-tertiary">별점은 필수, 후기는 선택이에요.</p>

      <div className="flex gap-1">
        {STARS.map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => handleChangeRating(score)}
            aria-label={`${score}점`}
            aria-pressed={score <= rating}
            className="flex size-[38px] items-center justify-center rounded-lg border border-border bg-surface"
          >
            <Icon
              name="star"
              className={`size-6 ${score <= rating ? "text-yellow-400" : "text-secondary"}`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(event) => handleChangeReview(event.target.value)}
        placeholder="영화를 보고 느낀 점을 남겨보세요."
        aria-label="후기"
        className="h-[102px] resize-none rounded-lg border border-border bg-surface px-3 pt-4 pb-[18px] text-[13px] leading-[19.5px] text-primary outline-none placeholder:text-tertiary"
      />

      <button
        type="button"
        onClick={isSaved ? handleReset : handleSave}
        className={`flex h-[42px] w-full items-center justify-center rounded-lg border border-surface px-4 text-center text-sm font-bold text-surface ${
          isSaved ? "bg-primary" : "bg-action"
        }`}
      >
        {isSaved ? "초기화" : "평점 저장"}
      </button>
    </aside>
  );
}
