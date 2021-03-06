import React, { useState } from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import FieldEdit from "components/FieldEdit";
import { useModels } from "context/models";
import { useToaster } from "context/toaster";
import Back from "components/Back";
import AddBtn from "components/Add";

import uploadImage from "fields/image/submit";

import create from "api/create";

const Add = () => {
  const { selected: model } = useModels();
  const { addToast } = useToaster();
  const history = useHistory();
  const methods = useForm();
  const { control } = methods;
  const { isDirty, isSubmitting } = useFormState({ control });
  const [error, setError] = useState(null);

  const createContent = async ({ data }) => {
    const modelData = model.fields.reduce((acc, f) => {
      acc[f.id] = data[f.id];
      return acc;
    }, {});

    return create({
      apiName: "Content",
      path: `/${model.id}`,
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
      await createContent({ data: { ...data, ...imageData } });
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
            <Back isSubmitting={isSubmitting} url={`/content/${model.id}`} />
            <span id="singleTitle" className="h3 mb-0">
              Add {model.name}
            </span>
            <div className="card-header-actions">
              <AddBtn
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

export default Add;
