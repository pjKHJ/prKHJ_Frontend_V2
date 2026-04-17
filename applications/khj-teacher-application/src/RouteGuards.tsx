import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

export function RequireAuth() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/entry" replace />;
}

export function RequireGuest() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return !isLoggedIn ? <Outlet /> : <Navigate to="/list" replace />;
}
