import React from "react";
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
import CIcon from "@coreui/icons-react";

const Form = () => {
  return (
    <CCard>
      <CCardHeader>
        <h3>User</h3>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="first-name">First Name</CLabel>
                <CInput
                  id="first-name"
                  placeholder="Enter your first name"
                  required
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="last-name">Last Name</CLabel>
                <CInput
                  id="last-name"
                  placeholder="Enter your Last name"
                  required
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="group">Group</CLabel>
                <CSelect custom name="group" id="group">
                  <option value="editor">editor</option>
                  <option value="admin">admin</option>
                </CSelect>
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
