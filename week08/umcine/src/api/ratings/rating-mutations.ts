import { mutationOptions, type QueryClient } from "@tanstack/react-query";
import { createRating, deleteRating, updateRating } from "./ratings";

async function refreshRatings(queryClient: QueryClient) {
  await queryClient.invalidateQueries({ queryKey: ["ratings"] });
}

export const ratingMutations = {
  create: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: ["ratings", "create"],
      mutationFn: createRating,
      onSuccess: async () => {
        await refreshRatings(queryClient);
        alert("평점을 등록했어요.");
      },
      onError: () => {
        alert("평점 등록에 실패했어요.");
      },
    }),

  update: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: ["ratings", "update"],
      mutationFn: updateRating,
      onSuccess: async () => {
        await refreshRatings(queryClient);
        alert("평점을 수정했어요.");
      },
      onError: () => {
        alert("평점 수정에 실패했어요.");
      },
    }),

  delete: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: ["ratings", "delete"],
      mutationFn: deleteRating,
      onSuccess: async () => {
        await refreshRatings(queryClient);
        alert("평점을 삭제했어요.");
      },
      onError: () => {
        alert("평점 삭제에 실패했어요.");
      },
    }),
};