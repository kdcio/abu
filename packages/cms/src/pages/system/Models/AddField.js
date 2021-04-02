import React from "react";

import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import { useModal } from "context/modal";
import FieldSelector from "components/system/FieldSelector";

const AddField = () => {
  const { modal, setModal } = useModal();

  return (
    <CModal
      show={modal === "addModelField"}
      onClose={() => setModal(false)}
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>
        <CModalTitle>Choose field type</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <FieldSelector />
      </CModalBody>
    </CModal>
  );
};

export default AddField;
