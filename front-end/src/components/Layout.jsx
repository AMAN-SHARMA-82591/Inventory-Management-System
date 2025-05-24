import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout() {
  return (
    <>
      <div className="md:h-16">
        <Header />
      </div>
      <SideMenu />
      <div className="h-full md:ml-[220px]">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
