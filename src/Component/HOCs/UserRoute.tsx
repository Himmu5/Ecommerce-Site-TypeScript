import React, {FC, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { User } from '../CommenType/Types';
import { UserContext } from '../Context/Context'
import WithUser from './WithUser';

type UserRouteType = {
  children :JSX.Element,
  user:User
}

const UserRoute:FC<UserRouteType>=({children , user })=> {

    if(!user){
      return <Navigate to={"/component/validation/SignIn"} />;
    }  

  return children;
}
export default WithUser(UserRoute);