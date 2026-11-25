interface JwtPayload {
  sub?: string;
}

export function getMemberIdFromAccessToken(token: string | null): number | null {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const claims = JSON.parse(atob(padded)) as JwtPayload;
    const memberId = Number(claims.sub);

    return Number.isSafeInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}
