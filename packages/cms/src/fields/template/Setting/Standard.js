import React from "react";

import Form from "./Form";
import Name from "./Name";
import Id from "./Id";
import Default from "./Default";
import Help from "./Help";
import Required from "./Required";
import Submit from "./Submit";

const Setting = ({ type, update, error, ...data }) => {
  const onSubmit = async (data) => {
    const field = {
      type,
      id: data.id,
      name: data.name,
      validations: {
        required: data.required,
      },
      default: data.default,
      help: data.help,
    };
    update(field);
  };

  return (
    <Form
      defaultValues={{
        id: data.id,
        name: data.name,
        required: data?.validations?.required,
        default: data.default,
        help: data.help,
      }}
      onSubmit={onSubmit}
      data={data}
    >
      {error && <div className="text-danger font-weight-bold">{error}</div>}
      <Name />
      <Id data={data} />
      <Default />
      <Help />
      <Required />
      <Submit data={data} />
    </Form>
  );
};

export default Setting;
