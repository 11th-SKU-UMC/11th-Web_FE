import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRating,
  deleteRating,
  getMemberRatings,
  updateRating,
} from "../api/ratings";

export const memberRatingsQueryKey = (memberId: number) =>
  ["members", memberId, "ratings"] as const;

export function useMemberRatingsQuery(memberId: number | null, enabled: boolean) {
  return useQuery({
    queryKey: memberRatingsQueryKey(memberId ?? 0),
    queryFn: () => getMemberRatings(memberId!),
    enabled: enabled && memberId !== null,
    retry: false,
  });
}

export function useCreateRatingMutation(memberId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      if (memberId !== null) {
        return queryClient.invalidateQueries({
          queryKey: memberRatingsQueryKey(memberId),
        });
      }
    },
    onError: () => alert("평점을 저장하지 못했어요. 다시 시도해 주세요."),
  });
}

export function useUpdateRatingMutation(memberId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ratingId, score, comment }: { ratingId: number; score: number; comment: string }) =>
      updateRating(ratingId, { score, comment }),
    onSuccess: () => {
      if (memberId !== null) {
        return queryClient.invalidateQueries({
          queryKey: memberRatingsQueryKey(memberId),
        });
      }
    },
    onError: () => alert("평점을 수정하지 못했어요. 다시 시도해 주세요."),
  });
}

export function useDeleteRatingMutation(memberId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: () => {
      if (memberId !== null) {
        return queryClient.invalidateQueries({
          queryKey: memberRatingsQueryKey(memberId),
        });
      }
    },
    onError: () => alert("평점을 삭제하지 못했어요. 다시 시도해 주세요."),
  });
}
