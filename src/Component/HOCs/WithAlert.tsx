import React, {FC, useContext ,Component } from "react";
import { AlertContext } from "../Context/Context";


function WithAlert(IncomingComponent:FC<any>) {
  function OutgoingComponent(props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<React.Component<{}, {}, any>> & Readonly<{}>){
    const ContextData = useContext(AlertContext);

    return <IncomingComponent {...props} {...ContextData}/>;
  }

  return OutgoingComponent;
}

export default WithAlert;
