import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useList } from "context/list";
import { useModal } from "context/modal";
import Info from "./Info";
import FieldList from "./FieldList";

const Fields = () => {
  const { selected } = useList();
  const { setModal } = useModal();

  if (!selected) return <Info />;

  return (
    <CCard>
      <CCardHeader>
        <span id="listTitle" className="h3">
          {selected.name}
        </span>
        <div className="card-header-actions">
          <Link
            id="addmodel"
            to={`/system/models/add`}
            className="btn btn-info btn-sm float-right"
          >
            <CIcon name="cil-pencil" /> Edit Model
          </Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <FieldList />
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

export default Fields;
