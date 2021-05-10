import React from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext, useFormState } from "react-hook-form";

const Default = () => {
  const { register, control } = useFormContext();
  const { errors, isSubmitting } = useFormState({ control });
  return (
    <CFormGroup>
      <CLabel htmlFor="default">Default value</CLabel>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.default && "is-invalid"
        }`}
        id="default"
        {...register("default")}
        placeholder=""
        disabled={isSubmitting}
      />
      {errors.default && (
        <div className="invalid-feedback">{errors.default.message}</div>
      )}
    </CFormGroup>
  );
};

export default Default;
