import React, { useContext } from "react";
import { AlertContext } from "./Context";

function WithAlert(IncomingComponent) {
  function OutgoingComponent(props) {
    const ContextData = useContext(AlertContext);

    return <IncomingComponent {...props} {...ContextData}/>;
  }

  return OutgoingComponent;
}

export default WithAlert;
