import React from "react";
import { useAuth } from "context/auth";
import FullPageSpinner from "components/FullPageSpinner";
import "scss/core.scss";

const Auth = React.lazy(() => import("pages/Auth"));
const Layout = React.lazy(() => import("containers/Layout"));

const App = () => {
  const { loading, user } = useAuth();
  if (loading) return <FullPageSpinner />;
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <Layout /> : <Auth />}
    </React.Suspense>
  );
};

export default App;
