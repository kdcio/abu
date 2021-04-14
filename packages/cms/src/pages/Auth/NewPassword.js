import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "context/auth";

const NewPassword = () => {
  const history = useHistory();
  const { newPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { ref: firstRef, ...firstRest } = register("firstName", {
    required: true,
  });
  const { ref: lastRef, ...lastRest } = register("lastName", {
    required: true,
  });
  const { ref: pwdRef, ...pwdRest } = register("password", {
    required: true,
    pattern: /(?=.*\d)(?=.*[A-Z]).{6,}/,
  });
  const { ref: pwd2Ref, ...pwd2Rest } = register("confirmPassword", {
    required: true,
    validate: (v) => v === getValues("password"),
  });

  const [error, setError] = useState(null);

  const doNewPassword = async (data) => {
    try {
      const { password, firstName, lastName } = data;
      await newPassword(password, firstName, lastName);
      history.push("/");
    } catch (err) {
      setError(err);
    }
  };

  console.log(errors);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(doNewPassword)}>
                    <h1>Account Creation</h1>
                    <p className="text-muted">Complete your account</p>
                    {error && (
                      <p className="text-danger text-center">{error.message}</p>
                    )}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="first-name"
                        placeholder="First name"
                        autoComplete="first-name"
                        type="text"
                        className={errors.firstName && "is-invalid"}
                        {...firstRest}
                        innerRef={firstRef}
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          Please provide first name with at least 2 characters.
                        </div>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        placeholder="Last name"
                        autoComplete="last-name"
                        type="text"
                        className={errors.lastName && "is-invalid"}
                        id="last-name"
                        {...lastRest}
                        innerRef={lastRef}
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">
                          Please provide last name with at least 2 characters.
                        </div>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        placeholder="New Password"
                        autoComplete="current-password"
                        type="password"
                        className={errors.password && "is-invalid"}
                        id="password"
                        {...pwdRest}
                        innerRef={pwdRef}
                      />
                      {errors?.password?.type === "required" && (
                        <div className="invalid-feedback">
                          Please enter a new password
                        </div>
                      )}
                      {errors?.password?.type === "pattern" && (
                        <div className="invalid-feedback">
                          Password must contain at least one number and one
                          uppercase letter, and at least 6 or more characters
                        </div>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        placeholder="Confirm New Password"
                        autoComplete="confirm-password"
                        type="password"
                        className={errors.confirmPassword && "is-invalid"}
                        id="confirm-password"
                        {...pwd2Rest}
                        innerRef={pwd2Ref}
                        title="Must contain at least one number and one uppercase letter, and at least 6 or more characters"
                      />
                      {errors?.confirmPassword?.type === "required" && (
                        <div className="invalid-feedback">
                          Please confirm the new password
                        </div>
                      )}
                      {errors?.confirmPassword?.type === "validate" && (
                        <div className="invalid-feedback">
                          Passwords does not match
                        </div>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          type="submit"
                          id="complete"
                          color="primary"
                          className="px-4"
                        >
                          Complete
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default NewPassword;
