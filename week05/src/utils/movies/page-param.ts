export function parsePage(raw: string | null) {
  const value = Number(raw ?? "1");
  return Number.isSafeInteger(value) && value > 0 && value <= 500 ? value : 1;
}
