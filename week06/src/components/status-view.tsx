export function StatusView({ status, message, retry }: { status: "loading" | "error" | "empty"; message?: string; retry?: () => void }) {
  return <div className={`status status-${status}`} role={status === "error" ? "alert" : "status"}>
    {status === "loading" && <div className="spinner" aria-hidden="true"/>}
    <p>{message ?? (status === "loading" ? "영화를 불러오는 중이에요." : status === "empty" ? "조건에 맞는 영화가 없어요." : "요청에 실패했어요.")}</p>
    {status === "error" && retry && <button className="button" onClick={retry}>다시 시도</button>}
  </div>;
}
