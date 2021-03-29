import React from "react";
import { GRP_ADMIN, GRP_EDITOR } from "./constants";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Users = React.lazy(() => import("./pages/system/Users"));
const SysContent = React.lazy(() => import("./pages/system/Content"));
const Apps = React.lazy(() => import("./pages/system/Apps"));
const Content = React.lazy(() => import("./pages/Content"));

const routes = [
  {
    path: "/",
    exact: true,
    component: Dashboard,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    path: "/system/users",
    component: Users,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/content",
    component: SysContent,
    groups: [GRP_ADMIN],
  },
  { path: "/system/apps", component: Apps, groups: [GRP_ADMIN] },
  {
    path: "/content",
    component: Content,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
];

export default routes;
