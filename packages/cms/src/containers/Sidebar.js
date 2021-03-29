import React from "react";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { useAuth } from "context/auth";
import { GRP_EDITOR } from "../constants";

// sidebar nav config
import navigation from "./_navigation";

const Sidebar = () => {
  const { user } = useAuth();
  const group = user?.groups?.[0] || GRP_EDITOR;
  // const dispatch = useDispatch();
  // const show = useSelector((state) => state.sidebarShow);

  const navs = navigation.filter((n) => n.groups.includes(group));

  return (
    <CSidebar
    // show={show}
    // onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon className="c-sidebar-brand-full" name="cil-heart" height={30} />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="cil-heart"
          height={30}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navs}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(Sidebar);
