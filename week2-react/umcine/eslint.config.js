import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "dist/**", "next-env.d.ts"]),
  {
    // 마이그레이션 중 기존 이미지의 표시 크기와 로딩 동작을 유지해요.
    rules: { "@next/next/no-img-element": "off" },
  },
]);
