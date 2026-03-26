import { api } from "./axios";

export interface DeleteStudentsResponse {
  deletedIds: number[];
}

export interface ErrorResponse {
  code?: string;
  message?: string;
}

export const deleteStudents = async (
  ids: number[],
  accessToken: string | null,
) => {
  if (!accessToken) {
    const error = new Error("AUTHORIZATION_TOKEN_MISSING");
    throw error;
  }

  const response = await api.delete<DeleteStudentsResponse>(
    "/api/v2/management/students",
    {
      data: { ids },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};
