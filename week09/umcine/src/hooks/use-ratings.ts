import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberRatings } from "../api/ratings/ratings";
import { ratingMutations } from "../api/ratings/rating-mutations";
import { useMeQuery } from "./use-me-query";

// 이 영화에 대한 내 평점 (없으면 null)
export function useMyRatingQuery(movieId: number) {
  const meQuery = useMeQuery();
  const memberId = meQuery.data?.memberId;

  return useQuery({
    queryKey: ["ratings", "member", memberId],
    queryFn: () => getMemberRatings(memberId as number),
    enabled: memberId !== undefined,
    select: (ratingPage) =>
      ratingPage.content.find((rating) => rating.movieId === movieId) ?? null,
  });
}

export function useCreateRatingMutation() {
  const queryClient = useQueryClient();
  return useMutation(ratingMutations.create(queryClient));
}

export function useUpdateRatingMutation() {
  const queryClient = useQueryClient();
  return useMutation(ratingMutations.update(queryClient));
}

export function useDeleteRatingMutation() {
  const queryClient = useQueryClient();
  return useMutation(ratingMutations.delete(queryClient));
}