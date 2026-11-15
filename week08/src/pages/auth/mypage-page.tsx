import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getFavorites, removeFavorite } from "../../api/favorites/favorites";
import { getMe } from "../../api/members/me";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { useAuthStore } from "../../stores/auth-store";

export function MyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
  });

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (movieId: number) => removeFavorite(movieId),
    onSuccess: (_, movieId) => {
      queryClient.setQueryData(["favorites", movieId], { isFavorite: false });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      alert("즐겨찾기를 해제했습니다.");
    },
    onError: () => {
      alert("즐겨찾기 해제에 실패했어요. 다시 시도해 주세요.");
    },
  });

  const [nickname, setNickname] = useState("");
  const updateMeMutation = useUpdateMeMutation();

  useEffect(() => {
    if (meQuery.data?.nickname) {
      setNickname(meQuery.data.nickname);
    }
  }, [meQuery.data?.nickname]);

  const trimmedNickname = nickname.trim();
  const canSubmit = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || updateMeMutation.isPending) return;

    updateMeMutation.mutate({ nickname: trimmedNickname });
  };

  const handleLogout = () => {
    setAccessToken(null);
    queryClient.removeQueries({ queryKey: ["members", "me"] });
    queryClient.removeQueries({ queryKey: ["favorites"] });
    alert("로그아웃되었어요.");
    navigate({ to: "/login" });
  };

  if (meQuery.isLoading) {
    return <p>내 정보를 불러오는 중...</p>;
  }

  return (
    <div style={{ padding: "16px" }}>
      <form onSubmit={handleSubmit} noValidate>
        <h2>내 정보 조회 및 수정</h2>

        <div>
          <label>이메일 (수정 불가)</label>
          <br />
          <input
            type="email"
            value={meQuery.data?.email ?? ""}
            disabled
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              margin: "4px 0",
              width: "200px",
              backgroundColor: "#f3f4f6",
            }}
          />
        </div>

        <div>
          <label>닉네임 수정</label>
          <br />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              margin: "4px 0",
              width: "200px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit || updateMeMutation.isPending}
          style={{ marginTop: "12px", padding: "6px 12px" }}
        >
          {updateMeMutation.isPending ? "저장 중" : "수정하기"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleLogout}
        style={{ marginTop: "16px", padding: "6px 12px", color: "red" }}
      >
        로그아웃
      </button>

      <hr style={{ margin: "24px 0" }} />

      <section>
        <h2>내 즐겨찾기 목록</h2>
        {favoritesQuery.isLoading ? (
          <p>즐겨찾기 목록을 불러오는 중...</p>
        ) : !favoritesQuery.data || favoritesQuery.data.length === 0 ? (
          <p>등록된 즐겨찾기가 없습니다.</p>
        ) : (
          <ul>
            {favoritesQuery.data.map((item) => (
              <li key={item.favoriteId} style={{ marginBottom: "8px" }}>
                <span>
                  영화 ID: <strong>{item.movieId}</strong> (등록일:{" "}
                  {new Date(item.createdAt).toLocaleDateString()})
                </span>
                <button
                  type="button"
                  disabled={removeFavoriteMutation.isPending}
                  onClick={() => removeFavoriteMutation.mutate(item.movieId)}
                  style={{ marginLeft: "12px", padding: "2px 8px" }}
                >
                  해제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}