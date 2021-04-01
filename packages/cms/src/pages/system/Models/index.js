import React from "react";

import { CRow, CCol } from "@coreui/react";
import { ListProvider } from "context/list";
import List from "./List";
import Form from "./Form";

import "scss/components/models.scss";

const Models = () => {
  return (
    <ListProvider>
      <CRow>
        <CCol sm="4">
          <List />
        </CCol>
        <CCol sm="8">
          <Form />
        </CCol>
      </CRow>
    </ListProvider>
  );
};

export default Models;
