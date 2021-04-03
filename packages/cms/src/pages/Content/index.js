import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Suspense from "components/Suspense";
import Spinner from "components/Spinner";
import { useModels } from "context/models";

const Collection = React.lazy(() => import("./Collection"));
const Single = React.lazy(() => import("./Single"));

const Content = () => {
  const { id } = useParams();
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

  return selected.collection ? (
    <Suspense Component={Collection} />
  ) : (
    <Suspense Component={Single} />
  );
};

export default Content;
