import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CModalFooter,
  CButton,
} from "@coreui/react";
import { useForm, FormProvider } from "react-hook-form";
import FieldEdit from "components/FieldEdit";
import { useModels } from "context/models";

const Single = () => {
  const { selected: model } = useModels();
  const methods = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        <CCard>
          <CCardHeader>
            <h3 id="singleTitle" className="mb-0">
              Editing {model.name}
            </h3>
          </CCardHeader>
          <CCardBody>
            {model?.fields?.map((field) => (
              <FieldEdit key={field.id} {...field} />
            ))}
          </CCardBody>
          <CModalFooter>
            <CButton type="submit" color="primary" block>
              Save
            </CButton>
          </CModalFooter>
        </CCard>
      </form>
    </FormProvider>
  );
};

export default Single;
