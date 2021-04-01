import React from "react";
import { CCard, CCardBody } from "@coreui/react";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <CCard>
      <CCardBody>
        <h1>Models</h1>
        <p>
          Models is a way to define your content structure. You can think of
          each model as a sheet in your spreadsheet program where you define the
          columns in the first row of your spreadsheet.
        </p>
        <p>
          Once you have defined the columns, you can begin{" "}
          <Link to="/">adding content</Link>. In spreadhseet terms, that would
          be equivalent to adding rows in your sheet.
        </p>
      </CCardBody>
    </CCard>
  );
};

export default Info;
