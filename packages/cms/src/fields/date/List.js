import React from "react";
import ListItem from "components/system/ListItem";

const List = ({ id, name, validations }) => {
  let header = name;
  if (validations?.required) {
    header += " *";
  }
  return (
    <ListItem
      id={id}
      text="Date"
      header={header}
      icon="cil-calendar"
      iconClass="text-white bg-primary"
    />
  );
};

export default List;
