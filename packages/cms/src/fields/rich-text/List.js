import React from "react";
import ListItem from "fields/template/List";

const List = ({ id, name, validations }) => {
  let header = name;
  if (validations?.required) {
    header += " *";
  }
  return (
    <ListItem
      id={id}
      text="Rich Text"
      header={header}
      icon="cil-short-text"
      iconClass="text-white bg-success"
    />
  );
};

export default List;
