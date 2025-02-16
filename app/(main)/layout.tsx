import React from "react";

import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto mt-32">{children}</div>;
};

export default MainLayout;
