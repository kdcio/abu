import React, { useState, useEffect } from "react";
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
import { useHistory, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { useModels } from "context/models";
import { useToaster } from "context/toaster";
import Back from "components/Back";
import Save from "components/Save";
import Cancel from "components/Cancel";

import create from "api/create";
import get from "api/get";
import update from "api/update";

const Form = () => {
  const { id } = useParams();
  const { list: models } = useModels();
  const history = useHistory();
  const { addToast } = useToaster();
  const { register, handleSubmit, control, getValues, reset } = useForm();
  const { errors, isDirty, isSubmitting } = useFormState({ control });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(null);

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
    reset(data);
  };

  const onSubmit = async (data) => {
    try {
      if (id) updateAccess(data);
      else createAccess(data);
    } catch (err) {
      setError(err);
    }
  };

  const copyValue = () => {
    navigator.clipboard.writeText(key);
    addToast({
      message: "API Key copied to your clipboard",
      color: "secondary",
    });
  };

  useEffect(() => {
    let cancel = false;
    const getAccess = async () => {
      const res = await get({ apiName: "Access", id });
      if (cancel) return;
      const values = {
        ...getValues(),
        ...res,
      };
      reset(values);
      setKey(res.key);
      setProcessing(false);
    };
    if (id) getAccess();
    return () => {
      cancel = true;
    };
  }, [id, getValues, reset, history]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <CCard>
        <CCardHeader>
          <Back isSubmitting={isSubmitting} url="/system/api_access" />
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
                  {...register("name", { required: true })}
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
                      <CButton type="button" color="info" onClick={copyValue}>
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
              {models.map((model, idx) => {
                const { ref: readRef, ...readRest } = register(
                  `read[${model.id}]`
                );
                const { ref: writeRef, ...writeRest } = register(
                  `write[${model.id}]`
                );

                return (
                  <CRow key={model.id} className="form-group">
                    <CCol xs={4}>{model.name}</CCol>
                    <CCol xs={4} className="text-center">
                      <CSwitch
                        id={`read-${model.id}`}
                        className="mx-1"
                        shape="pill"
                        color="primary"
                        {...readRest}
                        innerRef={readRef}
                      />
                    </CCol>
                    <CCol xs={4} className="text-center">
                      <CSwitch
                        id={`write-${model.id}`}
                        className="mx-1"
                        shape="pill"
                        color="primary"
                        {...writeRest}
                        innerRef={writeRef}
                      />
                    </CCol>
                  </CRow>
                );
              })}
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
          <Cancel isSubmitting={isSubmitting} url="/system/api_access" />
        </CCardFooter>
      </CCard>
    </form>
  );
};

export default Form;
