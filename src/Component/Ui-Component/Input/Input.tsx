import React, { FC, InputHTMLAttributes } from "react";

type InputType =
   {
      errors: string;
      touched: string;
    } & InputHTMLAttributes<HTMLInputElement>

const Input: FC<InputType> = ({ errors, touched, ...rest }) => {

  return (
    <div className="">
      {touched && errors && <div className="text-red-400 ">{errors}</div>}
      <input {...rest} className="border px-4 py-2 w-full" />
    </div>
  );
};

export default Input;
