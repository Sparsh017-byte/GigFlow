import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const { loading } = useAuth();

  if (!user && loading === false) {
    return <Navigate to="/login" replace />;
    
  }

  return children;
}

