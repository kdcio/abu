import React, { useState, useEffect } from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useList } from "context/list";
import { useModal } from "context/modal";
import FieldInList from "components/system/FieldInList";

const FieldList = () => {
  const { selected } = useList();
  const { setModal } = useModal();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (selected?.fields) setList(selected.fields);
  }, [selected, setList]);

  if (list.length === 0) {
    return (
      <div className="text-center">
        <h3>Add fields to this model!</h3>
        <p>
          Fields are columns in your spreadsheets. They define the data type in
          your model.
        </p>
        <CButton
          type="button"
          id="addField"
          color="primary"
          onClick={() => setModal("addModelField")}
        >
          <CIcon name="cil-plus" />
          Add Field
        </CButton>
      </div>
    );
  }
  return (
    <div>
      {list.map((f) => (
        <FieldInList key={f.id} {...f} />
      ))}
    </div>
  );
};

export default FieldList;