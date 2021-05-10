import React from "react";
import SelectItem from "fields/template/Select";

const Select = () => {
  return (
    <SelectItem
      id="rich-text"
      text="Multi-line text with formatting"
      header="Rich Text"
      icon="cil-short-text"
      iconClass="text-white bg-success"
    />
  );
};

export default Select;
