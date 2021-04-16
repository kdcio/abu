import React, { useState, useEffect } from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ReactSortable } from "react-sortablejs";
import { useModels } from "context/models";
import { useModal } from "context/modal";
import ViewModelField from "./ViewModelField";

import update from "api/update";

const ListModelFields = () => {
  const { selected: model, dispatch } = useModels();
  const { setModal } = useModal();
  const [fields, setFields] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const updateModel = async (fields) => {
    if (!isSorting) return;
    setFields([...fields]);
    await update({
      apiName: "Model",
      id: model.id,
      data: { fields: [...fields] },
    });
    dispatch({
      type: "UPDATE_SELECTED",
      payload: { ...model, fields: [...fields] },
    });
    setIsSorting(false);
  };

  useEffect(() => {
    if (model?.fields) setFields(model.fields);
    else setFields([]);
  }, [model, setFields]);

  if (fields.length === 0) {
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
    <>
      <ReactSortable
        list={fields}
        handle=".model-drag"
        onUpdate={() => setIsSorting(true)}
        setList={updateModel}
      >
        {fields.map((f) => (
          <ViewModelField key={f.id} {...f} />
        ))}
      </ReactSortable>
      <p className="small">You can reorder the fields by dragging the icons.</p>
    </>
  );
};

export default ListModelFields;
