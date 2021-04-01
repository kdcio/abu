import React, { useState, useEffect } from "react";

import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import Spinner from "components/Spinner";

import list from "api/list";

const Users = () => {
  const [processing, setProcessing] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await list({ apiName: "Users" });
      setUsers(users);
      setProcessing(false);
    };
    getUsers();
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="6">
              <h3>Users</h3>
            </CCol>
            <CCol sm="6">
              <Link
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
            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th className="text-center">Group</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.sub}>
                    <td>{user.given_name}</td>
                    <td>{user.family_name}</td>
                    <td>{user.email}</td>
                    <td className="text-center">{user.groups?.[0]}</td>
                    <td className="text-center">
                      <Link to={`/system/users/edit/${user.sub}`}>
                        <CIcon
                          name="cil-pen-alt"
                          className="text-info px-1"
                          height={18}
                        />
                      </Link>
                      <CIcon
                        name="cil-trash"
                        className="text-danger px-1"
                        height={18}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Users;
