import React from "react";
import NavBar from "../pages/home/friends/shared/NavBar";
import { Separator } from "../atoms/ui/separator";

const FriendsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 p-4">
      <NavBar />
      <Separator />
      {children}
    </div>
  );
};

export default FriendsLayout;
