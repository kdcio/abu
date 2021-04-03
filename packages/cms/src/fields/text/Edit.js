import React, { useEffect } from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext } from "react-hook-form";
import { useData } from "context/data";

const Edit = ({ name, id, validations, help, default: defaultValue }) => {
  const { data } = useData();
  const { register, errors, formState, setValue } = useFormContext();
  const { isSubmitting } = formState;

  useEffect(() => {
    data?.data?.[id] && setValue(id, data.data[id]);
  }, [id, data, setValue]);

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
        defaultValue={defaultValue || ""}
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
