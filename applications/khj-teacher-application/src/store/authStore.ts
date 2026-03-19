import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,

      setAccessToken: (accessToken) =>
        set({
          isLoggedIn: true,
          accessToken,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          accessToken: null,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
