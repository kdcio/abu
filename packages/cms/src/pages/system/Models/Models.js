import React from "react";

import { CRow, CCol } from "@coreui/react";
import { useModal } from "context/modal";
import List from "./ListModels";
import ViewModel from "./ViewModel";
import Add from "./Add";
import AddField from "./Fields/Add";

import "scss/components/models.scss";

const Models = () => {
  const { modal } = useModal();

  return (
    <>
      <CRow>
        <CCol sm="4">
          <List />
        </CCol>
        <CCol sm="8">
          <ViewModel />
        </CCol>
      </CRow>
      {modal === "addModel" && <Add />}
      {modal === "addModelField" && <AddField />}
    </>
  );
};

export default Models;
