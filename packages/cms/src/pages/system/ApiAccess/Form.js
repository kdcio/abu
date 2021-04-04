import React, { useState, useRef, useEffect } from "react";
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
import { useHistory, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import { useModels } from "context/models";
import { useToaster } from "context/toaster";

import create from "api/create";
import get from "api/get";
import update from "api/update";

const Form = () => {
  const { id } = useParams();
  const { list: models } = useModels();
  const history = useHistory();
  const { addToast } = useToaster();
  const { register, handleSubmit, errors, getValues, reset } = useForm();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(null);

  const switchRef = useRef([]);

  const createAccess = async (data) => {
    const { id } = await create({ apiName: "Access", data });
    addToast({
      message: "API Access saved successfully!",
      color: "success",
    });
    history.push(`/system/api_access/edit/${id}`);
  };

  const updateAccess = async (data) => {
    await update({ apiName: "Access", id, data });
    addToast({
      message: "API Access saved successfully!",
      color: "success",
    });
    setProcessing(false);
  };

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      if (id) updateAccess(data);
      else createAccess(data);
    } catch (err) {
      setError(err);
      setProcessing(false);
    }
  };

  useEffect(() => {
    const getAccess = async () => {
      const res = await get({ apiName: "Access", id });
      const values = {
        ...getValues(),
        ...res,
      };
      reset(values);
      setKey(res.key);
      setProcessing(false);
    };
    if (id) getAccess();
  }, [id, getValues, reset, history]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <CCard>
        <CCardHeader>
          <h3 id="formTitle" className="mb-0">
            {id ? "Edit" : "Add"} API Access
          </h3>
        </CCardHeader>
        <CCardBody>
          {error && (
            <p className="text-danger text-center">
              <strong>{error}</strong>
            </p>
          )}
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
                    <CInput
                      type="text"
                      id="api-key"
                      name="api-key"
                      readOnly
                      value={key}
                    />
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
            to={`/system/api_access`}
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
