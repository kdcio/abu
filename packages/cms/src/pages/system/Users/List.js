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

import list from "api/list";
import remove from "api/remove";

const List = () => {
  const history = useHistory();
  const [processing, setProcessing] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let cancel = false;
    const getUsers = async () => {
      const users = await list({ apiName: "Users" });
      if (cancel) return;
      setUsers(users);
      setProcessing(false);
    };
    getUsers();
    return () => {
      cancel = true;
    };
  }, []);

  const removeUser = async (id, idx) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    setProcessing(true);
    await remove({ apiName: "Users", id });
    const newUsers = [...users];
    newUsers.splice(idx, 1);
    setUsers(newUsers);
    setProcessing(false);
  };

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm="6">
            <h3 id="listTitle">Users</h3>
          </CCol>
          <CCol sm="6">
            <Link
              id="addUser"
              to={`/system/users/add`}
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th className="text-center">Group</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.sub}>
                    <td>{user.given_name}</td>
                    <td>{user.family_name}</td>
                    <td>{user.email}</td>
                    <td className="text-center">{user.groups?.[0]}</td>
                    <td className="text-center">{user.status}</td>
                    <td className="text-center">
                      {user.status === "CONFIRMED" && (
                        <CButton
                          type="button"
                          size="sm"
                          color="info"
                          variant="ghost"
                          className="edit-btn"
                          onClick={() =>
                            history.push(`/system/users/edit/${user.sub}`)
                          }
                        >
                          <CIcon name="cil-pen-alt" />
                        </CButton>
                      )}
                      <CButton
                        type="button"
                        size="sm"
                        color="danger"
                        variant="ghost"
                        className="delete-btn"
                        onClick={() => removeUser(user.sub, idx)}
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
