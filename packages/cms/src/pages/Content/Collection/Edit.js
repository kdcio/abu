import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { useParams } from "react-router-dom";
import FieldEdit from "components/FieldEdit";
import { useModels } from "context/models";
import { useToaster } from "context/toaster";
import { useData } from "context/data";
import Back from "components/Back";
import Save from "components/Save";

import uploadImage from "fields/image/submit";

import update from "api/update";
import get from "api/get";

const Edit = () => {
  const { selected: model } = useModels();
  const { setData } = useData();
  const { cid } = useParams();
  const { addToast } = useToaster();
  const methods = useForm();
  const { reset, control } = methods;
  const { isDirty, isSubmitting } = useFormState({ control });
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const updateContent = async ({ data }) => {
    const modelData = model.fields.reduce((acc, f) => {
      acc[f.id] = data[f.id];
      return acc;
    }, {});

    return update({
      apiName: "Content",
      id: cid,
      path: `/${model.id}/`,
      data: { data: modelData },
    });
  };

  // TODO: duplicate function in Single
  const submitImages = async (data) => {
    const fields = model.fields.filter(
      (f) => f.type === "image" && data[f.id] instanceof File
    );
    const proms = [];
    for (let idx = 0; idx < fields.length; idx += 1) {
      const key = fields[idx].id;
      proms.push(uploadImage({ model, file: data[key] }));
    }
    const res = await Promise.all(proms);
    const imageData = {};
    for (let idx = 0; idx < fields.length; idx += 1) {
      const key = fields[idx].id;
      imageData[key] = res[idx];
    }
    return imageData;
  };

  const onSubmit = async (data) => {
    try {
      const imageData = await submitImages(data);
      await updateContent({ data: { ...data, ...imageData } });
      reset({ ...data, ...imageData });
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
      setProcessing(true);
      try {
        const res = await get({
          apiName: "Content",
          path: `/${model.id}/`,
          id: cid,
        });
        if (cancel) return;
        reset(res.data);
        setData(res);
      } catch (e) {
        setData({});
      }
      setProcessing(false);
    };

    if (model?.id) getContent();
    else setData({});
    return () => {
      cancel = true;
    };
  }, [model, setData, cid, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        <CCard>
          <CCardHeader>
            <Back isSubmitting={isSubmitting} url={`/content/${model.id}`} />
            <span id="singleTitle" className="h3 mb-0">
              Edit {model.name}
            </span>
            <div className="card-header-actions">
              <Save
                isRetrieving={processing}
                isDirty={isDirty}
                isSubmitting={isSubmitting}
                className="mr-2"
              />
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
