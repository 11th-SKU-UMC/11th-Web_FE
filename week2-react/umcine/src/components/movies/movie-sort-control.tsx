import { useMoviePreferenceStore } from "../../stores/movie-preference-store";

export function MovieSortControl() {
  const sortOrder = useMoviePreferenceStore((state) => state.sortOrder);
  const setSortOrder = useMoviePreferenceStore((state) => state.setSortOrder);

  return (
    <label className="mb-5 flex items-center justify-end gap-2 text-sm text-[#969da8]">
      <span>정렬</span>
      <select
        className="cursor-pointer rounded-lg border border-[#2a2d33] bg-[#111318] px-3 py-2 text-white outline-none focus:border-blue-500"
        value={sortOrder}
        onChange={(event) =>
          setSortOrder(event.target.value as "default" | "title")
        }
      >
        <option value="default">기본순</option>
        <option value="title">제목순</option>
      </select>
    </label>
  );
}
