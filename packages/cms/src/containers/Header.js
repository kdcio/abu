import React from "react";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSidebar } from "context/sidebar";

import HeaderDropdown from "./HeaderDropdown";

import "scss/components/header.scss";

const Header = () => {
  const { sidebarShow, setSidebarShow } = useSidebar();

  const toggleSidebar = () => {
    console.log(sidebarShow);
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
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Content</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/system">Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <HeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;
