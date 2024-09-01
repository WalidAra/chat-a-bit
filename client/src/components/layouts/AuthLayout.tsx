import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
      <div className="hidden bg-muted lg:block h-screen p-6">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="h-full w-full object-cover aspect-auto dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </main>
  );
};

export default AuthLayout;
