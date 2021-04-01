import React, { useState, useEffect } from "react";

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory, Link } from "react-router-dom";
import Spinner from "components/Spinner";

// import list from "api/list";
import remove from "api/remove";

const Models = () => {
  const history = useHistory();
  const [processing, setProcessing] = useState(false);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const getModels = async () => {
      // const models = await list({ apiName: "Models" });
      const models = [
        {
          id: "home",
          name: "Home Page",
          collection: false,
        },
        {
          id: "blogs",
          name: "Blogs",
          collection: true,
        },
        {
          id: "social",
          name: "Social Profiles",
          collection: true,
        },
        {
          id: "about",
          name: "About Page",
          collection: false,
        },
      ];
      setModels(models);
      setProcessing(false);
    };
    getModels();
  }, []);

  const removeModel = async (id, idx) => {
    if (!window.confirm("Are you sure to delete this model?")) return;
    setProcessing(true);
    await remove({ apiName: "Models", id });
    const newModels = [...models];
    newModels.splice(idx, 1);
    setModels(newModels);
    setProcessing(false);
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="6">
              <h3 id="listTitle">Models</h3>
            </CCol>
            <CCol sm="6">
              <Link
                id="addmodel"
                to={`/system/models/add`}
                className="btn btn-primary float-right"
              >
                <CIcon name="cil-plus" /> Add
              </Link>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {processing ? (
            <Spinner />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th className="text-center">Collection</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model, idx) => (
                    <tr key={model.id}>
                      <td>{model.id}</td>
                      <td>{model.name}</td>
                      <td className="text-center">
                        {model.collection ? "Yes" : "No"}
                      </td>
                      <td className="text-center">
                        <CButton
                          type="button"
                          size="sm"
                          color="info"
                          variant="ghost"
                          className="edit-btn"
                          onClick={() =>
                            history.push(`/system/models/edit/${model.id}`)
                          }
                        >
                          <CIcon name="cil-pen-alt" />
                        </CButton>
                        <CButton
                          type="button"
                          size="sm"
                          color="danger"
                          variant="ghost"
                          className="delete-btn"
                          onClick={() => removeModel(model.id, idx)}
                        >
                          <CIcon name="cil-trash" />
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Models;
