import React, { useEffect } from "react";
import { CFormGroup, CLabel, CSwitch, CButton } from "@coreui/react";
import { useForm, useFormState } from "react-hook-form";
import snakeCase from "lodash.snakecase";

const Setting = ({ update, error, ...data }) => {
  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      required: data?.validations?.required,
      default: data.default,
      help: data.help,
    },
  });
  const { errors, isDirty, isSubmitting } = useFormState({ control });
  const { ref: reqRef, ...reqRest } = register("required");

  const name = watch("name");
  useEffect(() => {
    if (data?.id) return;
    setValue("id", snakeCase(name));
  }, [name, setValue, data]);

  const onSubmit = async (data) => {
    const field = {
      type: "text",
      id: data.id,
      name: data.name,
      validations: {
        required: data.required,
      },
      default: data.default,
      help: data.help,
    };
    update(field);
  };

  let btnLabel = data.id ? "Update" : "Add";
  if (isSubmitting) btnLabel = data.id ? "Updating..." : "Adding...";

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {error && <div className="text-danger font-weight-bold">{error}</div>}
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
      <CFormGroup>
        <CLabel htmlFor="id">Field ID</CLabel>
        <input
          type="text"
          className={`form-control form-control-lg ${
            errors.id && "is-invalid"
          }`}
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
        {errors.id && (
          <div className="invalid-feedback">Please provide id.</div>
        )}
      </CFormGroup>
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
      <div className="d-flex">
        <CSwitch
          id="required"
          name="required"
          className={"mx-1"}
          shape={"pill"}
          color={"primary"}
          {...reqRest}
          innerRef={reqRef}
        />
        <div className="ml-2 required-info">
          <span>Required</span>
        </div>
      </div>
      <CButton
        type="submit"
        color="success"
        block
        className="mt-4"
        disabled={!isDirty || isSubmitting}
      >
        {btnLabel}
      </CButton>
    </form>
  );
};

export default Setting;
