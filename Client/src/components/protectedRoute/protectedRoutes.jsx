import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

// ⛔ Only guests allowed
export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/dashboard"} replace />;
  }

  return children;
};

// ✅ User-protected routes
export const UserProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;
  if (!(user?.isVerified ?? false)) return <Navigate to="/auth/verify-identity" replace />;
  if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;

  return children;
};

// 🔒 Admin-only routes
export const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;
  if (!user.isVerified) return <Navigate to="/auth/verify-identity" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
};
