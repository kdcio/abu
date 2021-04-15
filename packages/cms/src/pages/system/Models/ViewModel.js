import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useModels } from "context/models";
import { useModal } from "context/modal";
import Info from "./Info";
import ListModelFields from "./ListModelFields";

const ViewModel = () => {
  const { selected } = useModels();
  const { setModal } = useModal();

  if (!selected) return <Info />;

  return (
    <CCard>
      <CCardHeader>
        <span id="listTitle" className="h3">
          {selected.name}
        </span>
      </CCardHeader>
      <CCardBody>
        <ListModelFields />
        {selected?.fields?.length > 0 && (
          <Link
            id="addmodel"
            to={`/system/models/add`}
            className="btn btn-success float-right"
            onClick={() => setModal("addModelField")}
          >
            <CIcon name="cil-plus" /> Add another field
          </Link>
        )}
      </CCardBody>
    </CCard>
  );
};

export default ViewModel;
