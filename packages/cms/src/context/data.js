import { createContext, useContext, useState } from "react";

const DataContext = createContext();

const useData = () => {
  return useContext(DataContext);
};

const DataProvider = (props) => {
  const [data, setData] = useState({});

  return (
    <DataContext.Provider value={{ data, setData }}>
      {props.children}
    </DataContext.Provider>
  );
};

export { DataProvider, useData };
