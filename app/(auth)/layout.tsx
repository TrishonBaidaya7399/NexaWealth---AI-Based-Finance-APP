"use client";
import React from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container w-full pt-12 pb-12 flex justify-center mx-auto">
      {children}
    </div>
  );
}

export default AuthLayout;
