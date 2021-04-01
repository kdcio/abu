import React, { useState, useEffect, useRef } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
} from "@coreui/react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";

import get from "api/get";
import update from "api/update";

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit, errors, getValues, reset, watch } = useForm();
  const [processing, setProcessing] = useState(true);
  const [defaultValues, setDefaultValues] = useState({});

  const password = useRef({});
  password.current = watch("password", "");

  const updateUser = async ({ firstName, lastName, group }) => {
    const data = {};
    if (
      firstName !== defaultValues.firstName ||
      lastName !== defaultValues.lastName
    ) {
      data.firstName = firstName;
      data.lastName = lastName;
    }

    if (group !== defaultValues.group) {
      data.newGroup = group;
      data.oldGroup = defaultValues.group;
    }

    if (Object.keys(data).length <= 0) return;
    // send only changed data
    await update({
      apiName: "Users",
      id,
      data,
    });
  };

  const changePassword = async ({ password, confirmPassword }) => {
    if (!password || !confirmPassword) return;
    await update({
      apiName: "Users",
      id,
      pathSuffix: "/password",
      data: { password },
    });
  };

  const onSubmit = async (data) => {
    setProcessing(true);
    const proms = [];
    proms.push(updateUser(data));
    proms.push(changePassword(data));
    await Promise.all(proms);
    setProcessing(false);
    history.push("/system/users");
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await get({ apiName: "Users", id });
      const values = {
        ...getValues(),
        firstName: res.given_name,
        lastName: res.family_name,
        group: res.groups?.[0] || "editor",
        email: res.email,
      };
      setDefaultValues(values);
      reset(values);
      setProcessing(false);
    };
    if (id) getUser();
    else history.push("/system/users");
  }, [id, getValues, reset, history]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <CCard>
        <CCardHeader>
          <h3>Edit User</h3>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="firstName">Email</CLabel>
                <input
                  type="email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  ref={register({ required: true })}
                  disabled={processing}
                />
                {errors.email && (
                  <div className="invalid-feedback">Please provide email.</div>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="firstName">First Name</CLabel>
                <input
                  type="text"
                  className={`form-control ${errors.firstName && "is-invalid"}`}
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  ref={register({ required: true })}
                  disabled={processing}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">
                    Please provide first name.
                  </div>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="lastName">Last Name</CLabel>
                <input
                  type="text"
                  className={`form-control ${errors.lastName && "is-invalid"}`}
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  ref={register({ required: true })}
                  disabled={processing}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">
                    Please provide last name.
                  </div>
                )}
              </CFormGroup>
            </CCol>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="group">Group</CLabel>
                <select
                  className={`form-control ${errors.group && "is-invalid"}`}
                  id="group"
                  name="group"
                  ref={register({ required: true })}
                  disabled={processing}
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.group && (
                  <div className="invalid-feedback">Please provide group.</div>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="password">
                  New Password <small>(Leave blank to retain password)</small>
                </CLabel>
                <input
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  id="password"
                  name="password"
                  ref={register({
                    pattern: {
                      value: /(?=.*\d)(?=.*[A-Z]).{6,}/,
                      message:
                        "Must contain at least one number and one uppercase letter, and at least 6 or more characters",
                    },
                  })}
                  disabled={processing}
                  autoComplete="off"
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="confirmPassword">Confirm New Password</CLabel>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  ref={register({
                    pattern: {
                      value: /(?=.*\d)(?=.*[A-Z]).{6,}/,
                      message:
                        "Must contain at least one number and one uppercase letter, and at least 6 or more characters",
                    },
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  disabled={processing}
                  autoComplete="off"
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CButton
            type="submit"
            size="sm"
            color="primary"
            className="mr-2"
            disabled={processing}
          >
            <CIcon name="cil-scrubber" /> Update
          </CButton>
          <Link
            to={`/system/users`}
            className="btn btn-danger btn-sm"
            disabled={processing}
          >
            <CIcon name="cil-ban" /> Cancel
          </Link>
        </CCardFooter>
      </CCard>
    </form>
  );
};

export default Form;
