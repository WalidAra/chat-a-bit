import { useAuth, useFetch } from "@/hooks";
import { LuLoader2 } from "react-icons/lu";
import { Navigate, useLocation } from "react-router-dom";

const HomeMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const { pathname } = useLocation();

  const { isLoading, response } = useFetch<string>({
    endpoint: "last",
    method: "GET",
    feature: "chats",
    accessToken: token,
    includeAccessToken: true,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading === true) {
    return (
      <div className="w-full h-screen flex-1 flex items-center justify-center ">
        <LuLoader2 className="animate-spin size-10" />
      </div>
    );
  }

  if (response?.status === false && pathname.includes("chat")) {
    return <Navigate to="/" replace />;
  } else if (response?.status === true && response.data && pathname === "/") {
    return <Navigate to={`/chat${response.data}`} replace />;
  }

  return <>{children}</>;
};

export default HomeMiddleware;
