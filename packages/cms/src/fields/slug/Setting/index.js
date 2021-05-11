import React from "react";

import Form from "fields/template/Setting/Form";
import Name from "fields/template/Setting/Name";
import Id from "fields/template/Setting/Id";
import Help from "fields/template/Setting/Help";
import Required from "fields/template/Setting/Required";
import Submit from "fields/template/Setting/Submit";

import Reference from "./Reference";

const Setting = ({ update, error, ...data }) => {
  const onSubmit = async (newData) => {
    const field = {
      type: "slug",
      id: newData.id,
      name: newData.name,
      validations: {
        required: newData.required,
      },
      reference: newData.reference,
      help: newData.help,
    };
    update(field);
  };

  return (
    <Form
      defaultValues={{
        id: data.id,
        name: data.name,
        required: data?.validations?.required,
        reference: data.reference,
        help: data.help,
      }}
      onSubmit={onSubmit}
      data={data}
    >
      {error && <div className="text-danger font-weight-bold">{error}</div>}
      <Name />
      <Id data={data} />
      <Reference />
      <Help />
      <Required />
      <Submit data={data} />
    </Form>
  );
};

export default Setting;
