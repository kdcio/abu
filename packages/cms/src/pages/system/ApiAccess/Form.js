import React, { useState, useRef } from "react";
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
  CSwitch,
  CInputGroup,
  CInput,
  CInputGroupAppend,
} from "@coreui/react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import { useModels } from "context/models";

// import get from "api/get";
// import update from "api/update";

const Form = () => {
  const { id } = useParams();
  const { list: models } = useModels();
  const { register, handleSubmit, errors } = useForm();
  const [processing, setProcessing] = useState(false);

  const switchRef = useRef([]);

  // const updateUser = async ({ firstName, lastName, group }) => {
  //   const data = {};
  //   if (
  //     firstName !== defaultValues.firstName ||
  //     lastName !== defaultValues.lastName
  //   ) {
  //     data.firstName = firstName;
  //     data.lastName = lastName;
  //   }

  //   if (group !== defaultValues.group) {
  //     data.newGroup = group;
  //     data.oldGroup = defaultValues.group;
  //   }

  //   if (Object.keys(data).length <= 0) return;
  //   // send only changed data
  //   await update({
  //     apiName: "Users",
  //     id,
  //     data,
  //   });
  // };

  const onSubmit = async (data) => {
    setProcessing(true);
    console.log(JSON.stringify(data));
    // const proms = [];
    // proms.push(updateUser(data));
    // proms.push(changePassword(data));
    // await Promise.all(proms);
    setProcessing(false);
    // history.push("/system/api_access");
  };

  // useEffect(() => {
  //   const getUser = async () => {
  //     const res = await get({ apiName: "Users", id });
  //     const values = {
  //       ...getValues(),
  //       firstName: res.given_name,
  //       lastName: res.family_name,
  //       group: res.groups?.[0] || "editor",
  //       email: res.email,
  //     };
  //     setDefaultValues(values);
  //     reset(values);
  //     setProcessing(false);
  //   };
  //   if (id) getUser();
  //   else history.push("/system/users");
  // }, [id, getValues, reset, history]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <CCard>
        <CCardHeader>
          <h3 id="formTitle" className="mb-0">
            {id ? "Edit" : "Add"} API Access
          </h3>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <CFormGroup>
                <CLabel htmlFor="name">Name</CLabel>
                <input
                  type="text"
                  className={`form-control ${errors.name && "is-invalid"}`}
                  id="name"
                  name="name"
                  ref={register({ required: true })}
                  disabled={processing}
                />
                {errors.name && (
                  <div className="invalid-feedback">Please provide name.</div>
                )}
              </CFormGroup>
              {id && (
                <CFormGroup>
                  <CLabel htmlFor="api-key">API Key</CLabel>
                  <CInputGroup>
                    <CInput type="text" id="api-key" name="api-key" readOnly />
                    <CInputGroupAppend>
                      <CButton type="button" color="info">
                        Copy
                      </CButton>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
              )}
            </CCol>
            <CCol sm={6}>
              <h5 className="mb-3">Permissions</h5>
              <CRow className="form-group font-weight-bold">
                <CCol xs={4}>Model Name</CCol>
                <CCol xs={4} className="text-center">
                  Read
                </CCol>
                <CCol xs={4} className="text-center">
                  Write
                </CCol>
              </CRow>
              {models.map((model, idx) => (
                <CRow key={model.id} className="form-group">
                  <CCol xs={4}>{model.name}</CCol>
                  <CCol xs={4} className="text-center">
                    <CSwitch
                      id={`read-${model.id}`}
                      name={`read[${model.id}]`}
                      className={"mx-1"}
                      shape={"pill"}
                      color={"primary"}
                      innerRef={(e) => {
                        register(e);
                        switchRef.current[idx * 2] = e;
                      }}
                    />
                  </CCol>
                  <CCol xs={4} className="text-center">
                    <CSwitch
                      id={`write-${model.id}`}
                      name={`write[${model.id}]`}
                      className={"mx-1"}
                      shape={"pill"}
                      color={"primary"}
                      innerRef={(e) => {
                        register(e);
                        switchRef.current[idx * 2 + 1] = e;
                      }}
                    />
                  </CCol>
                </CRow>
              ))}
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CButton
            type="submit"
            id="save"
            size="sm"
            color="primary"
            className="mr-2"
            disabled={processing}
          >
            <CIcon name="cil-scrubber" /> {id ? "Update" : "Add Access"}
          </CButton>
          <Link
            id="cancel"
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
