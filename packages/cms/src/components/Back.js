import React from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";

const Back = ({ isSubmitting, url }) => {
  const history = useHistory();
  return (
    <CButton
      type="button"
      id="back"
      size="sm"
      color="black"
      variant="outline"
      className="mr-2 float-left"
      disabled={isSubmitting}
      onClick={() => history.push(url)}
      title="Back"
    >
      <CIcon name="cil-chevron-left" />
    </CButton>
  );
};

export default Back;
