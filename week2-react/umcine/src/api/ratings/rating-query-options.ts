import { queryOptions } from "@tanstack/react-query";
import { getMemberRatings } from "./ratings";

export const ratingKeys = {
  member: (memberId: number | undefined) => ["ratings", "member", memberId] as const,
};

export const memberRatingsQueryOptions = (memberId: number | undefined) => queryOptions({
  queryKey: ratingKeys.member(memberId),
  queryFn: ({ signal }) => getMemberRatings(memberId!, signal),
  enabled: Boolean(memberId),
  staleTime: 5 * 60 * 1000,
  retry: false,
});
