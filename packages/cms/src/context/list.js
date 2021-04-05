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

const API_NAME = "Content";
const initialState = {
  status: "IDLE",
  error: null,
  modelId: null,
  cache: [],
  list: [],
  limit: 5,
  hydrating: false,
  curPage: 0,
  lastKey: null,
};

const ListProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "INIT":
        return { ...state, modelId: action.modelId };
      case "HYDRATE":
        return { ...state, status: "HYDRATE" };
      case "FETCHING":
        return { ...state, hydrating: true };
      case "FETCHED":
        return {
          ...state,
          status: "IDLE",
          hydrating: false,
          list: action.payload,
          cache: [...state.cache, ...action.payload],
          curPage: state.curPage + action.pageInc,
          lastKey: action.lastKey,
        };
      case "FETCH_ERROR":
        return {
          ...state,
          status: "IDLE",
          hydrating: false,
          error: action.payload,
          list: [],
        };
      case "SET_PAGE":
        return {
          ...state,
          list: action.list,
          curPage: action.newPage,
        };
      case "RESET":
        return { ...initialState, modelId: state.modelId, status: "HYDRATE" };
      default:
        return state;
    }
  }, initialState);

  const hydrate = useCallback(
    async (lastKey, pageInc) => {
      dispatch({ type: "FETCHING" });
      try {
        const qs = { limit: state.limit };
        if (lastKey) qs.lastKey = JSON.stringify(lastKey);
        const res = await listApi({
          apiName: API_NAME,
          path: `/${state.modelId}`,
          qs,
        });
        let data = [];
        if (res?.Items) data = res.Items;
        dispatch({
          type: "FETCHED",
          payload: data,
          lastKey: res.lastKey ? res.lastKey : null,
          pageInc,
        });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    },
    [state.modelId, state.limit]
  );

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const prevPage = () => {
    const { curPage, limit, cache } = state;
    const newPage = curPage - 1;
    const list = cache.slice(newPage * limit, newPage * limit + limit);
    dispatch({ type: "SET_PAGE", list, newPage });
  };

  const nextPage = () => {
    const { curPage, limit, cache } = state;
    if (curPage === cache.length / limit - 1) {
      hydrate(state.lastKey, 1);
      return;
    }
    const newPage = curPage + 1;
    const list = cache.slice(newPage * limit, newPage * limit + limit);
    dispatch({ type: "SET_PAGE", list, newPage });
  };

  const isNextEnabled = useCallback(() => {
    if (
      !state.lastKey &&
      state.curPage === Math.floor(state.cache.length / state.limit)
    )
      return false;

    return state.curPage < Math.ceil(state.cache.length / state.limit);
  }, [state]);

  const isPrevEnabled = () => state.curPage > 0;

  useEffect(() => {
    state.modelId && hydrate(null, 0);
  }, [state.modelId, hydrate]);

  useEffect(() => {
    state.status === "HYDRATE" && hydrate(null, 0);
  }, [state.status, hydrate]);

  return (
    <ListContext.Provider
      value={{
        dispatch,
        prevPage,
        nextPage,
        isNextEnabled,
        isPrevEnabled,
        reset,
        ...state,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export { ListProvider, useList };
