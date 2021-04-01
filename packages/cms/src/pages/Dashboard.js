import React from "react";
import { useAuth } from "context/auth";
import { ReactComponent as DashboardImg } from "assets/svg/dashboard.svg";

import "scss/components/dashboard.scss";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <DashboardImg className="team-img" />
      <h1>Hello {user.given_name}!</h1>
      <p>Start editing your content on the left sidebar.</p>
    </div>
  );
};

export default Dashboard;
