import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function MainLayout() {
  return (
    <>
      <Header />

      <div className="w-full min-h-fit bg-background">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
