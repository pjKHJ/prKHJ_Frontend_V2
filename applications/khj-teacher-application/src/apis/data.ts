import { api } from "./axios";

export interface UserInfoResponse {
  id: number;
  studentNumber: number;
  name: string;
  bojId: string;
  tier: string;
  totalSolved: number;
  accuracyRate: number;
  streak: number;
  maxStreak: number;
  flame: number;
}

export const getUserInfo = async (id: number) => {
  const response = await api.get<UserInfoResponse>(
    `/api/v2/data/student/${id}`,
  );
  return response.data;
};
