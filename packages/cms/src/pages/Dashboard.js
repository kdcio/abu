import React from "react";
import { useHistory } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { useAuth } from "context/auth";
import { useModels } from "context/models";
import Spinner from "components/Spinner";
import Save from "components/Save";
import { ReactComponent as DashboardImg } from "assets/svg/dashboard.svg";

import "scss/components/dashboard.scss";
import "scss/components/button.scss";

import create from "api/create";

const Dashboard = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { list, hydrating } = useModels();
  const { handleSubmit, control } = useForm();
  const { isSubmitting } = useFormState({ control });

  const onSeed = async () => {
    await create({ apiName: "Seed", data: {} });
    history.push("/");
    history.go(0);
  };

  if (hydrating) return <Spinner />;

  return (
    <div className="dashboard">
      <DashboardImg className="team-img" />
      <h1 id="hello-title">Hello {user.given_name}!</h1>
      {list.length > 0 ? (
        <p>Start editing your content on the left sidebar.</p>
      ) : (
        <form onSubmit={handleSubmit(onSeed)} autoComplete="off">
          <div className="text-center">
            <p>Need some examples to get start with?</p>
            <Save
              isDirty={true}
              isSubmitting={isSubmitting}
              icon="cil-plus"
              title="Add Sample Data"
              isSubmittingTitle="Adding data..."
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
