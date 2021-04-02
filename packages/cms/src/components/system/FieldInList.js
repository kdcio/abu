import React from "react";
import Suspense from "../Suspense";

const DateField = React.lazy(() => import("fields/date/List"));
const ImageField = React.lazy(() => import("fields/image/List"));
const RichTextField = React.lazy(() => import("fields/rich-text/List"));
const SlugField = React.lazy(() => import("fields/slug/List"));
const TextField = React.lazy(() => import("fields/text/List"));

const FieldInList = (field) => {
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

export default FieldInList;
