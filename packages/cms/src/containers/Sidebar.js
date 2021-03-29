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

// sidebar nav config
import navigation from "./navigation";

const Sidebar = () => {
  // const dispatch = useDispatch();
  // const show = useSelector((state) => state.sidebarShow);

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
          items={navigation}
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
