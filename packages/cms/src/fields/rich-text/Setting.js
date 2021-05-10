import React from "react";

import Form from "fields/template/Setting/Form";
import Name from "fields/template/Setting/Name";
import Id from "fields/template/Setting/Id";
import Default from "fields/template/Setting/Default";
import Help from "fields/template/Setting/Help";
import Required from "fields/template/Setting/Required";
import Submit from "fields/template/Setting/Submit";

const Setting = ({ update, error, ...data }) => {
  const onSubmit = async (data) => {
    const field = {
      type: "rich-text",
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
