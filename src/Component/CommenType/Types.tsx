// Cart Product Data Types
import {InputHTMLAttributes} from 'react'

export type Product = {
    id:number,
    title:string ,
    description:string,
    price:number,
    thumbnail:string,
    category:string
}



export type ResponseType = {
    product:Product,
    quantity:number
} 

export type CartType = {
  [num:number]:number
}


//User Types

export type User = {
    id: number;
    full_name: string;
    email: string;
  };

  //Alert Types


 export type AlertType = {
    message: string;
    type: string;
  };

 export type AlertContextType = {
    alert?: AlertType;
    setAlert?: (a: AlertType) => void;
    RemoveAlert?: () => void;
  }


  //Input Values

export type FormikValues= {
    email:string ,
    password:string
  }



 export type valuesType={
    FULLNAME:string,
    EMAIL:string,
    USERNAME:string,
    PASSWORD:string,
    CONFIRM:string
  }

 export type SignUptypes =
  | {
      values: valuesType;
      errors: valuesType;
      touched: valuesType;
      handleSubmit: () => void;
      handleChange: () => void;
      handleBlur: () => void;
    } & InputHTMLAttributes<HTMLInputElement>;


    export type Signintypes =
    | {
        values: FormikValues;
        errors: FormikValues;
        touched: FormikValues;
        handleSubmit: () => void;
        handleChange: () => void;
        handleBlur: () => void;
      } & InputHTMLAttributes<HTMLInputElement>;

     export  type SignProp = {
        user :User,
        setUser:(u:User)=>void;
        RemoveAlert:()=>void;
        isLoggedIn:boolean;
        alert:AlertType;
        setAlert:(alert:AlertType)=>void;
      
      }