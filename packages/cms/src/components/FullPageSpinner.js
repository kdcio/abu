import React from "react";
import { CSpinner } from "@coreui/react";

const FullPageSpinner = () => (
  <div className="container h-100 w-100 d-flex align-items-center justify-content-center">
    <CSpinner color="primary" />
  </div>
);

export default FullPageSpinner;
