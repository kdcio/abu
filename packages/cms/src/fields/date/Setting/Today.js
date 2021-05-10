import React from "react";
import { CSwitch } from "@coreui/react";
import { useFormContext } from "react-hook-form";

const Today = () => {
  const { register } = useFormContext();
  const { ref: todayRef, ...todayRest } = register("today");
  return (
    <div className="d-flex mb-3">
      <CSwitch
        id="today"
        className="mx-1"
        shape="pill"
        color="primary"
        {...todayRest}
        innerRef={todayRef}
      />
      <div className="ml-2 today-info">
        <span>Set default to today</span>
      </div>
    </div>
  );
};

export default Today;
