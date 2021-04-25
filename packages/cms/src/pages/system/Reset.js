import React from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CFormGroup,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { ReactComponent as DangerImg } from "assets/svg/danger.svg";
import Save from "components/Save";
import Cancel from "components/Cancel";

import "scss/components/dashboard.scss";

import remove from "api/remove";

const Reset = () => {
  const history = useHistory();
  const { register, handleSubmit, control } = useForm();
  const { errors, isDirty, isSubmitting } = useFormState({ control });

  const onSubmit = async () => {
    await remove({ apiName: "Reset", id: "" });
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <CCard>
        <CCardHeader>
          <h3 id="formTitle" className="mb-0">
            System Reset
          </h3>
        </CCardHeader>
        <CCardBody className="dashboard">
          <DangerImg className="team-img my-4" />
          <h3 className="mb-4">Permanently delete all data?</h3>
          <CFormGroup>
            <input
              type="text"
              className={`form-control ${errors.permanent && "is-invalid"}`}
              id="permanent"
              {...register("permanent", {
                required: true,
                validate: (val) => val === "permanently delete all my data",
              })}
              placeholder=""
            />
            {errors.permanent && (
              <div className="invalid-feedback">
                Please type <strong>permanently delete all my data</strong>{" "}
                above
              </div>
            )}
            <small className="form-text text-muted">
              To confirm deletion, type{" "}
              <strong>permanently delete all my data</strong> in the text input
              field above.
            </small>
          </CFormGroup>
        </CCardBody>
        <CCardFooter>
          <Save
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            className="mr-2"
            icon="cil-reload"
            title="Reset"
            isSubmittingTitle="Resetting..."
          />
          <Cancel isSubmitting={isSubmitting} url="/" />
        </CCardFooter>
      </CCard>
    </form>
  );
};

export default Reset;
