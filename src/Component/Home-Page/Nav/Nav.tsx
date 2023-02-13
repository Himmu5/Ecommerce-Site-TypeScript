import React, { FC } from 'react'
import { BsBag } from "react-icons/bs";
import NavLinks from './NavLinks';

type P = {}
const Nav: FC<P> = () => {
    return <div className=' flex justify-between items-center px-4 sm:px-16 py-8 '>
        <img src="https://trycasuals.com/wp-content/uploads/2019/06/print-1-1.svg" alt="" />
        <ul className='flex gap-6 items-center '>
            <NavLinks />
            <li><BsBag size={25} /></li>

        </ul>
    </div>
}
export default Nav;