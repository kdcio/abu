import React from "react";
import { GRP_ADMIN, GRP_EDITOR } from "./constants";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const UsersList = React.lazy(() => import("./pages/system/Users"));
const UsersForm = React.lazy(() => import("./pages/system/Users/Form"));
const UsersAdd = React.lazy(() => import("./pages/system/Users/Add"));
const Models = React.lazy(() => import("./pages/system/Models"));
const ApiAccess = React.lazy(() => import("./pages/system/ApiAccess"));
const ApiAccessForm = React.lazy(() => import("./pages/system/ApiAccess/Form"));
const Content = React.lazy(() => import("./pages/Content"));
const ContentForm = React.lazy(() => import("./pages/Content/Collection/Form"));

const routes = [
  {
    path: "/",
    name: "Home",
    exact: true,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    exact: true,
    component: Dashboard,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    path: "/content",
    name: "Content",
    exact: true,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    path: "/content/:id/:action/:cid?",
    component: ContentForm,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    path: "/content/:id",
    component: Content,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    path: "/system",
    name: "System",
    exact: true,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/users",
    name: "Users",
    exact: true,
    component: UsersList,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/users/add",
    name: "Add",
    exact: true,
    component: UsersAdd,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/users/edit/:id",
    name: "Edit",
    exact: true,
    component: UsersForm,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/models/:id?",
    name: "Models",
    component: Models,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/api_access/add",
    name: "Add",
    component: ApiAccessForm,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/api_access/edit/:id",
    name: "Edit",
    exact: true,
    component: ApiAccessForm,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/api_access",
    name: "API Access",
    exact: true,
    component: ApiAccess,
    groups: [GRP_ADMIN],
  },
];

export default routes;
