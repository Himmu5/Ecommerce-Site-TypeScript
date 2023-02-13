import React, { ButtonHTMLAttributes, FC } from "react";

type P = {
  children: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<P> = (props) => {
 
  // let theme;
  // if(props.extraClass == "Primary"){
  //   theme="bg-indigo-800"
  // }
  // if(props.extraClass == "Secondry"){
  //   theme="bg-orange-500 "
  // }

  return (
    <button
      {...props}
      className={"px-4 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white border "}
    >
      {props.children}
    </button>
  );
};

export default Button ;
