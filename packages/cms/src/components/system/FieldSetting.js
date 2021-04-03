import React, { useState } from "react";

import DateField from "fields/date/Setting";
import ImageField from "fields/image/Setting";
import RichTextField from "fields/rich-text/Setting";
import SlugField from "fields/slug/Setting";
import TextField from "fields/text/Setting";

import { useModels } from "context/models";
import { useModal } from "context/modal";
import update from "../../api/update";

const FieldSetting = ({ type }) => {
  const { selected: model, dispatch } = useModels();
  const { setModal } = useModal();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const updateModel = async ({ id, ...others }) =>
    await update({ apiName: "Model", id, data: { id, ...others } });

  const onSubmit = async (data) => {
    setProcessing(true);
    if (model?.fields?.length > 0) {
      const idx = model.fields.findIndex((item) => item.id === data.id);
      if (idx >= 0) {
        setError("Field ID not unique. Please choose a different one.");
        setProcessing(false);
        return;
      }
    }

    try {
      const newModel = { ...model };
      if (newModel.fields) newModel.fields.push(data);
      else newModel.fields = [data];
      await updateModel(newModel);
      dispatch({ type: "UPDATE_SELECTED", payload: newModel });
      setModal(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
    setProcessing(false);
  };

  switch (type) {
    case "date":
      return (
        <DateField processing={processing} update={onSubmit} error={error} />
      );
    case "image":
      return (
        <ImageField processing={processing} update={onSubmit} error={error} />
      );
    case "rich-text":
      return (
        <RichTextField
          processing={processing}
          update={onSubmit}
          error={error}
        />
      );
    case "slug":
      return (
        <SlugField processing={processing} update={onSubmit} error={error} />
      );
    case "text":
      return (
        <TextField processing={processing} update={onSubmit} error={error} />
      );
    default:
      break;
  }
  return null;
};

export default FieldSetting;
