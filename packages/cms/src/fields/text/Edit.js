import React, { useEffect, useState } from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext } from "react-hook-form";
import { useData } from "context/data";

const Edit = ({ name, id, validations, help, default: defaultValue }) => {
  const { data } = useData();
  const { register, errors, formState } = useFormContext();
  const { isSubmitting } = formState;
  const [initial, setInitial] = useState(defaultValue);

  useEffect(() => {
    data?.data?.[id] && setInitial(data.data[id]);
  }, [id, data, setInitial]);

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
