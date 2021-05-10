import React from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext, useFormState } from "react-hook-form";

const Reference = () => {
  const { register, control } = useFormContext();
  const { errors, isSubmitting } = useFormState({ control });
  return (
    <CFormGroup>
      <CLabel htmlFor="reference">Reference field</CLabel>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.reference && "is-invalid"
        }`}
        id="reference"
        {...register("reference", { required: true })}
        placeholder=""
        disabled={isSubmitting}
      />
      <small className="form-text text-muted">
        Make sure you've added the referenced field before adding this.
      </small>
      {errors.reference && (
        <div className="invalid-feedback">{errors.reference.message}</div>
      )}
    </CFormGroup>
  );
};

export default Reference;
