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

import listApi from "api/list";
import remove from "api/remove";

const List = () => {
  const history = useHistory();
  const [processing, setProcessing] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await listApi({ apiName: "Access" });
      if (res?.Items) setList(res.Items);
      else setList([]);
      setProcessing(false);
    };
    getList();
  }, []);

  const removeItem = async (id, idx) => {
    if (!window.confirm("Are you sure to delete this item?")) return;
    setProcessing(true);
    await remove({ apiName: "Access", id });
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
            <h3 id="listTitle">API Access</h3>
          </CCol>
          <CCol sm="6">
            <Link
              id="addUser"
              to={`/system/api_access/add`}
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
                  <th>Name</th>
                  <th>Last update</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.modified}</td>
                    <td className="text-center">
                      <CButton
                        type="button"
                        size="sm"
                        color="info"
                        variant="ghost"
                        className="edit-btn"
                        onClick={() =>
                          history.push(`/system/api_access/edit/${item.id}`)
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
                        onClick={() => removeItem(item.id, idx)}
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
