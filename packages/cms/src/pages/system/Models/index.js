import React from "react";

import { ListProvider } from "context/list";
import { ModalProvider } from "context/modal";
import { SelectProvider } from "context/select";
import Models from "./Models";

import "scss/components/models.scss";

const Index = () => {
  return (
    <ListProvider>
      <ModalProvider>
        <SelectProvider>
          <Models />
        </SelectProvider>
      </ModalProvider>
    </ListProvider>
  );
};

export default Index;
