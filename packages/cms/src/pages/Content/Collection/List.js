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
import { useModels } from "context/models";
import { ReactComponent as EmptydImg } from "assets/svg/empty.svg";

import listApi from "api/list";
import remove from "api/remove";

const List = () => {
  const { selected: model } = useModels();
  const history = useHistory();
  const [processing, setProcessing] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await listApi({ apiName: "Content", path: `/${model.id}` });
      if (res?.Items) setList(res.Items);
      else setList([]);
      setProcessing(false);
    };
    getList();
  }, [model.id]);

  const removeContent = async (id, idx) => {
    if (
      !window.confirm(
        "Are you sure to delete this item? This cannot be undone."
      )
    )
      return;
    setProcessing(true);
    await remove({ apiName: "Content", id, path: `/${model.id}/` });
    const newList = [...list];
    newList.splice(idx, 1);
    setList(newList);
    setProcessing(false);
  };

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm="6">
            <h3 id="listTitle">{model.name}</h3>
          </CCol>
          <CCol sm="6">
            <Link
              id="addBtn"
              to={`/content/${model.id}/add`}
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
        ) : list.length === 0 ? (
          <div className="text-center">
            <EmptydImg className="empty-img" />
            <h5>Add your first {model.name}!</h5>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th>Preview</th>
                  <th>Last update</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, idx) => (
                  <tr key={item.id}>
                    <td>Show first text field here</td>
                    <td>{item.created}</td>
                    <td className="text-center">
                      <CButton
                        type="button"
                        size="sm"
                        color="info"
                        variant="ghost"
                        className="edit-btn"
                        onClick={() =>
                          history.push(`/content/${model.id}/edit/${item.id}`)
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
                        onClick={() => removeContent(item.id, idx)}
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
  );
};

export default List;
