import React from "react";

import Form from "fields/template/Setting/Form";
import Name from "fields/template/Setting/Name";
import Id from "fields/template/Setting/Id";
import Required from "fields/template/Setting/Required";
import Submit from "fields/template/Setting/Submit";

import Today from "./Today";

const Setting = ({ update, error, ...data }) => {
  const onSubmit = async (newData) => {
    const field = {
      type: "date",
      id: newData.id,
      name: newData.name,
      validations: {
        required: newData.required,
      },
      today: newData.today,
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
        today: data.today,
        help: data.help,
      }}
      onSubmit={onSubmit}
      data={data}
    >
      {error && <div className="text-danger font-weight-bold">{error}</div>}
      <Name />
      <Id data={data} />
      <Today />
      <Required />
      <Submit data={data} />
    </Form>
  );
};

export default Setting;
