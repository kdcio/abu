import React from "react";
import { CButton } from "@coreui/react";
import { useFormContext, useFormState } from "react-hook-form";

const Submit = ({ data }) => {
  const { control } = useFormContext();
  const { isDirty, isSubmitting } = useFormState({ control });

  let btnLabel = data.id ? "Update" : "Add";
  if (isSubmitting) btnLabel = data.id ? "Updating..." : "Adding...";

  return (
    <CButton
      type="submit"
      color="success"
      block
      className="mt-4"
      disabled={!isDirty || isSubmitting}
    >
      {btnLabel}
    </CButton>
  );
};

export default Submit;
