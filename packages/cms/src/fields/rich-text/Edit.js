import React, { useEffect } from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext } from "react-hook-form";
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
    watch,
  } = useFormContext();

  const value = watch(id, "");
  useEffect(() => {
    data?.data?.[id] && setValue(id, data.data[id]);
  }, [model.id, id, data, setValue]);

  useEffect(() => {
    register({ name: id });
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
          setValue(id, content);
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
