import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import FieldEdit from "components/FieldEdit";
import { useModels } from "context/models";

const Single = () => {
  const { selected: model } = useModels();

  return (
    <CCard>
      <CCardHeader>
        <h3 id="singleTitle" className="mb-0">
          Editing {model.name}
        </h3>
      </CCardHeader>
      <CCardBody>
        {model?.fields?.map((field) => (
          <FieldEdit {...field} />
        ))}
      </CCardBody>
    </CCard>
  );
};

export default Single;
