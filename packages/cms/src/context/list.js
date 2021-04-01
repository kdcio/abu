import { createContext, useContext, useState } from "react";

const ListContext = createContext();

const useList = () => {
  return useContext(ListContext);
};

const ListProvider = (props) => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const selectByIndex = (idx) => {
    setSelectedIdx(idx);
    if (idx === selectedIdx) setSelectedIdx(null);
    else setSelected(list[idx] || null);
  };

  const removeItem = (idx) => {
    const newList = [...list];
    newList.splice(idx, 1);
    setList(newList);
  };

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        selected,
        setSelected,
        removeItem,
        selectByIndex,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export { ListProvider, useList };
