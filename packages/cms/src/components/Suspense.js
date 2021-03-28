import React from "react";
import Spinner from "./Spinner";

const Suspense = ({ Component, ...props }) => (
  <React.Suspense fallback={<Spinner />}>
    <Component {...props} />
  </React.Suspense>
);

export default Suspense;
