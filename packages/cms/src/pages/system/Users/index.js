import React from "react";

import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";

const Users = () => {
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
                to={`/system/users/new`}
                className="btn btn-primary float-right"
              >
                <CIcon name="cil-plus" /> Add
              </Link>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
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
              <tr>
                <td>Juan</td>
                <td>Dela Cruz</td>
                <td>juan@delacruz.com</td>
                <td className="text-center">Admin</td>
                <td className="text-center">
                  <Link to={`/system/users/123`}>
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
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Users;
