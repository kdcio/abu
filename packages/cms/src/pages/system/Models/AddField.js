import React from "react";

import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import { useModal } from "context/modal";
import { SelectProvider } from "context/select";
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
        <CModalTitle>Add field</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <SelectProvider>
          {modal === "addModelField" && <FieldSelector />}
        </SelectProvider>
      </CModalBody>
    </CModal>
  );
};

export default AddField;
