import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Suspense from "components/Suspense";
import Spinner from "components/Spinner";
import { useModels } from "context/models";
import { DataProvider } from "context/data";

const Add = React.lazy(() => import("./Add"));
const Edit = React.lazy(() => import("./Edit"));

const Form = () => {
  const { id, action } = useParams();
  const history = useHistory();
  const { selected, dispatch } = useModels();

  useEffect(() => {
    if (id && selected && id === selected) {
      dispatch({ type: "SELECT_ID", id: null });
    } else if (id !== selected) {
      dispatch({ type: "SELECT_ID", id });
    }
  }, [id, selected, dispatch]);

  if (!id) history.push("/");
  if (!selected) return <Spinner />;

  return (
    <DataProvider>
      {action === "edit" ? (
        <Suspense Component={Edit} />
      ) : (
        <Suspense Component={Add} />
      )}
    </DataProvider>
  );
};

export default Form;
