import React, { FC } from 'react'
import { data } from '../UI-Data/Nav'

type P = {}


const NavLinks: FC<P> = () => {
  return <div className=' gap-10 items-center hidden sm:flex text-primary text-sm '>
    {
      data.map((item , index) => {
        return <li key={index}> {item.show} </li>
      })
    }
  </div>
}
export default NavLinks;