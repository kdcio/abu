import React from "react";
import Suspense from "./Suspense";
import DateField from "fields/date/Edit";
import ImageField from "fields/image/Edit";
import RichTextField from "fields/rich-text/Edit";
import SlugField from "fields/slug/Edit";
import TextField from "fields/text/Edit";

const FieldEdit = (field) => {
  switch (field.type) {
    case "date":
      return <Suspense Component={DateField} {...field} />;
    case "image":
      return <Suspense Component={ImageField} {...field} />;
    case "rich-text":
      return <Suspense Component={RichTextField} {...field} />;
    case "slug":
      return <Suspense Component={SlugField} {...field} />;
    case "text":
      return <Suspense Component={TextField} {...field} />;
    default:
      break;
  }
  return null;
};

export default FieldEdit;
