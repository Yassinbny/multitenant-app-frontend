import { Navigate, Outlet } from "react-router";
import type { UserRole } from "../features/auth/auth.types";
import { useAuth } from "../hooks/useAuth";

type RoleRouteProps = {
  allowedRoles: UserRole[];
};

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
