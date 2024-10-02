import { useAuth } from "@/hooks";
import { SocketInstance } from "@/utils";
import { createContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const socket = SocketInstance.getInstance(token as string);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
