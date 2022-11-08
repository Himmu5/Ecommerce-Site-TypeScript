import React, {
  FC,
  JSXElementConstructor,
  ReactComponentElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { AlertContext } from "../Context";

type AlertType = {
  message: string;
  type: string;
};

type AlertProviderType = {
  children: ReactNode;
};

const AlertProvider: FC<AlertProviderType> = ({ children }) => {
  const [alert, setAlert] = useState<AlertType>();

  const RemoveAlert = () => {
    setAlert(undefined);
  };

  return (
    <div>
      <AlertContext.Provider value={{ alert, setAlert, RemoveAlert }}>
        {children}
      </AlertContext.Provider>
    </div>
  );
};

export default AlertProvider;
