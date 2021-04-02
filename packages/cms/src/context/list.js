import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

import listApi from "api/list";

const ListContext = createContext();

const useList = () => {
  return useContext(ListContext);
};

const initialState = {
  status: "idle",
  error: null,
  apiName: null,
  list: [],
  selected: null,
  selectedId: null,
  selectedIdx: null,
  hydrating: false,
};

const ListProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "INIT":
        return { ...initialState, apiName: action.payload };
      case "FETCHING":
        return { ...state, hydrating: true };
      case "FETCHED":
        return { ...state, hydrating: false, list: action.payload };
      case "FETCH_ERROR":
        return { ...state, hydrating: false, error: action.payload };
      case "SELECT_ID":
        return { ...state, selectedId: action.id };
      case "SELECT":
        return { ...state, selected: action.payload, selectedIdx: action.idx };
      default:
        return state;
    }
  }, initialState);

  const setApiName = (apiName) => {
    dispatch({ type: "INIT", payload: apiName });
  };

  const selectById = useCallback(
    (id) => {
      const list = state.list;
      const idx = list.findIndex((item) => item.id === id);
      if (idx < 0) return;
      dispatch({ type: "SELECT", payload: list[idx], idx });
    },
    [dispatch, state.list]
  );

  const hydrate = async () => {
    console.log("hydrating");
    dispatch({ type: "FETCHING" });
    try {
      const res = await listApi({ apiName: "Model" });
      let data = [];
      if (res?.Items) data = res.Items;
      dispatch({ type: "FETCHED", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    state.selectedId && selectById();
  }, [state.selectedId, selectById]);

  useEffect(() => {
    state.apiName && hydrate();
  }, [state.apiName]);

  return (
    <ListContext.Provider
      value={{
        selectById,
        hydrate,
        setApiName,
        dispatch,
        ...state,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export { ListProvider, useList };
