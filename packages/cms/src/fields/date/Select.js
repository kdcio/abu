import React from "react";
import SelectItem from "fields/template/Select";

const Select = () => {
  return (
    <SelectItem
      id="date"
      text="Event date"
      header="Date"
      icon="cil-calendar"
      iconClass="text-white bg-primary"
    />
  );
};

export default Select;
