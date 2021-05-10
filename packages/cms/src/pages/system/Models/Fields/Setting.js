import React, { useState } from "react";

import DateField from "fields/date/Setting";
import ImageField from "fields/image/Setting";
import RichTextField from "fields/rich-text/Setting";
import SlugField from "fields/slug/Setting";
import TextField from "fields/text/Setting";

import { useModels } from "context/models";
import { useModal } from "context/modal";
import update from "api/update";

const FieldSetting = ({ type, ...rest }) => {
  const { selected: model, dispatch } = useModels();
  const { setModal } = useModal();
  const [error, setError] = useState(null);

  const updateModel = async ({ id, ...others }) => {
    const data = { id, ...others };
    return update({ apiName: "Model", id, data });
  };

  const onSubmit = async (data) => {
    const newModel = { ...model };
    if (!newModel.fields) newModel.fields = [];

    if (rest?.id) {
      const idx = newModel.fields.findIndex((item) => item.id === data.id);
      newModel.fields[idx] = data;
    } else {
      const idx = newModel.fields.findIndex((item) => item.id === data.id);
      if (idx >= 0) {
        setError("Field ID not unique. Please choose a different one.");
        return;
      }
      newModel.fields.push(data);
    }

    try {
      await updateModel(newModel);
      dispatch({ type: "UPDATE_SELECTED", payload: newModel });
      setModal(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  switch (type) {
    case "date":
      return <DateField update={onSubmit} error={error} {...rest} />;
    case "image":
      return <ImageField update={onSubmit} error={error} {...rest} />;
    case "rich-text":
      return <RichTextField update={onSubmit} error={error} {...rest} />;
    case "slug":
      return <SlugField update={onSubmit} error={error} {...rest} />;
    case "text":
      return <TextField update={onSubmit} error={error} {...rest} />;
    default:
      break;
  }
  return null;
};

export default FieldSetting;
