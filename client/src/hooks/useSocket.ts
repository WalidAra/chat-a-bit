import useAuth from "./useAuth";
import { Socket, io } from "socket.io-client";
import React, { useEffect } from "react";
import { API_URL } from "@/config";

export const useSocket = () => {
  const { token } = useAuth();
  const [socket, setSocket] = React.useState<Socket | null>(null);

  useEffect(() => {
    if (token) {
      const newSocket = io(API_URL, {
        auth: { token: token as string },
      });
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    }
  }, [token]);

  return { socket };
};
export default useSocket;
