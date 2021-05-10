import React from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext, useFormState } from "react-hook-form";

const Help = () => {
  const { register, control } = useFormContext();
  const { errors, isSubmitting } = useFormState({ control });
  return (
    <CFormGroup>
      <CLabel htmlFor="help">Help text</CLabel>
      <input
        type="text"
        className={`form-control form-control-lg ${
          errors.help && "is-invalid"
        }`}
        id="help"
        {...register("help")}
        placeholder=""
        disabled={isSubmitting}
      />
      {errors.help && (
        <div className="invalid-feedback">{errors.help.message}</div>
      )}
    </CFormGroup>
  );
};

export default Help;
