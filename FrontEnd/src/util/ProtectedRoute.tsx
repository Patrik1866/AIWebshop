import { Navigate, useLocation } from "react-router-dom";
import { Role, useAuth } from "./AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    roles
}) => {
    const { isAuthenticated, hasRole } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!hasRole(roles!)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};