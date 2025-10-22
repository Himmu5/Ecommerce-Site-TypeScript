import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { data } from '../UI-Data/Nav'

type P = {}

const NavLinks: FC<P> = () => {
  const location = useLocation();

  const getPath = (item: string) => {
    switch(item) {
      case 'HOME': return '/';
      case 'ALL PRODUCTS': return '/AllProducts';
      case 'ABOUT': return '/About';
      case 'CONTACT': return '/Contact';
      case 'ACCOUNT': return '/component/validation/SignIn';
      default: return '/';
    }
  };

  return (
    <div className='flex gap-8 items-center text-sm'>
      {
        data.map((item, index) => {
          const path = getPath(item.show);
          const isActive = location.pathname === path;
          
          return (
            <Link
              key={index}
              to={path}
              className={`font-medium transition-colors duration-200 hover:text-red-500 ${
                isActive ? 'text-red-500' : 'text-gray-700'
              }`}
            >
              {item.show}
            </Link>
          );
        })
      }
    </div>
  )
}
export default NavLinks;