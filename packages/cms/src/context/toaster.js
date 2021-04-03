import { createContext, useContext, useState, useCallback } from "react";
import { CToast, CToastBody, CToaster } from "@coreui/react";

const ToasterContext = createContext();

const useToaster = () => {
  return useContext(ToasterContext);
};

const ToasterProvider = (props) => {
  const [toasters, setToasters] = useState([]);

  const addToast = ({ color, message }) => {
    setToasters([...toasters, { message, color }]);
  };

  const renderToast = useCallback(
    () => (
      <CToaster position="top-right" key={"toasters"}>
        {toasters.map((toast, key) => (
          <CToast
            key={"toast" + key}
            show={true}
            autohide={3000}
            fade={true}
            color={toast.color}
          >
            <CToastBody>{toast.message}</CToastBody>
          </CToast>
        ))}
      </CToaster>
    ),
    [toasters]
  );

  return (
    <ToasterContext.Provider value={{ addToast, renderToast }}>
      {props.children}
    </ToasterContext.Provider>
  );
};

export { ToasterProvider, useToaster };
