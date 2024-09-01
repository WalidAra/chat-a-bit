import { useAuth } from "@/hooks";
import { Navigate } from "react-router-dom";

const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
