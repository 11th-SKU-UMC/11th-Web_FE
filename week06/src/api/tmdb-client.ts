import ky from "ky";
import { assertTmdbConfig, env } from "../config/env";

// [필수] 공통 URL / 인증 헤더를 한 번만 설정하는 ky 인스턴스
// 인스턴스 생성 전 config 검사 대신 요청 시 검사하여 설정 누락을 화면 오류로 표시한다.
export const tmdbClient = ky.create({
  baseUrl: `${env.tmdbApiBaseUrl || "https://api.themoviedb.org/3"}/`,
  headers: { Authorization: `Bearer ${env.tmdbAccessToken || ""}` },
  hooks: { beforeRequest: [() => assertTmdbConfig()] },
});
