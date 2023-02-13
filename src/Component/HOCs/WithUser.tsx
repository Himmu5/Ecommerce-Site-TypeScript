import React, { ComponentType, FC, useContext } from "react";
import { UserContext } from "../Context/Context";

function WithUser(IncomingComponent:ComponentType<any>) {
  function OutgoingComponent(propes: any){
    const ContextData = useContext(UserContext);
    return <IncomingComponent {...propes} {...ContextData} />;
  }
  return OutgoingComponent;
}

export default WithUser;
 