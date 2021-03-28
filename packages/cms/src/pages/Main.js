import React from "react";
import { useAuth } from "context/auth";

const Main = () => {
  const { logout } = useAuth();
  return (
    <div>
      Main
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Main;
