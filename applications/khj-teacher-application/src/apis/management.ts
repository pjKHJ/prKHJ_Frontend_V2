import { api } from "./axios";

export interface DeleteStudentsResponse {
  deletedIds: number[];
}

export interface ManagementStudent {
  id: number;
  studentNumber: string;
  name: string;
  bojId: string;
}

export interface ManagementStudentsResponse {
  students: ManagementStudent[];
}

export interface ErrorResponse {
  code?: string;
  message?: string;
}

export interface BulkStudentItem {
  studentNumber: string;
  name: string;
  bojId: string;
}

export interface CreateStudentRequest {
  studentNumber: string;
  name: string;
  bojId: string;
}

export interface CreateStudentResponse {
  id: number;
  studentNumber: string;
  name: string;
  bojId: string;
}

export interface BulkCreateStudentsRequest {
  students: BulkStudentItem[];
}

export interface CreatedStudent {
  id: number;
  studentNumber: string;
  name: string;
  bojId: string;
}

export interface BulkCreateStudentsResponse {
  created: CreatedStudent[];
}

export const getManagementStudents = async (accessToken: string | null) => {
  if (!accessToken) {
    const error = new Error("AUTHORIZATION_TOKEN_MISSING");
    throw error;
  }

  const response = await api.get<ManagementStudentsResponse>(
    "/api/v2/management/students",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

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

export const bulkCreateStudents = async (
  request: BulkCreateStudentsRequest,
  accessToken: string,
) => {
  const response = await api.post<BulkCreateStudentsResponse>(
    "/api/v2/management/students/bulk",
    request,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

export const createStudent = async (
  request: CreateStudentRequest,
  accessToken: string,
) => {
  const response = await api.post<CreateStudentResponse>(
    "/api/v2/management/students",
    request,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};
