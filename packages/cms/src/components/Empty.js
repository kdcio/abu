import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as EmptyImg } from "assets/svg/empty.svg";

const Empty = ({ title, btnName, to }) => {
  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <EmptyImg className="empty-svg mt-2" />
      <h3 className="mt-3">{title}</h3>
      <Link className="btn btn-primary mt-2" to={to}>
        {btnName}
      </Link>
    </div>
  );
};

export default Empty;
