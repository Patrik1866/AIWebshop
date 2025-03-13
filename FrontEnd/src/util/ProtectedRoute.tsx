import { Navigate } from "react-router-dom";
import { Role } from "./AuthService.ts";
import authService from "./AuthService.ts";

interface ProtectedRouteProps {
  roles: Role[];
  children: JSX.Element;
}

export const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const isAuthenticated = authService.isAuthenticated();
  const hasRequiredRole = authService.hasRole(roles);

  if (!isAuthenticated) {
    
    return <Navigate to="/LoginPage" replace />;
  }

  if (!hasRequiredRole) {
   
    return <Navigate to="/unauthorized" replace />;
  }

  
  return children;
};