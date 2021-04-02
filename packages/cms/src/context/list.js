import { createContext, useContext, useState, useEffect } from "react";

import listApi from "api/list";

const ListContext = createContext();

const useList = () => {
  return useContext(ListContext);
};

const ListProvider = (props) => {
  const [apiName, setApiName] = useState(null);
  const [hydrating, setHydrating] = useState(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const selectByIndex = (idx) => {
    if (idx === selectedIdx) {
      setSelectedIdx(null);
      setSelected(null);
    } else {
      setSelectedIdx(idx);
      setSelected(list[idx] || null);
    }
  };

  const selectById = (id) => {
    const idx = list.findIndex((item) => item.id === id);
    if (idx < 0) return;
    // console.log(idx);
    // setSelectedIdx(idx);
    setSelected(list[idx]);
  };

  const removeItem = (idx) => {
    const newList = [...list];
    newList.splice(idx, 1);
    setList(newList);
  };

  const hydrate = async () => {
    setHydrating(true);
    const res = await listApi({ apiName: "Model" });
    if (res?.Items) setList(res.Items);
    setHydrating(false);
  };

  useEffect(() => {
    hydrate();
  }, [apiName]);

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        selected,
        setSelected,
        removeItem,
        selectByIndex,
        selectById,
        hydrate,
        setApiName,
        hydrating,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export { ListProvider, useList };
