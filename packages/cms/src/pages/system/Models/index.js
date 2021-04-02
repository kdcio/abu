import React from "react";

import { CRow, CCol } from "@coreui/react";
import { ListProvider } from "context/list";
import { ModalProvider } from "context/modal";
import { SelectProvider } from "context/select";
import List from "./List";
import Form from "./Fields";
import Add from "./Add";
import AddField from "./AddField";

import "scss/components/models.scss";

const Models = () => {
  return (
    <ListProvider>
      <ModalProvider>
        <SelectProvider>
          <CRow>
            <CCol sm="4">
              <List />
            </CCol>
            <CCol sm="8">
              <Form />
            </CCol>
          </CRow>
          <Add />
          <AddField />
        </SelectProvider>
      </ModalProvider>
    </ListProvider>
  );
};

export default Models;
