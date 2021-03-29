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

import HeaderDropdown from "./HeaderDropdown";

const Header = () => {
  // const dispatch = useDispatch();
  // const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    // const val = [true, "responsive"].includes(sidebarShow)
    //   ? false
    //   : "responsive";
    // dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    // const val = [false, "responsive"].includes(sidebarShow)
    //   ? true
    //   : "responsive";
    // dispatch({ type: "set", sidebarShow: val });
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
          <CHeaderNavLink to="/">Page Title</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <HeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;
