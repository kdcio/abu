import React from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";

import "scss/components/button.scss";

const Cancel = ({ isSubmitting, url }) => {
  const history = useHistory();
  return (
    <CButton
      type="button"
      id="cancel"
      size="sm"
      color="dark"
      variant="outline"
      className="abu-btn"
      disabled={isSubmitting}
      onClick={() => history.push(url)}
      title="Cancel"
    >
      <CIcon name="cil-ban" className="mr-2" /> Cancel
    </CButton>
  );
};

export default Cancel;
