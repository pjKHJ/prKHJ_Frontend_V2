import { api } from "./axios";

export interface ClassLeaderboardItem {
  class: number;
  tier: number;
  totalSolved: number;
  accuracyRate: number;
  todaySolved: number;
  streak: number;
  maxStreak: number;
}

export interface ClassLeaderboardResponse {
  class: ClassLeaderboardItem[];
}

export interface StudentLeaderboardItem {
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

export interface StudentLeaderboardResponse {
  students: StudentLeaderboardItem[];
}

const useMockData = import.meta.env.VITE_USE_MOCK_LEADERBOARD !== "false";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function getMockLeaderboardData(): Promise<{
  class: ClassLeaderboardItem[];
  students: StudentLeaderboardItem[];
}> {
  const response = await fetch("/mock/leaderboard.json");
  if (!response.ok) {
    throw new Error("Failed to load mock leaderboard data.");
  }

  const parsed: unknown = await response.json();
  if (!isObject(parsed)) {
    throw new Error("Mock leaderboard response is invalid.");
  }

  const classRows = Array.isArray(parsed.class)
    ? (parsed.class as ClassLeaderboardItem[])
    : [];
  const studentRows = Array.isArray(parsed.students)
    ? (parsed.students as StudentLeaderboardItem[])
    : [];

  return {
    class: classRows,
    students: studentRows,
  };
}

export const getClassLeaderboard = async () => {
  if (useMockData) {
    const mockData = await getMockLeaderboardData();
    return { class: mockData.class };
  }

  const response = await api.get<ClassLeaderboardResponse>(
    "/api/v2/data/students/class",
  );

  return response.data;
};

export const getStudentLeaderboard = async () => {
  if (useMockData) {
    const mockData = await getMockLeaderboardData();
    return { students: mockData.students };
  }

  const response = await api.get<StudentLeaderboardResponse>(
    "/api/v2/data/students",
  );

  return response.data;
};
