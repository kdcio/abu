import React, { useEffect } from "react";
import { CRow, CCol } from "@coreui/react";
import { useSelect } from "context/select";

import DateField from "fields/date/Select";
import ImageField from "fields/image/Select";
import RichTextField from "fields/rich-text/Select";
import SlugField from "fields/slug/Select";
import TextField from "fields/text/Select";

import Setting from "./Setting";

const Select = () => {
  const { selected, setSelected } = useSelect();

  useEffect(() => {
    setSelected(null);
  }, [setSelected]);

  if (selected) return <Setting type={selected} />;

  return (
    <>
      <h5 className="mb-2">Choose field type</h5>
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

export default Select;
