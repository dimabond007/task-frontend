import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function MainLayout() {
  return (
    <>
      <Header />

      <div className="w-full theme-custom bg-background">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
