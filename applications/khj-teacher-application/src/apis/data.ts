import { api } from "./axios";

export interface UserInfoResponse {
  id: number;
  studentNumber: number;
  name: string;
  bojId: string;
  tier: string;
  totalSolved: number;
  todaySolved?: number;
  accuracyRate: number;
  streak: number;
  maxStreak: number;
  flame: number;
}

export interface GrassItem {
  date: string;
  value: number;
}

export interface UserGrassResponse {
  grass: GrassItem[];
}

export const getUserInfo = async (id: number) => {
  const response = await api.get<UserInfoResponse>(
    `/api/v2/data/student/${id}`,
  );
  return response.data;
};

export const getUserGrass = async (id: number, period: number = 7) => {
  const response = await api.get<UserGrassResponse>(
    `/api/v2/data/student/${id}/grass/?period=${period}`,
  );
  return response.data;
};
