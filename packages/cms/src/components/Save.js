import React from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import "scss/components/button.scss";

const Save = ({
  isDirty,
  isSubmitting,
  isRetrieving = false,
  className = "",
  title = "Save",
  isSubmittingTitle = "Saving...",
  icon = "cil-save",
}) => (
  <CButton
    type="submit"
    id="save"
    size="sm"
    color="primary"
    className={`abu-btn ${className}`}
    disabled={!isDirty || isSubmitting || isRetrieving}
    title={title}
  >
    <CIcon name={icon} className="mr-2" />
    {isRetrieving ? "Retrieving..." : isSubmitting ? isSubmittingTitle : title}
  </CButton>
);

export default Save;
