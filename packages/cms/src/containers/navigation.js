import React from "react";
import CIcon from "@coreui/icons-react";

const navigation = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Content"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sample",
    to: "/content/sample",
    icon: "cil-notes",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["System"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Content",
    to: "/system/content",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Apps",
    to: "/system/apps",
    icon: "cil-applications",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/system/users",
    icon: "cil-user",
  },
];

export default navigation;
