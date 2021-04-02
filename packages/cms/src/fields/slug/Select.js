import React from "react";
import SelectorItem from "components/system/SelectorItem";

const Select = () => {
  return (
    <SelectorItem
      id="slug"
      text="Unique link"
      header="Slug"
      icon="cil-link"
      iconClass="text-white bg-warning"
    />
  );
};

export default Select;
