import React, { useState, useEffect, useRef } from "react";
import snakeCase from "lodash.snakecase";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CLabel,
  CSwitch,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { useList } from "context/list";
import { useModal } from "context/modal";

import create from "api/create";

import "scss/components/add-model.scss";

const Add = () => {
  const { modal, setModal } = useModal();
  const { hydrate } = useList();
  const collectionRef = useRef();
  const { register, handleSubmit, errors, watch, setValue } = useForm();
  const [processing, setProcessing] = useState(false);

  const name = watch("name");
  useEffect(() => {
    setValue("id", snakeCase(name));
  }, [name, setValue]);

  const createModal = async ({ name, id, collection }) =>
    await create({
      apiName: "Model",
      data: {
        name,
        id,
        collection,
      },
    });

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      await createModal(data);
      await hydrate();
      setModal(false);
    } catch (error) {
      console.log(error);
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <CModal
        show={modal === "addModel"}
        onClose={() => setModal(false)}
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <CModalTitle>Add Model</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="name">Name</CLabel>
            <input
              type="text"
              className={`form-control form-control-lg ${
                errors.name && "is-invalid"
              }`}
              id="name"
              name="name"
              placeholder="Blog"
              ref={register({ required: true })}
              disabled={processing}
            />
            {errors.name && (
              <div className="invalid-feedback">Please provide name.</div>
            )}
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="id">Model ID</CLabel>
            <input
              type="text"
              className={`form-control form-control-lg ${
                errors.id && "is-invalid"
              }`}
              id="id"
              name="id"
              placeholder="blog"
              ref={register({ required: true })}
              disabled={processing}
            />
            <small className="form-text text-muted">
              This will be automatically generated based on name and will be
              used in API endpoints.
            </small>
            {errors.id && (
              <div className="invalid-feedback">Please provide id.</div>
            )}
          </CFormGroup>
          <div className="d-flex">
            <CSwitch
              id="collection"
              name="collection"
              className={"mx-1"}
              shape={"pill"}
              color={"primary"}
              defaultChecked
              innerRef={(e) => {
                register(e);
                collectionRef.current = e;
              }}
            />
            <div className="ml-2 collection-info">
              <span>Collections</span>
              <small className="form-text text-muted">
                Will this be a collection of records or just a single one?
                Example of collections are blogs, news or products. Example of
                single one are home page, about us page or terms and conditions
                page.
              </small>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" color="primary" block>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </form>
  );
};

export default Add;
