export function parsePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 && page <= 500 ? page : 1;
}
