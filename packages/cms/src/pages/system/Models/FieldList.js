import React, { useEffect } from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useList } from "context/list";

const FieldList = () => {
  const { list, setList } = useList();
  useEffect(() => {
    const getFiels = async () => {
      const fields = [];
      setList(fields);
    };
    getFiels();
  }, [setList]);

  console.log("fieldlist", list);
  if (list.length === 0) {
    return (
      <div className="text-center">
        <h3>Add fields to this model!</h3>
        <p>
          Fields are columns in your spreadsheets. They define the data type in
          your model.
        </p>
        <CButton type="button" id="addField" color="primary">
          <CIcon name="cil-plus" />
          Add Field
        </CButton>
      </div>
    );
  }
  return <div>FieldList</div>;
};

export default FieldList;
