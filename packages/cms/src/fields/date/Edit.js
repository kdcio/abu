import React, { useEffect } from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext } from "react-hook-form";
import { dateFormatInput } from "utils/dateFormat";
import { useData } from "context/data";

const Edit = ({ name, id, validations, help, today }) => {
  const { data } = useData();
  const { register, errors, formState, setValue } = useFormContext();
  const { isSubmitting } = formState;
  const initial = today ? dateFormatInput(new Date()) : null;

  useEffect(() => {
    data?.data?.[id] && setValue(id, data.data[id]);
  }, [id, data, setValue]);

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
        defaultValue={initial}
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
