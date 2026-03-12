import { api } from "./axios";

export interface SignUpRequest {
  userName: string;
  password: string;
  signupCode: string;
}

export interface SignUpResponse {
  id: number;
  userName: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const signUp = async (data: SignUpRequest) => {
  const response = await api.post<SignUpResponse>("/api/v2/auth/join", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>("/api/v2/auth/login", data);
  return response.data;
};
