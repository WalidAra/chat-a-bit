/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSocket } from "@/hooks";
import React, { useEffect } from "react";

type StateProps = {
  event: "friendRequest" | "";
};

const StateManager = ({ children }: { children: React.ReactNode }) => {
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("state", (data: StateProps) => {});
    }
  }, [socket]);

  return <> {children}</>;
};

export default StateManager;
