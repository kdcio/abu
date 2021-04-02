import React from "react";
import SelectorItem from "components/system/SelectorItem";

const Select = () => {
  return (
    <SelectorItem
      id="date"
      text="Event date"
      header="Date"
      icon="cil-calendar"
      iconClass="text-white bg-primary"
    />
  );
};

export default Select;
