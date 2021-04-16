import React from "react";
import { ReactComponent as NotFoundImg } from "assets/svg/not-found.svg";
import "scss/components/dashboard.scss";

const NotFound = () => (
  <div className="dashboard">
    <NotFoundImg className="team-img" />
    <h4 className="pt-3">Oops! You&apos;re lost.</h4>
    <p className="text-muted float-left">
      The page you are looking for was not found.
    </p>
  </div>
);

export default NotFound;
