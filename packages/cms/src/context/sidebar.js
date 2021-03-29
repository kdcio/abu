import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

const useSidebar = () => {
  return useContext(SidebarContext);
};

const SidebarProvider = (props) => {
  const [sidebarShow, setSidebarShow] = useState("responsive");

  return (
    <SidebarContext.Provider
      value={{
        sidebarShow,
        setSidebarShow,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, useSidebar };
