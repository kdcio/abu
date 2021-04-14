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
import { useForm, useFormState } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "context/auth";

const SignIn = () => {
  const history = useHistory();
  const { login } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const { errors, isDirty, isSubmitting } = useFormState({ control });
  const [error, setError] = useState(null);

  const { ref: emailRef, ...emailRest } = register("email", {
    required: true,
  });
  const { ref: pwdRef, ...pwdRest } = register("password", {
    required: true,
    pattern: /(?=.*\d)(?=.*[A-Z]).{6,}/,
  });

  const doSignIn = async (data) => {
    try {
      const { email, password } = data;
      const res = await login(email, password);
      if (res === "NEW_PASSWORD_REQUIRED") {
        history.push("/new-password");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(doSignIn)}>
                    <h1 id="login-title">Login</h1>
                    <p className="text-muted">Sign In to your account</p>
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
                        placeholder="Email"
                        autoComplete="Email"
                        type="email"
                        id="email"
                        aria-describedby="emailHelp"
                        className={errors.email && "is-invalid"}
                        {...emailRest}
                        innerRef={emailRef}
                      />
                      {errors.emailRef && (
                        <div className="invalid-feedback">
                          Please provide email
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
                        placeholder="Password"
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
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          type="submit"
                          id="login"
                          color="primary"
                          className="px-4"
                          disabled={!isDirty || isSubmitting}
                        >
                          {isSubmitting ? "Loging in..." : "Login"}
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
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

export default SignIn;
