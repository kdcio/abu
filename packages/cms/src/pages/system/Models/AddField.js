import React from "react";

import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import { useModal } from "context/modal";
import { useSelect } from "context/select";
import FieldSelector from "components/system/FieldSelector";

const AddField = () => {
  const { modal, setModal } = useModal();
  const { selected } = useSelect();

  let title = "Add field";
  switch (selected) {
    case "date":
      title = "Add date field";
      break;
    case "image":
      title = "Add image field";
      break;
    case "rich-text":
      title = "Add rich text field";
      break;
    case "slug":
      title = "Add slug field";
      break;
    case "text":
      title = "Add text field";
      break;
    default:
      break;
  }

  return (
    <CModal
      show={modal === "addModelField"}
      onClose={() => setModal(false)}
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{modal === "addModelField" && <FieldSelector />}</CModalBody>
    </CModal>
  );
};

export default AddField;
