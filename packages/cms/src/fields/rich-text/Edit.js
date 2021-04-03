import React, { useEffect } from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "scss/components/quill.scss";

const Edit = ({ name, id, validations, help }) => {
  const { register, setValue, errors } = useFormContext();

  useEffect(() => {
    register({ name: id }, { required: validations.required });
  }, [id, register, validations.required]);

  return (
    <CFormGroup>
      <CLabel htmlFor="name">
        {name} {validations?.required && "*"}
      </CLabel>
      <ReactQuill
        theme="snow"
        id={id}
        name={id}
        defaultValue="Please write something"
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
