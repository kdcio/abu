import React, { useState } from "react";
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Link, useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import FieldEdit from "components/FieldEdit";
import { useModels } from "context/models";
import { useToaster } from "context/toaster";

import create from "api/create";

const Add = () => {
  const { selected: model } = useModels();
  const { addToast } = useToaster();
  const history = useHistory();
  const methods = useForm();
  const [error, setError] = useState(null);

  const createContent = async ({ data }) =>
    create({
      apiName: "Content",
      path: `/${model.id}`,
      data: { data },
    });

  const onSubmit = async (data) => {
    try {
      await createContent({ data });
      addToast({
        message: `${model.name} saved successfully!`,
        color: "success",
      });
      setError(null);
      history.push(`/content/${model.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        <CCard>
          <CCardHeader>
            <span id="singleTitle" className="h3 mb-0">
              Add {model.name}
            </span>
            <div className="card-header-actions">
              <CButton
                type="submit"
                id="add"
                size="sm"
                color="primary"
                className="mr-2"
                disabled={methods?.formState?.isSubmitting}
              >
                <CIcon name="cil-scrubber" /> Add
              </CButton>
              <Link
                id="cancel"
                to={`/content/${model.id}`}
                className="btn btn-danger btn-sm"
                disabled={methods?.formState?.isSubmitting}
              >
                <CIcon name="cil-ban" /> Cancel
              </Link>
            </div>
          </CCardHeader>
          <CCardBody>
            {error && (
              <div className="text-danger font-weight-bold">{error}</div>
            )}
            {model?.fields?.map((field) => (
              <FieldEdit key={field.id} {...field} />
            ))}
          </CCardBody>
        </CCard>
      </form>
    </FormProvider>
  );
};

export default Add;
