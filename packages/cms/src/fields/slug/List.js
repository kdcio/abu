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
      text="Slug"
      header={header}
      icon="cil-link"
      iconClass="text-white bg-warning"
    />
  );
};

export default List;
