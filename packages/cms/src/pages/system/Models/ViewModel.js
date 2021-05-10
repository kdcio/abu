import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useModels } from "context/models";
import { useModal } from "context/modal";
import Info from "./Info";
import ListModelFields from "./ListModelFields";

const ViewModel = () => {
  const { selected: model } = useModels();
  const { setModal } = useModal();

  if (!model) return <Info />;

  return (
    <CCard>
      <CCardHeader>
        <span id="listTitle" className="h3">
          {model.name}
        </span>
      </CCardHeader>
      <CCardBody>
        <ListModelFields />
        {model?.fields?.length > 0 && (
          <button
            id="addmodel"
            type="button"
            className="btn btn-success float-right"
            onClick={() => setModal("addModelField")}
          >
            <CIcon name="cil-plus" /> Add another field
          </button>
        )}
      </CCardBody>
    </CCard>
  );
};

export default ViewModel;
