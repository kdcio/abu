import React, { useEffect } from "react";
import {
  CFormGroup,
  CLabel,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
import { useFormContext } from "react-hook-form";
import kebabCase from "utils/kebabCase";
import { useModels } from "context/models";

const Edit = ({ name, id, validations, help, reference }) => {
  const { selected: model } = useModels();
  const { register, errors, formState, watch, setValue } = useFormContext();
  const { isSubmitting } = formState;

  const title = watch(reference);
  useEffect(() => {
    title && setValue(id, kebabCase(title));
  }, [title, id, setValue]);

  return (
    <CFormGroup>
      <CLabel htmlFor="name">
        {name} {validations?.required && "*"}
      </CLabel>
      <CInputGroup>
        <CInputGroupPrepend>
          <CInputGroupText>https://site.com/{model.id}/</CInputGroupText>
        </CInputGroupPrepend>
        <input
          type="text"
          className={`form-control ${errors[id] && "is-invalid"}`}
          id={id}
          name={id}
          placeholder=""
          ref={register({ required: validations.required })}
          disabled={isSubmitting}
        />
      </CInputGroup>

      {errors[id] && (
        <div className="invalid-feedback">This field is required.</div>
      )}
      {help && <small className="form-text text-muted">{help}</small>}
    </CFormGroup>
  );
};

export default Edit;
