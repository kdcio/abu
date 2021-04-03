import React from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext } from "react-hook-form";
import { dateFormatInput } from "utils/dateFormat";

const Edit = ({ name, id, validations, help, today }) => {
  const { register, errors, formState } = useFormContext();
  const { isSubmitting } = formState;

  let defaultValue = null;
  if (today) {
    defaultValue = dateFormatInput(new Date());
  }

  return (
    <CFormGroup>
      <CLabel htmlFor="name">
        {name} {validations?.required && "*"}
      </CLabel>
      <input
        type="date"
        className={`form-control ${errors[id] && "is-invalid"}`}
        id={id}
        name={id}
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
