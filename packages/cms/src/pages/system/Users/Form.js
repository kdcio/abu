import React, { useState, useEffect, useRef } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
} from "@coreui/react";
import { useHistory, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import Back from "components/Back";
import Save from "components/Save";
import Cancel from "components/Cancel";

import get from "api/get";
import update from "api/update";

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    watch,
  } = useForm();
  const { errors, isDirty, isSubmitting } = useFormState({ control });
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
    const proms = [];
    proms.push(updateUser(data));
    proms.push(changePassword(data));
    await Promise.all(proms);
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
          <Back isSubmitting={isSubmitting} url="/system/users" />
          <h3 id="formTitle" className="mb-0">
            Edit User
          </h3>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="firstName">Email</CLabel>
                <input
                  type="email"
                  className={`form-control-plaintext ${
                    errors.email && "is-invalid"
                  }`}
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  readOnly
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
                  {...register("firstName", { required: true })}
                  placeholder="Enter your first name"
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
                  {...register("lastName", { required: true })}
                  placeholder="Enter your last name"
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
                  {...register("group", { required: true })}
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
                  {...register("password", {
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
                  {...register("confirmPassword", {
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
          <Save
            isRetrieving={processing}
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            className="mr-2"
          />
          <Cancel isSubmitting={isSubmitting} url="/system/users" />
        </CCardFooter>
      </CCard>
    </form>
  );
};

export default Form;
