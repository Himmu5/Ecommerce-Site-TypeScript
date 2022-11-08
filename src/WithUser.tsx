import React, { ReactComponentElement, ReactElement, useContext } from "react";
import { UserContext } from "./Context";

function WithUser(IncomingComponent:ReactElement ) {
  function OutgoingComponent(propes) {
    const ContextData = useContext(UserContext);
    return <IncomingComponent {...propes} {...ContextData} />;
  }
  return OutgoingComponent;
}

export default WithUser;
