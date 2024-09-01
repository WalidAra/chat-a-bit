import { TOKEN_KEY } from "@/config";
import { createContext } from "react";

type Props = {
  token: string | null;
  setToken: (token: string) => void;
  handleLogout: () => void;
  handleSetToken: (token: string) => void;
};

export const Auth = createContext<Props>({
  token: null,
  setToken: () => {},
  handleLogout: () => {},
  handleSetToken: () => {},
});

import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const handleSetToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Auth.Provider value={{ setToken, token, handleLogout, handleSetToken }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
