import React from "react";
import ListItem from "fields/template/ListI";

const List = ({ id, name, validations }) => {
  let header = name;
  if (validations?.required) {
    header += " *";
  }
  return (
    <ListItem
      id={id}
      text="Text"
      header={header}
      icon="cil-text"
      iconClass="text-white bg-success"
    />
  );
};

export default List;
