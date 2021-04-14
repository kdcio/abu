import React, { useEffect } from "react";
import { CFormGroup, CLabel, CSwitch, CButton } from "@coreui/react";
import { useForm } from "react-hook-form";
import snakeCase from "lodash.snakecase";

const Setting = ({ processing, update, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const { ref: reqRef, ...reqRest } = register("required");

  const name = watch("name");
  useEffect(() => {
    setValue("id", snakeCase(name));
  }, [name, setValue]);

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
          disabled={processing}
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
          disabled={processing}
        />
        <small className="form-text text-muted">
          This will be automatically generated based on name and will be used in
          API endpoints. This needs to be unique in the model.
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
          disabled={processing}
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
          disabled={processing}
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
          defaultChecked
          {...reqRest}
          innerRef={reqRef}
        />
        <div className="ml-2 required-info">
          <span>Required</span>
        </div>
      </div>
      <CButton type="submit" color="success" block className="mt-4">
        Add field
      </CButton>
    </form>
  );
};

export default Setting;
