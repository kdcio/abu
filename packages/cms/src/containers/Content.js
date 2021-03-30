import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import { useAuth } from "context/auth";
import { GRP_EDITOR } from "../constants";

// routes config
import routes from "../routes";

const NotFound = React.lazy(() => import("pages/NotFound"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Content = () => {
  const { user } = useAuth();
  const group = user?.groups?.[0] || GRP_EDITOR;
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component &&
                route.groups.includes(group) && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
            <Route path="*">
              <Suspense fallback={loading}>
                <NotFound />
              </Suspense>
            </Route>
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(Content);
