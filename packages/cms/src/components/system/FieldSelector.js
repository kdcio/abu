import React from "react";
import { CRow, CCol } from "@coreui/react";

import DateField from "fields/date/Select";
import ImageField from "fields/image/Select";
import RichTextField from "fields/rich-text/Select";
import SlugField from "fields/slug/Select";
import TextField from "fields/text/Select";

const FieldSelector = () => {
  return (
    <>
      <CRow>
        <CCol>
          <TextField />
        </CCol>
        <CCol>
          <RichTextField />
        </CCol>
        <CCol>
          <DateField />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <SlugField />
        </CCol>
        <CCol>
          <ImageField />
        </CCol>
        <CCol></CCol>
      </CRow>
    </>
  );
};

export default FieldSelector;
