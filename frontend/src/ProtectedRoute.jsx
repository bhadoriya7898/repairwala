import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Check login
  if (!token) return <Navigate to="/login" />;

  // Check role (admin / employee)
  if (role && userRole !== role) return <Navigate to="/login" />;

  return children;
}
