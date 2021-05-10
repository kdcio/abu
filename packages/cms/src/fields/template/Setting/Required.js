import React from "react";
import { CSwitch } from "@coreui/react";
import { useFormContext } from "react-hook-form";

const Required = () => {
  const { register } = useFormContext();
  const { ref: reqRef, ...reqRest } = register("required");
  return (
    <div className="d-flex">
      <CSwitch
        id="required"
        name="required"
        className={"mx-1"}
        shape={"pill"}
        color={"primary"}
        {...reqRest}
        innerRef={reqRef}
      />
      <div className="ml-2 required-info">
        <span>Required</span>
      </div>
    </div>
  );
};

export default Required;
