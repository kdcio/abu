import React from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import "scss/components/button.scss";

const Add = ({ isDirty, isSubmitting, className = "" }) => (
  <CButton
    type="submit"
    id="add"
    size="sm"
    color="primary"
    className={`abu-btn ${className}`}
    disabled={!isDirty || isSubmitting}
    title="Add"
  >
    <CIcon name="cil-save" className="mr-2" />
    {isSubmitting ? "Adding..." : "Add"}
  </CButton>
);

export default Add;
