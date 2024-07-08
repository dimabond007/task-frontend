import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen theme-custom bg-background">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
