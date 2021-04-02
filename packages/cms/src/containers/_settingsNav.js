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
    name: "Apps",
    to: "/system/apps",
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
];

export default navigation;
