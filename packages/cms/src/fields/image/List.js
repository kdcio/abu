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
      text="Image"
      header={header}
      icon="cil-image1"
      iconClass="text-white bg-info"
    />
  );
};

export default List;
