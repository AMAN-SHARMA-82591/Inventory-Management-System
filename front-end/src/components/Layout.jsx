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
      <div className="h-full min-h-screen md:pl-[220px] bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
