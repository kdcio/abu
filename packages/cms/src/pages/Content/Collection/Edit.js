import React, { useState, useEffect } from "react";
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import { useParams } from "react-router-dom";
import FieldEdit from "components/FieldEdit";
import { useModels } from "context/models";
import { useToaster } from "context/toaster";
import { useData } from "context/data";

import update from "api/update";
import get from "api/get";

const Edit = () => {
  const { selected: model } = useModels();
  const { setData } = useData();
  const { cid } = useParams();
  const { addToast } = useToaster();
  const methods = useForm();
  const [error, setError] = useState(null);

  const updateContent = async ({ data }) =>
    update({
      apiName: "Content",
      id: cid,
      path: `/${model.id}/`,
      data: { data },
    });

  const onSubmit = async (data) => {
    try {
      await updateContent({ data });
      addToast({
        message: `${model.name} saved successfully!`,
        color: "success",
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    let cancel = false;
    const getContent = async () => {
      try {
        const res = await get({
          apiName: "Content",
          path: `/${model.id}/`,
          id: cid,
        });
        if (cancel) return;
        setData(res);
      } catch (e) {
        setData({});
      }
    };

    if (model?.id) getContent();
    else setData({});
    return () => {
      cancel = true;
    };
  }, [model, setData, cid]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        <CCard>
          <CCardHeader>
            <span id="singleTitle" className="h3 mb-0">
              Edit {model.name}
            </span>
            <div className="card-header-actions">
              <CButton
                type="submit"
                id="update"
                size="sm"
                color="primary"
                className="mr-2"
                disabled={methods?.formState?.isSubmitting}
              >
                <CIcon name="cil-scrubber" /> Update
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

export default Edit;
