import React from "react";
import SelectItem from "fields/template/Select";

const Select = () => {
  return (
    <SelectItem
      id="slug"
      text="Unique link"
      header="Slug"
      icon="cil-link"
      iconClass="text-white bg-warning"
    />
  );
};

export default Select;
