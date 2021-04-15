import React from "react";
import SelectorItem from "components/system/SelectItem";

const Select = () => {
  return (
    <SelectorItem
      id="rich-text"
      text="Multi-line text with formating"
      header="Rich Text"
      icon="cil-short-text"
      iconClass="text-white bg-success"
    />
  );
};

export default Select;
