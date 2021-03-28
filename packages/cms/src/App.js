import React from "react";
import { useAuth } from "context/auth";
import FullPageSpinner from "components/FullPageSpinner";
import "scss/core.scss";

const Auth = React.lazy(() => import("pages/Auth"));
const Main = React.lazy(() => import("pages/Main"));

const App = () => {
  const { loading, user } = useAuth();
  if (loading) return <FullPageSpinner />;
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <Main /> : <Auth />}
    </React.Suspense>
  );
};

export default App;
