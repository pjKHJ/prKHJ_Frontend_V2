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

export interface StudentItemResponse {
  id: number;
  studentNumber: string;
  name: string;
  bojId: string;
  tier: number;
  totalSolved: number;
  accuracyRate: number;
  todaySolved: number;
  streak: number;
  maxStreak: number;
}

export interface StudentListResponse {
  students: StudentItemResponse[];
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

export const getStudents = async () => {
  const response = await api.get<StudentListResponse>("/api/v2/data/students");
  return response.data;
};
