import { createContext } from "react";

type User = {
    id:number;
    full_name:string;
    email:string;
}

type UserContextType = {
    user?:User;
    setUser?:(u:User)=>void;
    isLoggedIn : boolean;
}

export const UserContext = createContext<UserContextType>({
    user:undefined , 
    setUser:undefined,
    isLoggedIn:false
});

type Alert = {
    message:string;
    type:string;
}
type AlertContextType = {
    alert?:Alert;
    setAlert?:( a: Alert)=>void;
    RemoveAlert?:()=>void;
}

export const AlertContext = createContext<AlertContextType>({alert:undefined , setAlert:undefined ,  RemoveAlert:undefined });


type totalproduct = {
    
}


export const CartContext = createContext();