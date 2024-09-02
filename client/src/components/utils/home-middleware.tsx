import { useAuth } from "@/hooks";
import { Navigate } from "react-router-dom";

const HomeMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  

  return <>{children}</>;
};

export default HomeMiddleware;
