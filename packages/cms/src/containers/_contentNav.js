import React from "react";
import CIcon from "@coreui/icons-react";
import { GRP_ADMIN, GRP_EDITOR } from "../constants";

const navigation = [
  {
    _tag: "CSidebarNavItem",
    name: "Home",
    to: "/content/home",
    icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon" />,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Blogs",
    to: "/content/blogs",
    icon: <CIcon name="cil-library" customClasses="c-sidebar-nav-icon" />,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Social Profiles",
    to: "/content/social-profiles",
    icon: <CIcon name="cil-library" customClasses="c-sidebar-nav-icon" />,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    _tag: "CSidebarNavItem",
    name: "About",
    to: "/content/about",
    icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon" />,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
];

export default navigation;
