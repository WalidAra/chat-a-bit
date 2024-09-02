import React from "react";
import { Sidebar } from "../pages/home/shared";
import { ChatPanel } from "../pages/home/shared";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid bg-background w-full min-h-screen pl-[56px] xl:pl-[376px] md:pl-[306px] relative">
      <div className="inset-y  fixed  left-0 z-20 flex h-full ">
        <Sidebar />
        <ChatPanel />
      </div>
      <main className="grid relative items-center justify-center">{children}</main>
    </div>
  );
};

export default HomeLayout;
