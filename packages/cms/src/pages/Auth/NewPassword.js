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
import { useHistory } from "react-router-dom";
import { useAuth } from "context/auth";

const NewPassword = () => {
  const history = useHistory();
  const { newPassword } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const doNewPassword = async () => {
    try {
      if (password === "") {
        throw new Error("Passwords cannot be blank");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords does not match");
      }

      await newPassword(password, firstName, lastName);
      history.push("/");
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
                  <CForm>
                    <h1>Change Password</h1>
                    <p className="text-muted">Complete account creation</p>
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
                        placeholder="First name"
                        autoComplete="first-name"
                        type="text"
                        className="form-control"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
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
                        className="form-control"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
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
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern="(?=.*\d)(?=.*[A-Z]).{6,}"
                        title="Must contain at least one number and one uppercase letter, and at least 6 or more characters"
                        required
                      />
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
                        className="form-control"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        pattern="(?=.*\d)(?=.*[A-Z]).{6,}"
                        title="Must contain at least one number and one uppercase letter, and at least 6 or more characters"
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={doNewPassword}
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
