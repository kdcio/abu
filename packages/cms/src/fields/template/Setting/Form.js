import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import snakeCase from "lodash.snakecase";

const Form = ({ defaultValues, onSubmit, error, children, data }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit, watch, setValue } = methods;

  const name = watch("name");
  useEffect(() => {
    if (data?.id) return;
    setValue("id", snakeCase(name));
  }, [name, setValue, data]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {error && <div className="text-danger font-weight-bold">{error}</div>}
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
