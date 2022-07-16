import React from "react";
import Header from "./Header";
import Notify from "./Notify";

function Layout({ children }) {
  return (
    <div className="text-gray-700 font-body">
      <Header />
      <Notify />
      {children}
    </div>
  );
}

export default Layout;
