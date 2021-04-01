import React, { useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";
import { useParams } from "react-router-dom";
import CIcon from "@coreui/icons-react";

import get from "api/get";

const Form = () => {
  const { id } = useParams();
  useEffect(() => {
    const getUser = async () => {
      const user = await get({ apiName: "Users", id });
      console.log(user);
    };
    getUser();
  }, [id]);

  return (
    <CCard>
      <CCardHeader>
        <h3>User</h3>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="first-name">First Name</CLabel>
                <CInput
                  id="first-name"
                  placeholder="Enter your first name"
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="last-name">Last Name</CLabel>
                <CInput
                  id="last-name"
                  placeholder="Enter your Last name"
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="group">Group</CLabel>
                <CSelect custom name="group" id="group">
                  <option value="editor">editor</option>
                  <option value="admin">admin</option>
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="new-password">New Password</CLabel>
                <CInput id="new-password" type="password" required />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="confirm-password">Confirm New Password</CLabel>
                <CInput id="confirm-password" type="password" required />
              </CFormGroup>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" size="sm" color="primary" className="mr-2">
          <CIcon name="cil-scrubber" /> Submit
        </CButton>
        <CButton type="button" size="sm" color="danger">
          <CIcon name="cil-ban" /> Cancel
        </CButton>
      </CCardFooter>
    </CCard>
  );
};

export default Form;
