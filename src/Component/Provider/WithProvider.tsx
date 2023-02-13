import React, { ComponentType, Context, useContext } from "react";
import { UserContext ,CartContext ,AlertContext} from "../Context/Context";

function WithProvider(provider:Context<any>) {
  function MyHOC(IncomingComponent:ComponentType<any>) {
    function OutgoingComponent(propes:any) {
      const ContextData = useContext(provider);
      return <IncomingComponent {...propes} {...ContextData} />;
    }
    return OutgoingComponent;
  }
  return MyHOC;
}

export const withCart = WithProvider(CartContext);
export const withUser = WithProvider(UserContext);
export const withAlert = WithProvider(AlertContext);


export default WithProvider;
