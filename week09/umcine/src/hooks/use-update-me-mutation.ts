import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memberMutations } from "../api/members/member-mutations";

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();
  return useMutation(memberMutations.updateMe(queryClient));
}