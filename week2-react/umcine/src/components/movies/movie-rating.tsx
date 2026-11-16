import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type SubmitEvent } from "react";
import { memberRatingsQueryOptions } from "../../api/ratings/rating-query-options";
import { ratingMutationOptions } from "../../api/ratings/rating-mutation-options";
import type { Rating } from "../../api/ratings/ratings";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

export function MovieRating({ movieId }: { movieId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  const memberId = accessToken ? meQuery.data?.memberId : undefined;
  const ratingsQuery = useQuery(memberRatingsQueryOptions(memberId));
  const rating = ratingsQuery.data?.find((item) => item.movieId === movieId);

  return (
    <section className="mt-8 rounded-xl border border-white/15 bg-black/40 p-5" aria-label="내 평점">
      <h2 className="mb-4 text-lg font-bold text-white">내 평점</h2>
      {!accessToken ? (
        <Link className="text-sm text-blue-300 underline" to="/login">로그인하고 평점을 남겨 보세요.</Link>
      ) : meQuery.isLoading || ratingsQuery.isLoading ? (
        <p className="text-sm text-[#c3c8d0]" role="status">내 평점을 불러오는 중이에요.</p>
      ) : meQuery.isError || ratingsQuery.isError || !memberId ? (
        <div className="text-sm text-[#c3c8d0]">
          <p role="alert">내 평점을 불러오지 못했어요.</p>
          <button className="mt-2 cursor-pointer text-blue-300 underline" type="button" onClick={() => meQuery.isError ? meQuery.refetch() : ratingsQuery.refetch()}>다시 시도</button>
        </div>
      ) : (
        <RatingForm key={`${memberId}:${movieId}:${rating?.ratingId ?? "new"}:${rating?.updatedAt ?? ""}`} movieId={movieId} memberId={memberId} rating={rating} />
      )}
    </section>
  );
}

function RatingForm({ movieId, memberId, rating }: { movieId: number; memberId: number; rating?: Rating }) {
  const [form, setForm] = useState({ score: rating?.score ?? 5, comment: rating?.comment ?? "" });
  const queryClient = useQueryClient();
  const mutation = useMutation(ratingMutationOptions(queryClient, memberId));
  const canSubmit = Number.isInteger(form.score) && form.score >= 1 && form.score <= 5 && form.comment.length <= 500;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || mutation.isPending) return;
    const body = { score: form.score, comment: form.comment.trim() };
    mutation.mutate(rating
      ? { action: "update", ratingId: rating.ratingId, body }
      : { action: "create", movieId, body });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {rating && <p className="text-sm text-blue-300">등록한 평점: {rating.score}점</p>}
      <div className="grid gap-2">
        <label className="text-sm font-bold text-white" htmlFor={`rating-score-${movieId}`}>별점</label>
        <select className="w-fit rounded-md border border-white/20 bg-[#191c23] px-3 py-2 text-sm text-white" id={`rating-score-${movieId}`} value={form.score} onChange={(event) => setForm((previous) => ({ ...previous, score: Number(event.target.value) }))} disabled={mutation.isPending}>
          {[1, 2, 3, 4, 5].map((score) => <option key={score} value={score}>{score}점</option>)}
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-bold text-white" htmlFor={`rating-comment-${movieId}`}>후기 (선택)</label>
        <textarea className="min-h-24 w-full rounded-md border border-white/20 bg-[#191c23] px-3 py-2 text-sm text-white outline-none focus:border-blue-500" id={`rating-comment-${movieId}`} value={form.comment} maxLength={500} onChange={(event) => setForm((previous) => ({ ...previous, comment: event.target.value }))} disabled={mutation.isPending} placeholder="500자 이내로 후기를 남겨 주세요" />
        <p className="text-right text-xs text-[#969da8]">{form.comment.length}/500</p>
      </div>
      <div className="flex gap-3">
        <button className="cursor-pointer rounded-md bg-[#4169e1] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={!canSubmit || mutation.isPending}>
          {mutation.isPending ? "처리 중" : rating ? "평점 수정" : "평점 등록"}
        </button>
        {rating && <button className="cursor-pointer rounded-md border border-white/20 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={mutation.isPending} onClick={() => mutation.mutate({ action: "delete", ratingId: rating.ratingId })}>평점 삭제</button>}
      </div>
      {mutation.isSuccess && <p className="text-sm text-blue-300" role="status">평점이 반영됐어요.</p>}
    </form>
  );
}
