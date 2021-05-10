import { createContext, useContext, useState } from "react";

const SelectContext = createContext();

const useSelect = () => {
  return useContext(SelectContext);
};

const SelectProvider = (props) => {
  const [selected, setSelected] = useState(null);
  const [fieldId, setFieldId] = useState(null);

  return (
    <SelectContext.Provider
      value={{
        selected,
        setSelected,
        fieldId,
        setFieldId,
      }}
    >
      {props.children}
    </SelectContext.Provider>
  );
};

export { SelectProvider, useSelect };
