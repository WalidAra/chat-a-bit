import React, { useEffect } from "react";
import { Sidebar } from "../pages/home/shared";
import { ChatPanel } from "../pages/home/shared";
import { useSocket } from "@/hooks";
import ReduxProvider from "@/providers/ReduxProvider";
import { ProfileProvider, StateManager } from "@/components/utils";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {});
      return () => {
        socket.off("connect");
      };
    }
  }, [socket]);

  return (
    <ReduxProvider>
      <ProfileProvider>
        <StateManager>
          <div className="grid bg-background w-full min-h-screen pl-[56px] xl:pl-[376px] md:pl-[306px] relative">
            <div className="inset-y fixed left-0 z-20 flex h-full">
              <Sidebar />
              <ChatPanel />
            </div>
            <main className="flex w-full min-h-screen  relative items-center justify-center">
              {children}
            </main>
          </div>
        </StateManager>
      </ProfileProvider>
    </ReduxProvider>
  );
};
export default HomeLayout;
