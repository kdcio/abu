import React from "react";

import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import { useModels } from "context/models";
import { useModal } from "context/modal";
import { useSelect } from "context/select";
import Setting from "./Setting";

const EditField = () => {
  const { getField } = useModels();
  const { modal, setModal } = useModal();
  const { fieldId } = useSelect();
  const field = getField(fieldId);

  let title = "Edit field";
  switch (field.type) {
    case "date":
      title = "Edit date field";
      break;
    case "image":
      title = "Edit image field";
      break;
    case "rich-text":
      title = "Edit rich text field";
      break;
    case "slug":
      title = "Edit slug field";
      break;
    case "text":
      title = "Edit text field";
      break;
    default:
      break;
  }

  return (
    <CModal
      show={modal === "editModelField"}
      onClose={() => setModal(false)}
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {modal === "editModelField" && <Setting {...field} />}
      </CModalBody>
    </CModal>
  );
};

export default EditField;
