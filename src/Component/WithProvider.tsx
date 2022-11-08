import React, { useContext } from "react";
// import { UserContext } from "./App";
import { UserContext } from "../Context";
import { AlertContext } from "../Context";
import { CartContext } from "../Context";

function WithProvider(provider) {
  function MyHOC(IncomingComponent) {
    function OutgoingComponent(propes) {
      const ContextData = useContext(provider);
      return <IncomingComponent {...propes} {...ContextData} />;
    }
    return OutgoingComponent;
  }
  return MyHOC;
}
export const withCart = WithProvider(CartContext);
export const withUser = WithProvider(UserContext);

export default WithProvider;
