import React, { ButtonHTMLAttributes, FC } from "react";

type P = {
  children: string;
  extraClass ?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<P> = (props) => {
 


  return (
    <button
      {...props}
      className={"px-4 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white border "+props.extraClass}
    >
      {props.children}
    </button>
  );
};

export default Button ;
