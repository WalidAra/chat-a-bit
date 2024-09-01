import { Auth } from "@/providers";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(Auth);
  return context;
};

export default useAuth;
