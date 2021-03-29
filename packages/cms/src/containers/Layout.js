import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="c-app c-default-layout">
      <Router>
        <Sidebar />
        <div className="c-wrapper">
          <Header />
          <div className="c-body">
            <Content />
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default Layout;
