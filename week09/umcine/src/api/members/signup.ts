import { apiClient } from '../api-client';
export interface SignupRequest { email: string; nickname: string; password: string }
export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: { memberId: number; email: string; nickname: string };
}
export async function signup(body: SignupRequest) {
  const response = await apiClient.post('members', { json: body }).json<SignupResponse>();
  if (!response.isSuccess) throw new Error(response.message);
  return response;
}
