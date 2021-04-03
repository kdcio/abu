import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CModalFooter,
  CButton,
} from "@coreui/react";
import { useForm, FormProvider } from "react-hook-form";
import FieldEdit from "components/FieldEdit";
import { useModels } from "context/models";

import create from "api/create";

const Single = () => {
  const { selected: model } = useModels();
  const methods = useForm();
  const [error, setError] = useState(null);

  const createSingle = async ({ data }) =>
    create({
      apiName: "Content",
      path: `/${model.id}`,
      data: {
        id: model.id,
        data,
      },
    });

  const onSubmit = async (data) => {
    try {
      await createSingle({ data });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        <CCard>
          <CCardHeader>
            <h3 id="singleTitle" className="mb-0">
              Editing {model.name}
            </h3>
          </CCardHeader>
          <CCardBody>
            {error && (
              <div className="text-danger font-weight-bold">{error}</div>
            )}
            {model?.fields?.map((field) => (
              <FieldEdit key={field.id} {...field} />
            ))}
          </CCardBody>
          <CModalFooter>
            <CButton type="submit" color="primary" block>
              Save
            </CButton>
          </CModalFooter>
        </CCard>
      </form>
    </FormProvider>
  );
};

export default Single;
