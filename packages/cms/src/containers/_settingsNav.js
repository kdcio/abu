import { GRP_ADMIN } from "../constants";

const navigation = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["System"],
    groups: [GRP_ADMIN],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Models",
    to: "/system/models",
    exact: false,
    icon: "cil-puzzle",
    groups: [GRP_ADMIN],
  },
  {
    _tag: "CSidebarNavItem",
    name: "API Access",
    to: "/system/api_access",
    exact: false,
    icon: "cil-applications",
    groups: [GRP_ADMIN],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/system/users",
    exact: false,
    icon: "cil-user",
    groups: [GRP_ADMIN],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Reset",
    to: "/system/reset",
    exact: true,
    icon: "cil-reload",
    groups: [GRP_ADMIN],
  },
];

export default navigation;
