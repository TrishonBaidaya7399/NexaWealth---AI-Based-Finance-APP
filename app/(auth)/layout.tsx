"use client";
import React from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container w-screen h-[100vh - 70px] pt-12 flex items-center justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;
