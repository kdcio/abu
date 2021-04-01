import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useList } from "context/list";
import Info from "./Info";

const Form = () => {
  const { selected } = useList();
  console.log(selected);

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
            className="btn btn-primary btn-sm float-right"
          >
            <CIcon name="cil-pencil" /> Edit
          </Link>
        </div>
      </CCardHeader>
      <CCardBody></CCardBody>
    </CCard>
  );
};

export default Form;
