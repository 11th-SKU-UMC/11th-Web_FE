import { useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { favoritesQueryOptions, favoriteStatusQueryOptions } from "../api/favorites/favorite-query-options";
import { favoriteMutationKey, favoriteMutationOptions } from "../api/favorites/favorite-mutation-options";
import { useMeQuery } from "../hooks/use-me-query";
import { useAuthStore } from "../stores/auth-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle?: string;
  variant?: "text" | "icon";
}

export function BookmarkButton({
  movieId,
  movieTitle,
  variant = "text",
}: BookmarkButtonProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  const memberId = accessToken ? meQuery.data?.memberId : undefined;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // 영화 목록의 아이콘들은 즐겨찾기 목록 요청 하나를 공유해요.
  const listQuery = useQuery(favoritesQueryOptions(variant === "icon" ? memberId : undefined));
  const statusQuery = useQuery(favoriteStatusQueryOptions(variant === "text" ? memberId : undefined, movieId));
  const mutation = useMutation(favoriteMutationOptions(queryClient, memberId, movieId));
  const isMutating = useIsMutating({ mutationKey: favoriteMutationKey(memberId, movieId) }) > 0;
  const currentQuery = variant === "icon" ? listQuery : statusQuery;
  const isBookmarked = Boolean(accessToken && (variant === "icon"
    ? listQuery.data?.some((favorite) => favorite.movieId === movieId)
    : statusQuery.data?.isFavorite));
  const isLoading = Boolean(accessToken) && (meQuery.isLoading || currentQuery.isLoading);
  const isError = Boolean(accessToken) && (meQuery.isError || currentQuery.isError);

  const label = isLoading ? "즐겨찾기 확인 중" : isMutating ? "변경 중" : isError ? "즐겨찾기 다시 조회" : isBookmarked ? "북마크 해제" : "북마크 추가";

  return (
    <button
      className={cn(
        variant === "icon"
          ? "absolute top-2 right-2 grid size-9 cursor-pointer place-items-center rounded-full border border-white p-2 text-white transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          : "inline-flex cursor-pointer items-center rounded-lg border border-white/15 bg-[#191c23] px-3 py-2 text-sm font-bold text-white transition-colors hover:border-blue-500 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        variant === "icon" && isBookmarked
          ? "border-blue-600 bg-blue-600"
          : variant === "icon" && "bg-black/60",
      )}
      type="button"
      disabled={isLoading || isMutating}
      aria-busy={isLoading || isMutating}
      aria-label={movieTitle ? `${movieTitle} ${label}` : label}
      aria-pressed={isBookmarked}
      onClick={() => {
        if (!accessToken) {
          navigate({ to: "/login" });
          return;
        }
        if (isError) {
          if (meQuery.isError) meQuery.refetch();
          else currentQuery.refetch();
          return;
        }
        if (!memberId || !currentQuery.data || isMutating) return;
        mutation.mutate({ movieId, isFavorite: isBookmarked });
      }}
    >
      {variant === "icon" ? (
        <img
          className="block invert"
          src={
            isBookmarked
              ? "/icons/movie-icons/bookmark.svg"
              : "/icons/movie-icons/bookmark-outline.svg"
          }
          alt=""
        />
      ) : (
        label
      )}
    </button>
  );
}
