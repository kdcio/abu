import React from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext, useFormState } from "react-hook-form";

const Name = () => {
  const { register, control } = useFormContext();
  const { errors, isSubmitting } = useFormState({ control });
  return (
    <CFormGroup>
      <CLabel htmlFor="name">Name</CLabel>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.name && "is-invalid"
        }`}
        id="name"
        {...register("name", { required: true })}
        placeholder="Title"
        disabled={isSubmitting}
      />
      {errors.name && (
        <div className="invalid-feedback">Please provide name.</div>
      )}
    </CFormGroup>
  );
};

export default Name;
