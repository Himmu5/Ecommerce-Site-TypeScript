import React,{FC, useContext ,ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import {UserContext} from '../Context/Context'
import WithUser from '../HOCs/WithUser';
import {User} from '../CommenType/Types'

type AuthType = {
  children:JSX.Element,
  user?:User
}

const AuthRoute:FC<AuthType>=({children, user})=> {

  if(user){
    return <Navigate to={"/"} />;
  }  
  return children;
}

export default WithUser(AuthRoute);