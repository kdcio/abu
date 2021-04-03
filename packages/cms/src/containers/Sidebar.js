import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";

import CIcon from "@coreui/icons-react";
import { useAuth } from "context/auth";
import { useList } from "context/models";
import { useSidebar } from "context/sidebar";
import { GRP_EDITOR, GRP_ADMIN } from "../constants";

// sidebar nav config
import settingsNav from "./_settingsNav";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { list } = useList();
  const { sidebarShow, setSidebarShow } = useSidebar();
  const [navs, setNavs] = useState([]);
  const group = user?.groups?.[0] || GRP_EDITOR;

  useEffect(() => {
    const contentNav = () =>
      list.map((model) => ({
        _tag: "CSidebarNavItem",
        name: model.name,
        to: `/content/${model.id}`,
        icon: (
          <CIcon
            name={model.collection ? "cil-library" : "cil-file"}
            customClasses="c-sidebar-nav-icon"
          />
        ),
        groups: [GRP_ADMIN, GRP_EDITOR],
      }));

    const _nav = location.pathname.match(/^\/((?!system)[^]+)/)
      ? contentNav()
      : settingsNav;
    setNavs(_nav.filter((n) => n.groups.includes(group)));
  }, [location, group, list]);

  return (
    <CSidebar show={sidebarShow} onShowChange={(val) => setSidebarShow(val)}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon className="c-sidebar-brand-full" name="logo" height={32} />
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
