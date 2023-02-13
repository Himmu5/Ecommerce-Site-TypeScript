import React, { memo ,ReactNode,FC } from 'react'

type ButtonType = {
  children :ReactNode,
  handleClick:(c:ReactNode)=>void;
}

 const buttonNumber:FC<ButtonType>=({children ,handleClick})=> {

  function handle(){
    handleClick(children);
  }
  return (
    <div>
        <button onClick={handle}  className="pl-3 pr-3 pt-1 pb-1 bg-red-400 hover:bg-white hover:text-red-400 text-white ">{children}</button>
    </div>
  )

}

export default memo(buttonNumber);
