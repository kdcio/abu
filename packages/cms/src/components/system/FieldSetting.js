import React from "react";

import DateField from "fields/date/Setting";
import ImageField from "fields/image/Setting";
import RichTextField from "fields/rich-text/Setting";
import SlugField from "fields/slug/Setting";
import TextField from "fields/text/Setting";

const FieldSetting = ({ type }) => {
  switch (type) {
    case "date":
      return <DateField />;
    case "image":
      return <ImageField />;
    case "rich-text":
      return <RichTextField />;
    case "slug":
      return <SlugField />;
    case "text":
      return <TextField />;
    default:
      break;
  }
  return null;
};

export default FieldSetting;
