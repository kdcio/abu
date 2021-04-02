import React from "react";
import { CCard, CCardBody } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelect } from "context/select";

import "scss/components/field-selector-item.scss";

const SelectorItem = ({ icon, iconClass, header, text, id }) => {
  const { setSelected } = useSelect();
  return (
    <CCard className="field-selector-item" onClick={() => setSelected(id)}>
      <CCardBody className="p-3">
        <div className={`p-3 mb-2 ${iconClass ? iconClass : ""}`}>
          <CIcon width={24} name={icon} />
        </div>
        <div>
          <span className="text-value text-primary mr-2">{header}</span>
        </div>
        <div className="text-muted font-weight-bold small">{text}</div>
      </CCardBody>
    </CCard>
  );
};

export default SelectorItem;
