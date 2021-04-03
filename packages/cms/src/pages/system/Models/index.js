import React from "react";

import { ModalProvider } from "context/modal";
import { SelectProvider } from "context/select";
import Models from "./Models";

import "scss/components/models.scss";

const Index = () => {
  return (
    <ModalProvider>
      <SelectProvider>
        <Models />
      </SelectProvider>
    </ModalProvider>
  );
};

export default Index;
