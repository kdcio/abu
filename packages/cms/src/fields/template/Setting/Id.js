import React from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext, useFormState } from "react-hook-form";

const Id = ({ data }) => {
  const { register, control } = useFormContext();
  const { errors, isSubmitting } = useFormState({ control });
  return (
    <CFormGroup>
      <CLabel htmlFor="id">Field ID</CLabel>
      <input
        type="text"
        className={`form-control form-control-lg ${errors.id && "is-invalid"}`}
        id="id"
        {...register("id", { required: true })}
        placeholder="title"
        disabled={isSubmitting}
        readOnly={!!data.id}
      />
      <small className="form-text text-muted">
        This will be automatically generated based on name and will be used in
        API endpoints. This needs to be unique in the model.{" "}
        <strong>This cannot be changed later.</strong>
      </small>
      {errors.id && <div className="invalid-feedback">Please provide id.</div>}
    </CFormGroup>
  );
};

export default Id;
