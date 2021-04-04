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
    exact: true,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    groups: [GRP_ADMIN, GRP_EDITOR],
  },
  {
    path: "/system",
    exact: true,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/users",
    exact: true,
    component: UsersList,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/users/add",
    exact: true,
    component: UsersAdd,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/users/edit/:id",
    exact: true,
    component: UsersForm,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/models/:id?",
    component: Models,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/api_access/:action/:id?",
    component: ApiAccessForm,
    groups: [GRP_ADMIN],
  },
  {
    path: "/system/api_access",
    component: ApiAccess,
    groups: [GRP_ADMIN],
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
];

export default routes;
