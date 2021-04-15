import React from "react";
import SelectorItem from "components/system/SelectItem";

const Select = () => {
  return (
    <SelectorItem
      id="text"
      text="Single line text"
      header="Text"
      icon="cil-text"
      iconClass="text-white bg-success"
    />
  );
};

export default Select;
