import { Navigate, Outlet } from "react-router-dom";

const getIsLoggedIn = () => {
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (!authStorage) {
      return false;
    }

    const parsed = JSON.parse(authStorage);
    return parsed?.state?.isLoggedIn === true;
  } catch {
    return false;
  }
};

export function RequireAuth() {
  return getIsLoggedIn() ? <Outlet /> : <Navigate to="/entry" replace />;
}

export function RequireGuest() {
  return getIsLoggedIn() ? <Navigate to="/list" replace /> : <Outlet />;
}
