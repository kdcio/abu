import React from "react";

import Form from "fields/template/Setting/Form";
import Name from "fields/template/Setting/Name";
import Id from "fields/template/Setting/Id";
import Help from "fields/template/Setting/Help";
import Required from "fields/template/Setting/Required";
import Submit from "fields/template/Setting/Submit";

const Setting = ({ update, error, ...data }) => {
  const onSubmit = (data) => {
    const field = {
      type: "image",
      id: data.id,
      name: data.name,
      validations: {
        required: data.required,
      },
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
        help: data.help,
      }}
      onSubmit={onSubmit}
      data={data}
    >
      {error && <div className="text-danger font-weight-bold">{error}</div>}
      <Name />
      <Id data={data} />
      <Help />
      <Required />
      <Submit data={data} />
    </Form>
  );
};

export default Setting;
