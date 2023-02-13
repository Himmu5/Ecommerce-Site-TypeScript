import React, { FC } from 'react'

type P = {
  children: string;
  extraClass: string,
}

const Button: FC<P> = ({ children,extraClass , ...rest }) => {
  return <button className={'px-4 py-2 rounded-md text-white bg-red-400 hover:bg-red-500 ' + extraClass} {...rest}>{children}</button>
}
export default Button;