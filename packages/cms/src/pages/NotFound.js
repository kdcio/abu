import React from "react";
import { CCol, CContainer, CRow } from "@coreui/react";

const NotFound = () => {
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="6">
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">404</h1>
            <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
            <p className="text-muted float-left">
              The page you are looking for was not found.
            </p>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default NotFound;
