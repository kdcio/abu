import React from "react";
import { CCard, CCardBody, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import "scss/components/field-list-item.scss";

const ListItem = ({ icon, iconClass, header, text, id }) => {
  return (
    <CCard className="field-list-item">
      <CCardBody className="p-3">
        <div className={`model-drag mr-3 p-3 ${iconClass ? iconClass : ""}`}>
          <CIcon width={24} name={icon} />
        </div>
        <div className="item-data">
          <div>
            <span className="text-value text-primary mr-2">{header}</span>
            <span>{id}</span>
          </div>
          <div className="text-muted text-uppercase font-weight-bold small">
            {text}
          </div>
        </div>
        <CButton className="ml-3" type="button" color="info">
          Edit
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default ListItem;
