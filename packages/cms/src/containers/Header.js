import React, { useState, useEffect } from "react";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CBreadcrumbRouter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSidebar } from "context/sidebar";
import { useModels } from "context/models";

import HeaderDropdown from "./HeaderDropdown";

import routes from "../routes";

const Header = () => {
  const { sidebarShow, setSidebarShow } = useSidebar();
  const { list } = useModels();
  const [allRoutes, setAllRoutes] = useState([...routes]);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    setSidebarShow(val);
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    setSidebarShow(val);
  };

  useEffect(() => {
    const contentRoutes = () =>
      list.reduce(
        (acc, model) => [
          ...acc,
          {
            path: `/content/${model.id}/add`,
            name: "Add",
            exact: true,
          },
          {
            path: `/content/${model.id}/edit/:id`,
            name: "Edit",
            exact: true,
          },
          {
            path: `/content/${model.id}`,
            name: model.name,
            exact: true,
          },
        ],
        []
      );
    setAllRoutes([...contentRoutes(), ...routes]);
  }, [list]);

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="cil-heart" height="16" alt="Logo" className="pr-1" />
        AbuCMS
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={allRoutes}
        />
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <HeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;
