import React from "react";

import DateField from "fields/date/List";
import ImageField from "fields/image/List";
import RichTextField from "fields/rich-text/List";
import SlugField from "fields/slug/List";
import TextField from "fields/text/List";

const ViewModelField = (field) => {
  switch (field.type) {
    case "date":
      return <DateField {...field} />;
    case "image":
      return <ImageField {...field} />;
    case "rich-text":
      return <RichTextField {...field} />;
    case "slug":
      return <SlugField {...field} />;
    case "text":
      return <TextField {...field} />;
    default:
      break;
  }
  return null;
};

export default ViewModelField;
