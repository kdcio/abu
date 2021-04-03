import React from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext } from "react-hook-form";

const Edit = ({ name, id, validations, help, default: defaultValue }) => {
  const { register, errors, formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <CFormGroup>
      <CLabel htmlFor="name">
        {name} {validations?.required && "*"}
      </CLabel>
      <input
        type="text"
        className={`form-control ${errors[id] && "is-invalid"}`}
        id={id}
        name={id}
        placeholder=""
        ref={register({ required: validations.required })}
        defaultValue={defaultValue}
        disabled={isSubmitting}
      />
      {errors[id] && (
        <div className="invalid-feedback">This field is required.</div>
      )}
      {help && <small className="form-text text-muted">{help}</small>}
    </CFormGroup>
  );
};

export default Edit;
