import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Notify from "./Notify";
import Services from "./Services";

function Layout({ children }) {
  return (
    <div className="text-gray-700 font-body">
      <Header />
      <Notify />
      {children}
      <div className="bg-gray-100 md:px-20 px-5 mt-10 py-10">
        <Services />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
