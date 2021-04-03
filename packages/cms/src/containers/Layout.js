import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { ListProvider } from "context/models";
import { SidebarProvider } from "context/sidebar";

// initialize API
import "api";

const Layout = () => {
  return (
    <div className="c-app c-default-layout">
      <ListProvider>
        <SidebarProvider>
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
        </SidebarProvider>
      </ListProvider>
    </div>
  );
};

export default Layout;
