import React from "react";
import CIcon from "@coreui/icons-react";
import { GRP_ADMIN, GRP_EDITOR } from "../constants";

const navigation = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Content"],
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sample",
    to: "/content/sample",
    icon: "cil-notes",
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["System"],
    groups: [GRP_ADMIN],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Content",
    to: "/system/content",
    icon: "cil-pencil",
    groups: [GRP_ADMIN],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Apps",
    to: "/system/apps",
    icon: "cil-applications",
    groups: [GRP_ADMIN],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/system/users",
    icon: "cil-user",
    groups: [GRP_ADMIN],
  },
];

export default navigation;
