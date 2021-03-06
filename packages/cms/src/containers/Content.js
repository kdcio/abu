import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import { useAuth } from "context/auth";
import { GRP_EDITOR } from "../constants";

import "scss/components/content.scss";

// routes config
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Content = () => {
  const { user } = useAuth();
  const group = user?.groups?.[0] || GRP_EDITOR;
  return (
    <main className="c-main d-flex">
      <CContainer fluid className="d-flex">
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
            <Redirect from="/system" to="/system/models" exact={true} />
            <Redirect from="/content" to="/dashboard" exact={true} />
            <Redirect from="/" to="/dashboard" exact={true} />
            <Redirect from="*" to="/not-found" exact={true} />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(Content);
