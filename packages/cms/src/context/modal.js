import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const useModal = () => {
  return useContext(ModalContext);
};

const ModalProvider = (props) => {
  const [modal, setModal] = useState("responsive");

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
