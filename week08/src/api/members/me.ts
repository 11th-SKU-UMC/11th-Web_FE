import { authApi } from '../auth-api';

export interface MemberInfo { email: string; nickname: string; createdAt: string }
interface MeResponse { isSuccess: boolean; code: string; message: string; result: MemberInfo }

export async function getMe() {
  const response = await authApi.get('members/me').json<MeResponse>();
  if (!response.isSuccess) throw new Error(response.message);
  return response.result;
}
