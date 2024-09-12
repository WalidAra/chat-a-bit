import { useFetch } from "@/hooks";
import { accessToken } from "@/types";
import { createContext } from "react";

type Props = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Auth = createContext<Props>({
  token: null,
  setToken: () => {},
});

import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [token, setToken] = React.useState<string | null>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchToken = urlParams.get("token");

    if (searchToken) {
      const url = new URL(window.location.toString());
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.pathname);
    }
    return searchToken;
  });

  const { isLoading, response } = useFetch<accessToken>({
    endpoint: "refresh",
    feature: "auth",
    method: "GET",
    accessToken: token,
    includeAccessToken: false,
  });

  if (isLoading === true) {
    return null;
  }

  return (
    <Auth.Provider
      value={{
        setToken,
        token:
          token ||
          ((response?.status === true ? response?.data.accessToken : null) ??
            null),
      }}
    >
      {children}
    </Auth.Provider>
  );
};
export default AuthProvider;
