import React, { useEffect } from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext, useWatch } from "react-hook-form";
import ReactQuill from "react-quill";
import { useModels } from "context/models";
import { useData } from "context/data";

import "react-quill/dist/quill.snow.css";
import "scss/components/quill.scss";

const Edit = ({ name, id, validations, help }) => {
  const { data } = useData();
  const { selected: model } = useModels();
  const {
    register,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();

  const value = useWatch({
    control,
    name: id, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: { html: "", type: "text/html" }, // default value before the render
  });

  useEffect(() => {
    data?.data?.[id] && setValue(id, data.data[id] || {});
  }, [model.id, id, data, setValue]);

  useEffect(() => {
    register(id, { required: validations?.required });
  }, [id, register, validations]);

  return (
    <CFormGroup>
      <CLabel htmlFor="name">
        {name} {validations?.required && "*"}
      </CLabel>
      <ReactQuill
        theme="snow"
        id={id}
        name={id}
        value={value?.html || ""}
        onChange={(content) => {
          setValue(
            id,
            { html: content, type: "text/html" },
            { shouldDirty: true }
          );
        }}
      />
      {errors[id] && (
        <div className="text-danger">
          <small>This field is required.</small>
        </div>
      )}
      {help && <small className="form-text text-muted">{help}</small>}
    </CFormGroup>
  );
};

export default Edit;
