import { createContext, useContext, useState, useEffect } from "react";

const ListContext = createContext();

const useList = () => {
  return useContext(ListContext);
};

const ListProvider = (props) => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const selectByIndex = (idx) => {
    if (idx === selectedIdx) setSelectedIdx(null);
    else setSelectedIdx(idx);
  };

  const removeItem = (idx) => {
    const newList = [...list];
    newList.splice(idx, 1);
    setList(newList);
  };

  useEffect(() => {
    if (selectedIdx === null) setSelected(null);
    else setSelected(list[selectedIdx] || null);
  }, [list, selectedIdx]);

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
