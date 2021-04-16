import React from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import "scss/components/button.scss";

const Save = ({
  isDirty,
  isSubmitting,
  isRetrieving = false,
  className = "",
}) => (
  <CButton
    type="submit"
    id="add"
    size="sm"
    color="primary"
    className={`abu-btn ${className}`}
    disabled={!isDirty || isSubmitting || isRetrieving}
    title="Save"
  >
    <CIcon name="cil-save" className="mr-2" />
    {isRetrieving ? "Retrieving..." : isSubmitting ? "Saving..." : "Save"}
  </CButton>
);

export default Save;
