import React from "react";
import { useAuth } from "context/auth";

const Main = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Main</h1>
      <button id="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Main;
