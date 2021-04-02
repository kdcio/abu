import React from "react";

import { CRow, CCol } from "@coreui/react";
import { useModal } from "context/modal";
import List from "./List";
import Form from "./Fields";
import Add from "./Add";
import AddField from "./AddField";

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
          <Form />
        </CCol>
      </CRow>
      {modal === "addModel" && <Add />}
      {modal === "addModelField" && <AddField />}
    </>
  );
};

export default Models;
