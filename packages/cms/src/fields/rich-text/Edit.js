import React, { useEffect } from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext, useWatch } from "react-hook-form";
import ReactQuill from "react-quill";
import { useModels } from "context/models";
import { useData } from "context/data";

import "react-quill/dist/quill.snow.css";
import "scss/components/quill.scss";

// TODO: Fina a way to validate
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
    defaultValue: "", // default value before the render
  });

  useEffect(() => {
    data?.data?.[id] && setValue(id, data.data[id] || "");
  }, [model.id, id, data, setValue]);

  useEffect(() => {
    register(id);
  }, [id, register]);

  return (
    <CFormGroup>
      <CLabel htmlFor="name">
        {name} {validations?.required && "*"}
      </CLabel>
      <ReactQuill
        theme="snow"
        id={id}
        name={id}
        value={value}
        onChange={(content) => {
          setValue(id, content, { shouldDirty: true });
        }}
      />
      {errors[id] && (
        <div className="invalid-feedback">This field is required.</div>
      )}
      {help && <small className="form-text text-muted">{help}</small>}
    </CFormGroup>
  );
};

export default Edit;
